import pytest
from unittest.mock import MagicMock, AsyncMock, patch
from sqlalchemy.ext.asyncio import AsyncSession
import uuid
from datetime import datetime, timedelta

from app.services.click_service import ClickService
from app.models.click import Click
from app.models.link import Link

@pytest.fixture
def mock_db():
    """Create a mock database session."""
    db = AsyncMock(spec=AsyncSession)
    return db

@pytest.fixture
def click_service(mock_db):
    """Create a click service with a mock database."""
    return ClickService(mock_db)

@pytest.fixture
def sample_link_id():
    """Create a sample link ID."""
    return uuid.uuid4()

@pytest.mark.asyncio
async def test_record_click_basic(click_service, mock_db, sample_link_id):
    """Test recording a basic click without additional data."""
    # Mock link for incrementing click count
    mock_link = MagicMock(spec=Link)
    mock_db.get.return_value = mock_link
    
    # Call the method
    result = await click_service.record_click(sample_link_id)
    
    # Verify click was added to database
    assert mock_db.add.called
    assert mock_db.flush.called
    
    # Verify link click count was incremented
    assert mock_link.click_count == 1

@pytest.mark.asyncio
async def test_record_click_with_data(click_service, mock_db, sample_link_id):
    """Test recording a click with all data."""
    # Mock link for incrementing click count
    mock_link = MagicMock(spec=Link)
    mock_db.get.return_value = mock_link
    
    # Test data
    ip = "192.168.1.1"
    user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
    referrer = "https://www.google.com/search?q=test"
    country = "US"
    city = "New York"
    metadata = {"utm_source": "newsletter", "campaign_id": "summer2023"}
    
    # Call the method
    with patch.object(click_service, '_anonymize_ip', return_value="192.168.0.0"):
        with patch.object(click_service, '_parse_user_agent', return_value=("desktop", "chrome", "macos")):
            with patch.object(click_service, '_clean_referrer', return_value="google.com"):
                result = await click_service.record_click(
                    sample_link_id, 
                    ip, 
                    user_agent, 
                    referrer, 
                    country, 
                    city, 
                    metadata
                )
    
    # Verify call to add to database
    call_args = mock_db.add.call_args[0][0]
    assert isinstance(call_args, Click)
    assert call_args.link_id == sample_link_id
    assert call_args.ip_address == "192.168.0.0"
    assert call_args.user_agent == user_agent
    assert call_args.referrer == "google.com"
    assert call_args.country == country
    assert call_args.city == city
    assert call_args.device_type == "desktop"
    assert call_args.browser == "chrome"
    assert call_args.os == "macos"
    assert call_args.click_metadata == metadata

def test_anonymize_ip_v4(click_service):
    """Test anonymizing IPv4 addresses."""
    # Test valid IPv4
    ip = "192.168.1.1"
    result = click_service._anonymize_ip(ip)
    assert result == "192.168.0.0"
    
    # Test invalid format
    ip = "invalid-ip"
    result = click_service._anonymize_ip(ip)
    assert result == "invalid-ip"  # Should return original if invalid

def test_anonymize_ip_v6(click_service):
    """Test anonymizing IPv6 addresses."""
    # Test valid IPv6
    ip = "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
    result = click_service._anonymize_ip(ip)
    assert result.endswith(":0:0:0:0")
    assert result.startswith("2001:0db8:85a3:0000")

def test_parse_user_agent_desktop(click_service):
    """Test parsing desktop user agents."""
    # Chrome on macOS
    ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
    device, browser, os = click_service._parse_user_agent(ua)
    assert device == "desktop"
    assert browser == "chrome"
    assert os == "macos"
    
    # Firefox on Windows
    ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0"
    device, browser, os = click_service._parse_user_agent(ua)
    assert device == "desktop"
    assert browser == "firefox"
    assert os == "windows"

def test_parse_user_agent_mobile(click_service):
    """Test parsing mobile user agents."""
    # Chrome on Android
    ua = "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"
    device, browser, os = click_service._parse_user_agent(ua)
    assert device == "mobile"
    assert browser == "chrome"
    assert os == "android"
    
    # Safari on iOS
    ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
    device, browser, os = click_service._parse_user_agent(ua)
    assert device == "mobile"
    assert browser == "safari"
    assert os == "ios"

def test_clean_referrer(click_service):
    """Test cleaning referrer URLs."""
    # Standard URL
    referrer = "https://www.google.com/search?q=test"
    result = click_service._clean_referrer(referrer)
    assert result == "google.com"
    
    # URL with subdomain
    referrer = "https://mail.google.com/mail/u/0/#inbox"
    result = click_service._clean_referrer(referrer)
    assert result == "mail.google.com"
    
    # Invalid or non-URL
    referrer = "direct"
    result = click_service._clean_referrer(referrer)
    assert result == "direct"
    
    # None/empty
    result = click_service._clean_referrer(None)
    assert result is None

@pytest.mark.asyncio
async def test_is_unique_click_no_previous(click_service, mock_db, sample_link_id):
    """Test checking for unique click when there's no previous click."""
    # Mock database response for no previous click
    mock_result = MagicMock()
    mock_result.scalar.return_value = False  # No existing click
    mock_db.execute.return_value = mock_result
    
    # Call the method
    result = await click_service.is_unique_click(sample_link_id, "192.168.1.1")
    
    # Should be true (is unique) since there's no previous click
    assert result is True

@pytest.mark.asyncio
async def test_is_unique_click_has_previous(click_service, mock_db, sample_link_id):
    """Test checking for unique click when there's a previous click."""
    # Mock database response for previous click exists
    mock_result = MagicMock()
    mock_result.scalar.return_value = True  # Existing click found
    mock_db.execute.return_value = mock_result
    
    # Call the method
    result = await click_service.is_unique_click(sample_link_id, "192.168.1.1")
    
    # Should be false (not unique) since there's a previous click
    assert result is False

@pytest.mark.asyncio
async def test_is_unique_click_no_ip(click_service, mock_db, sample_link_id):
    """Test checking for unique click when no IP address is provided."""
    # Call the method with no IP
    result = await click_service.is_unique_click(sample_link_id, None)
    
    # Should be true (considered unique) when no IP is provided
    assert result is True
    # Database should not be queried
    mock_db.execute.assert_not_called()

@pytest.mark.asyncio
async def test_increment_link_click_count(click_service, mock_db, sample_link_id):
    """Test incrementing the link click count."""
    # Mock link
    mock_link = MagicMock(spec=Link)
    mock_link.click_count = 10
    mock_db.get.return_value = mock_link
    
    # Call the method
    await click_service._increment_link_click_count(sample_link_id)
    
    # Verify click count was incremented
    assert mock_link.click_count == 11
    assert mock_db.flush.called

@pytest.mark.asyncio
async def test_increment_link_click_count_link_not_found(click_service, mock_db, sample_link_id):
    """Test incrementing the link click count when link is not found."""
    # Mock link not found
    mock_db.get.return_value = None
    
    # Call the method (should not raise an exception)
    await click_service._increment_link_click_count(sample_link_id)
    
    # Verify flush was not called
    assert not mock_db.flush.called 