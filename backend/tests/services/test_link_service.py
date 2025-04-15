import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from datetime import datetime, timedelta
import uuid

from app.services.link_service import LinkService
from app.schemas.link import LinkCreate, LinkUpdate
from app.models.link import Link

@pytest.fixture
def mock_db():
    """Create a mock database session."""
    db = AsyncMock()
    db.execute = AsyncMock()
    db.flush = AsyncMock()
    db.refresh = AsyncMock()
    return db

@pytest.fixture
def link_service(mock_db):
    """Create a LinkService instance with a mock database."""
    return LinkService(mock_db)

@pytest.fixture
def sample_link_data():
    """Create sample link data for testing."""
    return LinkCreate(
        original_url="https://example.com/very/long/path",
        custom_alias="example",
        expires_at=datetime.utcnow() + timedelta(days=7),
        is_password_protected=False
    )

@pytest.mark.asyncio
async def test_create_link(link_service, mock_db, sample_link_data):
    """Test creating a new link."""
    # Mock the _short_code_exists method to return False
    link_service._short_code_exists = AsyncMock(return_value=False)
    
    # Set up the mock db.execute().scalars().first() chain for the refresh
    mock_result = MagicMock()
    mock_db.execute.return_value = mock_result
    
    # Call the method
    result = await link_service.create_link(sample_link_data)
    
    # Assertions
    assert result is not None
    assert isinstance(result, Link)
    assert result.short_code == "example"
    assert result.original_url == "https://example.com/very/long/path"
    assert result.is_password_protected is False
    assert mock_db.add.called
    assert mock_db.flush.called
    assert mock_db.refresh.called

@pytest.mark.asyncio
async def test_create_link_with_custom_alias_conflict(link_service, mock_db, sample_link_data):
    """Test creating a link with a custom alias that already exists."""
    # Mock the _short_code_exists method to return True (conflict)
    link_service._short_code_exists = AsyncMock(return_value=True)
    
    # Expect a ValueError
    with pytest.raises(ValueError):
        await link_service.create_link(sample_link_data)

@pytest.mark.asyncio
async def test_get_link_by_short_code(link_service, mock_db):
    """Test getting a link by short code."""
    # Create a mock link
    mock_link = Link(
        id=uuid.uuid4(),
        short_code="example",
        original_url="https://example.com",
        is_active=True
    )
    
    # Set up the mock db.execute().scalars().first() chain
    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = mock_link
    mock_db.execute.return_value = mock_result
    
    # Call the method
    result = await link_service.get_link_by_short_code("example")
    
    # Assertions
    assert result is not None
    assert result == mock_link
    assert result.short_code == "example"
    assert result.original_url == "https://example.com"

@pytest.mark.asyncio
async def test_get_links(link_service, mock_db):
    """Test getting multiple links."""
    # Create mock links
    mock_links = [
        Link(id=uuid.uuid4(), short_code="link1", original_url="https://example.com/1"),
        Link(id=uuid.uuid4(), short_code="link2", original_url="https://example.com/2")
    ]
    
    # Set up the mock db.execute().scalars().all() chain
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = mock_links
    mock_db.execute.return_value = mock_result
    
    # Call the method
    result = await link_service.get_links()
    
    # Assertions
    assert result is not None
    assert len(result) == 2
    assert result[0].short_code == "link1"
    assert result[1].short_code == "link2"

@pytest.mark.asyncio
async def test_update_link(link_service, mock_db):
    """Test updating a link."""
    # Create a mock link
    link_id = uuid.uuid4()
    mock_link = Link(
        id=link_id,
        short_code="example",
        original_url="https://example.com",
        is_active=True
    )
    
    # Set up the mock for get_link_by_id
    link_service.get_link_by_id = AsyncMock(return_value=mock_link)
    
    # Set up the mock for _short_code_exists
    link_service._short_code_exists = AsyncMock(return_value=False)
    
    # Set up the mock for db.execute().scalars().first()
    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = mock_link
    mock_db.execute.return_value = mock_result
    
    # Create update data
    update_data = LinkUpdate(original_url="https://updated-example.com")
    
    # Call the method
    result = await link_service.update_link(link_id, update_data)
    
    # Assertions
    assert result is not None
    assert result == mock_link
    assert mock_db.execute.called
    assert mock_db.flush.called

@pytest.mark.asyncio
async def test_delete_link(link_service, mock_db):
    """Test deleting (deactivating) a link."""
    # Create a mock link
    link_id = uuid.uuid4()
    mock_link = Link(
        id=link_id,
        short_code="example",
        original_url="https://example.com",
        is_active=True
    )
    
    # Set up the mock for get_link_by_id
    link_service.get_link_by_id = AsyncMock(return_value=mock_link)
    
    # Call the method
    result = await link_service.delete_link(link_id)
    
    # Assertions
    assert result is True
    assert mock_link.is_active is False
    assert mock_db.flush.called

