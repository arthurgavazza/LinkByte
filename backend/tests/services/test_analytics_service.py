import pytest
from unittest.mock import MagicMock, AsyncMock, patch
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta
import uuid

from app.services.analytics_service import AnalyticsService
from app.models.click import Click
from app.models.link import Link
from app.schemas.analytics import ClickStats, GeoStats, ReferrerStats

@pytest.fixture
def mock_db():
    """Create a mock database session."""
    db = AsyncMock(spec=AsyncSession)
    return db

@pytest.fixture
def analytics_service(mock_db):
    """Create an analytics service with a mock database."""
    return AnalyticsService(mock_db)

@pytest.fixture
def sample_link_id():
    """Create a sample link ID."""
    return str(uuid.uuid4())

@pytest.fixture
def sample_clicks_data():
    """Create sample click data."""
    today = datetime.utcnow()
    yesterday = today - timedelta(days=1)
    two_days_ago = today - timedelta(days=2)
    
    return [
        {'date': today.replace(hour=0, minute=0, second=0, microsecond=0), 'count': 10},
        {'date': yesterday.replace(hour=0, minute=0, second=0, microsecond=0), 'count': 15},
        {'date': two_days_ago.replace(hour=0, minute=0, second=0, microsecond=0), 'count': 8},
    ]

@pytest.fixture
def sample_country_data():
    """Create sample country data."""
    return [
        MagicMock(country="US", count=20),
        MagicMock(country="GB", count=15),
        MagicMock(country="CA", count=10),
    ]

@pytest.fixture
def sample_referrer_data():
    """Create sample referrer data."""
    return [
        MagicMock(referrer="google.com", count=25),
        MagicMock(referrer="facebook.com", count=15),
        MagicMock(referrer="twitter.com", count=8),
    ]

@pytest.mark.asyncio
async def test_get_link_clicks(analytics_service, mock_db, sample_link_id, sample_clicks_data):
    """Test getting link clicks."""
    # Setup mock responses
    mock_execute = mock_db.execute
    
    # Mock for total clicks
    total_clicks_result = MagicMock()
    total_clicks_result.scalar.return_value = 33  # Sum of all click counts
    mock_execute.return_value = total_clicks_result
    
    # Mock for previous period clicks
    previous_clicks_result = MagicMock()
    previous_clicks_result.scalar.return_value = 20
    mock_execute.side_effect = [
        total_clicks_result,  # First call for total clicks
        previous_clicks_result,  # Second call for previous period
    ]
    
    # Mock time series data
    time_series_result = MagicMock()
    time_series_result.all.return_value = [
        MagicMock(date=item['date'], count=item['count'])
        for item in sample_clicks_data
    ]
    mock_execute.side_effect = [
        total_clicks_result,
        previous_clicks_result,
        time_series_result,
    ]
    
    # Call the method
    result = await analytics_service.get_link_clicks(sample_link_id)
    
    # Verify the result
    assert isinstance(result, ClickStats)
    assert result.total_clicks == 33
    assert result.link_id == uuid.UUID(sample_link_id)
    assert len(result.time_series) == 3
    assert result.previous_period_change == 65.0  # (33-20)/20*100

@pytest.mark.asyncio
async def test_get_link_geo_stats(analytics_service, mock_db, sample_link_id, sample_country_data):
    """Test getting link geographic statistics."""
    # Setup mock responses
    mock_execute = mock_db.execute
    
    # Mock country data
    country_result = MagicMock()
    country_result.all.return_value = sample_country_data
    mock_execute.return_value = country_result
    
    # Call the method
    result = await analytics_service.get_link_geo_stats(sample_link_id)
    
    # Verify the result
    assert isinstance(result, GeoStats)
    assert result.link_id == uuid.UUID(sample_link_id)
    assert result.total_countries == 3
    assert len(result.countries) == 3
    
    # Check percentages
    total_count = sum([c.count for c in sample_country_data])
    for i, country in enumerate(result.countries):
        expected_percentage = (sample_country_data[i].count / total_count) * 100
        assert abs(country.percentage - expected_percentage) < 0.01

