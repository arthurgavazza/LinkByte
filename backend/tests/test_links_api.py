import pytest
from fastapi.testclient import TestClient
from datetime import datetime, timedelta
import uuid
from unittest.mock import AsyncMock, patch, MagicMock

from app.main import app
from app.models.link import Link
from app.services.link_service import LinkService

@pytest.fixture
def mock_links():
    """Create mock links for testing."""
    user_id = uuid.uuid4()
    now = datetime.utcnow()
    return [
        Link(
            id=uuid.uuid4(),
            short_code="active1",
            original_url="https://example.com/active1",
            user_id=user_id,
            is_active=True,
            expires_at=None,
            is_password_protected=False,
            created_at=now - timedelta(days=2),
            updated_at=now - timedelta(days=2),
        ),
        Link(
            id=uuid.uuid4(),
            short_code="active2",
            original_url="https://example.com/active2",
            user_id=user_id,
            is_active=True,
            expires_at=now + timedelta(days=7),
            is_password_protected=False,
            created_at=now - timedelta(days=1),
            updated_at=now - timedelta(days=1),
        ),
        Link(
            id=uuid.uuid4(),
            short_code="expired",
            original_url="https://example.com/expired",
            user_id=user_id,
            is_active=True,
            expires_at=now - timedelta(days=1),
            is_password_protected=False,
            created_at=now - timedelta(days=3),
            updated_at=now - timedelta(days=3),
        ),
        Link(
            id=uuid.uuid4(),
            short_code="inactive",
            original_url="https://example.com/inactive",
            user_id=user_id,
            is_active=False,
            expires_at=None,
            is_password_protected=False,
            created_at=now - timedelta(days=4),
            updated_at=now - timedelta(days=4),
        ),
        Link(
            id=uuid.uuid4(),
            short_code="protected",
            original_url="https://example.com/protected",
            user_id=user_id,
            is_active=True,
            expires_at=None,
            is_password_protected=True,
            created_at=now - timedelta(days=5),
            updated_at=now - timedelta(days=5),
        ),
    ], user_id

@pytest.fixture
def authenticated_client():
    """Create an authenticated test client."""
    client = TestClient(app)
    
    # Mock the require_auth middleware to return a fixed user ID
    user_id = uuid.uuid4()
    
    # Apply the mock to the dependency
    with patch("app.middlewares.auth.require_auth", return_value=user_id):
        yield client, user_id

@pytest.mark.parametrize(
    "status_filter,expected_count",
    [
        (None, 5),  # All links
        ("active", 2),  # Only active links
        ("expired", 1),  # Only expired links
        ("protected", 1),  # Only protected links
    ]
)
def test_get_user_links_with_status_filter(authenticated_client, mock_links, status_filter, expected_count):
    """Test the /my-links endpoint with status filtering."""
    client, user_id = authenticated_client
    links, user_id = mock_links
    
    # Mock the get_links_by_user method
    with patch.object(LinkService, "get_links_by_user", autospec=True) as mock_get:
        # Filter links based on the status filter
        if status_filter == "active":
            filtered_links = [link for link in links if link.is_active and (link.expires_at is None or link.expires_at > datetime.utcnow())]
        elif status_filter == "expired":
            filtered_links = [link for link in links if link.expires_at and link.expires_at <= datetime.utcnow()]
        elif status_filter == "protected":
            filtered_links = [link for link in links if link.is_password_protected]
        else:
            filtered_links = links
        
        # Mock the return value
        mock_get.return_value = (filtered_links, len(filtered_links))
        
        # Make the request
        url = "/api/links/my-links"
        if status_filter:
            url += f"?status={status_filter}"
            
        response = client.get(url)
        
        # Verify response
        assert response.status_code == 200
        data = response.json()
        assert data["total"] == expected_count
        assert len(data["items"]) == expected_count
        
        # Verify the method was called with the correct parameters
        mock_get.assert_called_once()
        call_args = mock_get.call_args[1]
        assert call_args["user_id"] == user_id
        assert call_args.get("status") == status_filter 