@pytest.mark.asyncio
async def test_get_links_by_user(link_service, mock_db):
    """Test getting links for a user with pagination, search, sorting, and status filtering."""
    # Create mock user ID
    user_id = uuid.uuid4()
    
    # Create mock links
    mock_links = [
        Link(id=uuid.uuid4(), short_code="link1", original_url="https://example.com/1", 
             user_id=user_id, is_active=True, expires_at=None, is_password_protected=False),
        Link(id=uuid.uuid4(), short_code="link2", original_url="https://example.com/2", 
             user_id=user_id, is_active=True, expires_at=datetime.utcnow() + timedelta(days=7), 
             is_password_protected=False),
        Link(id=uuid.uuid4(), short_code="link3", original_url="https://example.com/3", 
             user_id=user_id, is_active=False, expires_at=None, is_password_protected=False),
        Link(id=uuid.uuid4(), short_code="link4", original_url="https://example.com/4", 
             user_id=user_id, is_active=True, expires_at=datetime.utcnow() - timedelta(days=1), 
             is_password_protected=False),
        Link(id=uuid.uuid4(), short_code="link5", original_url="https://example.com/5", 
             user_id=user_id, is_active=True, expires_at=None, is_password_protected=True),
    ]
    
    # Set up mock for execute that returns both links and count
    mock_result_links = MagicMock()
    mock_result_links.scalars.return_value.all.return_value = mock_links[:2]  # Return only first 2 links
    
    mock_result_count = MagicMock()
    mock_result_count.scalar.return_value = 5  # Total count
    
    # Mock execute to return different results based on the query
    mock_db.execute.side_effect = [mock_result_count, mock_result_links]
    
    # Call the method with pagination
    links, total = await link_service.get_links_by_user(
        user_id=user_id,
        page=1,
        per_page=2,
        sort_by="created_at",
        sort_order="desc"
    )
    
    # Assertions
    assert links is not None
    assert len(links) == 2
    assert total == 5
    
    # Reset mock
    mock_db.execute.reset_mock()
    
    # Setup mocks for status filtering
    mock_active_links = [mock_links[0], mock_links[1], mock_links[4]]  # active links
    mock_result_active = MagicMock()
    mock_result_active.scalars.return_value.all.return_value = mock_active_links
    
    mock_result_active_count = MagicMock()
    mock_result_active_count.scalar.return_value = 3
    
    mock_db.execute.side_effect = [mock_result_active_count, mock_result_active]
    
    # Test filtering by status=active
    links, total = await link_service.get_links_by_user(
        user_id=user_id,
        page=1,
        per_page=10,
        status="active"
    )
    
    # Assertions for active links
    assert links is not None
    assert len(links) == 3
    assert total == 3
    assert all(link.is_active for link in links)
    
    # Reset mock
    mock_db.execute.reset_mock()
    
    # Setup mocks for expired links
    mock_expired_links = [mock_links[3]]  # expired links
    mock_result_expired = MagicMock()
    mock_result_expired.scalars.return_value.all.return_value = mock_expired_links
    
    mock_result_expired_count = MagicMock()
    mock_result_expired_count.scalar.return_value = 1
    
    mock_db.execute.side_effect = [mock_result_expired_count, mock_result_expired]
    
    # Test filtering by status=expired
    links, total = await link_service.get_links_by_user(
        user_id=user_id,
        page=1,
        per_page=10,
        status="expired"
    )
    
    # Assertions for expired links
    assert links is not None
    assert len(links) == 1
    assert total == 1
    assert all(link.expires_at and link.expires_at < datetime.utcnow() for link in links)
    
    # Reset mock
    mock_db.execute.reset_mock()
    
    # Setup mocks for protected links
    mock_protected_links = [mock_links[4]]  # protected links
    mock_result_protected = MagicMock()
    mock_result_protected.scalars.return_value.all.return_value = mock_protected_links
    
    mock_result_protected_count = MagicMock()
    mock_result_protected_count.scalar.return_value = 1
    
    mock_db.execute.side_effect = [mock_result_protected_count, mock_result_protected]
    
    # Test filtering by status=protected
    links, total = await link_service.get_links_by_user(
        user_id=user_id,
        page=1,
        per_page=10,
        status="protected"
    )
    
    # Assertions for protected links
    assert links is not None
    assert len(links) == 1
    assert total == 1
    assert all(link.is_password_protected for link in links) 