@pytest.mark.asyncio
async def test_get_link_referrers(analytics_service, mock_db, sample_link_id, sample_referrer_data):
    """Test getting link referrer statistics."""
    # Setup mock responses
    mock_execute = mock_db.execute
    
    # Mock referrer data
    referrer_result = MagicMock()
    referrer_result.all.return_value = sample_referrer_data
    
    # Mock total referrers count
    total_referrers_result = MagicMock()
    total_referrers_result.scalar.return_value = 48  # Sum of all referrer counts
    
    # Mock unique referrers count
    unique_referrers_result = MagicMock()
    unique_referrers_result.scalar.return_value = 3  # Number of unique referrers
    
    mock_execute.side_effect = [
        referrer_result,
        total_referrers_result,
        unique_referrers_result,
    ]
    
    # Call the method
    result = await analytics_service.get_link_referrers(sample_link_id)
    
    # Verify the result
    assert isinstance(result, ReferrerStats)
    assert result.link_id == uuid.UUID(sample_link_id)
    assert result.total_referrers == 3
    assert len(result.referrers) == 3
    
    # Check percentages
    total_count = 48
    for i, referrer in enumerate(result.referrers):
        expected_percentage = (sample_referrer_data[i].count / total_count) * 100
        assert abs(referrer.percentage - expected_percentage) < 0.01

@pytest.mark.asyncio
async def test_get_user_summary_empty(analytics_service, mock_db):
    """Test getting user summary with no links."""
    # Setup mock responses
    mock_execute = mock_db.execute
    
    # Mock empty links result
    links_result = MagicMock()
    links_result.scalars.return_value.all.return_value = []
    mock_execute.return_value = links_result
    
    # Create a user ID
    user_id = str(uuid.uuid4())
    
    # Call the method
    result = await analytics_service.get_user_summary(user_id)
    
    # Verify the result
    assert result["user_id"] == uuid.UUID(user_id)
    assert result["total_links"] == 0
    assert result["total_clicks"] == 0
    assert len(result["top_performing_links"]) == 0
    assert result["click_growth"] == 0.0

@pytest.mark.asyncio
async def test_get_user_summary_with_data(analytics_service, mock_db):
    """Test getting user summary with links and clicks."""
    # Setup mock responses
    mock_execute = mock_db.execute
    
    # Mock links result
    link1 = MagicMock(id=uuid.uuid4(), short_code="abc123", original_url="https://example.com")
    link2 = MagicMock(id=uuid.uuid4(), short_code="def456", original_url="https://test.com")
    links_result = MagicMock()
    links_result.scalars.return_value.all.return_value = [link1, link2]
    
    # Mock total clicks result
    total_clicks_result = MagicMock()
    total_clicks_result.scalar.return_value = 100
    
    # Mock current month clicks result
    current_month_clicks_result = MagicMock()
    current_month_clicks_result.scalar.return_value = 60
    
    # Mock previous month clicks result
    previous_month_clicks_result = MagicMock()
    previous_month_clicks_result.scalar.return_value = 40
    
    # Mock top links result
    top_link1 = MagicMock(id=link1.id, short_code=link1.short_code, original_url=link1.original_url, click_count=60)
    top_link2 = MagicMock(id=link2.id, short_code=link2.short_code, original_url=link2.original_url, click_count=40)
    top_links_result = MagicMock()
    top_links_result.all.return_value = [top_link1, top_link2]
    
    mock_execute.side_effect = [
        links_result,
        total_clicks_result,
        current_month_clicks_result,
        previous_month_clicks_result,
        top_links_result,
    ]
    
    # Create a user ID
    user_id = str(uuid.uuid4())
    
    # Call the method
    result = await analytics_service.get_user_summary(user_id)
    
    # Verify the result
    assert result["user_id"] == uuid.UUID(user_id)
    assert result["total_links"] == 2
    assert result["total_clicks"] == 100
    assert len(result["top_performing_links"]) == 2
    assert result["click_growth"] == 50.0  # (60-40)/40*100 