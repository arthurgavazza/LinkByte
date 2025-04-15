import asyncio
import uuid
from unittest.mock import AsyncMock, MagicMock
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.main import app
from app.schemas.user import UserCreate
from app.models.user import User


# Result wrapper classes for mocking SQLAlchemy query results
class MockScalars:
    def __init__(self, result=None):
        self.result = result
        
    def first(self):
        return self.result
        
    def all(self):
        if self.result is None:
            return []
        elif isinstance(self.result, list):
            return self.result
        else:
            return [self.result]

class MockQueryResult:
    def __init__(self, result=None):
        self.result = result
        
    def scalars(self):
        return MockScalars(self.result)


# Mock Database Session
@pytest.fixture
def mock_db():
    """Provides a mock database session for testing."""
    mock = AsyncMock(spec=AsyncSession)
    
    # Make execute return a mock query result that can be chained
    async def mock_execute(*args, **kwargs):
        return MockQueryResult()
        
    mock.execute.side_effect = mock_execute
    return mock


@pytest.fixture
async def db_session():
    """
    Provides a database session for tests that need actual database interaction.
    In a real test suite, this would use a test database and transaction rollback.
    For simplicity, we're using a mock here, but this could be extended to use a real test DB.
    """
    mock = AsyncMock(spec=AsyncSession)
    
    # Make execute return a mock query result that can be chained
    async def mock_execute(*args, **kwargs):
        return MockQueryResult()
        
    mock.execute.side_effect = mock_execute
    return mock


@pytest.fixture
def sample_user_id():
    """Provides a sample user ID."""
    return uuid.uuid4()


@pytest.fixture
def sample_link_id():
    """Provides a sample link ID."""
    return uuid.uuid4()


@pytest.fixture
def user_data():
    """Provides sample user data for testing."""
    return UserCreate(
        email="test@example.com",
        username="testuser",
        password="Password123"
    )


@pytest.fixture
def sample_user(sample_user_id):
    """Provides a sample user object."""
    user = MagicMock(spec=User)
    user.id = sample_user_id
    user.email = "test@example.com"
    user.username = "testuser"
    user.is_active = True
    user.is_verified = False
    return user


# API Test Client
@pytest.fixture
async def client():
    """Provides an API test client with a mocked DB session."""
    # Override the database dependency
    async def override_get_db():
        db = AsyncMock(spec=AsyncSession)
        
        # Make execute return a mock query result that can be chained
        async def mock_execute(*args, **kwargs):
            return MockQueryResult()
            
        db.execute.side_effect = mock_execute
        
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client
    
    # Clean up
    app.dependency_overrides.clear()


# Service fixtures
@pytest.fixture
def auth_service(mock_db):
    """Provides an AuthService instance with a mocked DB session."""
    from app.services.auth_service import AuthService
    return AuthService(mock_db)


@pytest.fixture
def link_service(mock_db):
    """Provides a LinkService instance with a mocked DB session."""
    from app.services.link_service import LinkService
    return LinkService(mock_db)


@pytest.fixture
def click_service(mock_db):
    """Provides a ClickService instance with a mocked DB session."""
    from app.services.click_service import ClickService
    return ClickService(mock_db)


@pytest.fixture
def analytics_service(mock_db):
    """Provides an AnalyticsService instance with a mocked DB session."""
    from app.services.analytics_service import AnalyticsService
    return AnalyticsService(mock_db) 