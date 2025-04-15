import pytest
from unittest.mock import MagicMock, AsyncMock, patch
from sqlalchemy.ext.asyncio import AsyncSession
import uuid
from datetime import datetime, timedelta
from jose import jwt

from app.services.auth_service import AuthService
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, TokenPayload
from app.config import settings

@pytest.fixture
def mock_db():
    """Create a mock database session."""
    db = AsyncMock(spec=AsyncSession)
    return db

@pytest.fixture
def auth_service(mock_db):
    """Create an auth service with a mock database."""
    return AuthService(mock_db)

@pytest.fixture
def user_data():
    return UserCreate(
        email="test@example.com",
        username="testuser",
        password="Password123"
    )

@pytest.fixture
def sample_user_data():
    """Create sample user data for testing."""
    return UserCreate(
        email="test@example.com",
        username="testuser",
        password="Password123"
    )

@pytest.fixture
def sample_user():
    """Create a sample user object."""
    return User(
        id=uuid.uuid4(),
        email="test@example.com",
        username="testuser",
        password_hash="hashed_password",
        is_active=True,
        is_verified=False,
        created_at=datetime.utcnow()
    )

@pytest.mark.asyncio
async def test_register_user(db_session, user_data):
    # Arrange
    auth_service = AuthService(db_session)
    
    # Act
    user_response = await auth_service.register_user(user_data)
    
    # Assert
    assert user_response.email == user_data.email
    assert user_response.username == user_data.username
    assert user_response.is_active == True
    assert user_response.is_verified == False
    assert isinstance(user_response.id, uuid.UUID)
    
    # Verify user was saved to the database
    saved_user = await auth_service._get_user_by_email(user_data.email)
    assert saved_user is not None
    assert saved_user.email == user_data.email
    assert saved_user.password_hash != user_data.password  # Password should be hashed

@pytest.mark.asyncio
async def test_register_user_duplicate_email(db_session, user_data):
    # Arrange
    auth_service = AuthService(db_session)
    await auth_service.register_user(user_data)
    
    # Act & Assert
    with pytest.raises(ValueError, match="Email already registered"):
        await auth_service.register_user(user_data)

@pytest.mark.asyncio
async def test_register_user_duplicate_username(db_session, user_data):
    # Arrange
    auth_service = AuthService(db_session)
    await auth_service.register_user(user_data)
    
    # Create another user with different email but same username
    duplicate_user = UserCreate(
        email="another@example.com",
        username=user_data.username,
        password="Password123"
    )
    
    # Act & Assert
    with pytest.raises(ValueError, match="Username already taken"):
        await auth_service.register_user(duplicate_user)

@pytest.mark.asyncio
async def test_authenticate_user_valid_credentials(db_session, user_data):
    # Arrange
    auth_service = AuthService(db_session)
    await auth_service.register_user(user_data)
    
    # Act
    result = await auth_service.authenticate_user(user_data.username, user_data.password)
    
    # Assert
    assert "access_token" in result
    assert "refresh_token" in result
    assert "user_id" in result
    
    # Verify tokens
    access_payload = jwt.decode(
        result["access_token"], 
        settings.JWT_SECRET_KEY, 
        algorithms=[settings.JWT_ALGORITHM]
    )
    assert access_payload["type"] == "access"
    
    refresh_payload = jwt.decode(
        result["refresh_token"], 
        settings.JWT_SECRET_KEY, 
        algorithms=[settings.JWT_ALGORITHM]
    )
    assert refresh_payload["type"] == "refresh"

@pytest.mark.asyncio
async def test_authenticate_user_invalid_password(db_session, user_data):
    # Arrange
    auth_service = AuthService(db_session)
    await auth_service.register_user(user_data)
    
    # Act & Assert
    with pytest.raises(ValueError, match="Invalid username or password"):
        await auth_service.authenticate_user(user_data.username, "WrongPassword123")

@pytest.mark.asyncio
async def test_authenticate_user_nonexistent_user(db_session):
    # Arrange
    auth_service = AuthService(db_session)
    
    # Act & Assert
    with pytest.raises(ValueError, match="Invalid username or password"):
        await auth_service.authenticate_user("nonexistent", "Password123")

@pytest.mark.asyncio
async def test_refresh_access_token_valid_token(db_session, user_data):
    # Arrange
    auth_service = AuthService(db_session)
    user_response = await auth_service.register_user(user_data)
    
    # Create a valid refresh token
    refresh_token = auth_service._create_token(
        {"sub": str(user_response.id), "type": "refresh"},
        timedelta(days=7)
    )
    
    # Act
    result = await auth_service.refresh_access_token(refresh_token)
    
    # Assert
    assert "access_token" in result
    assert "refresh_token" in result
    
    # Verify new access token
    access_payload = jwt.decode(
        result["access_token"], 
        settings.JWT_SECRET_KEY, 
        algorithms=[settings.JWT_ALGORITHM]
    )
    assert access_payload["type"] == "access"
    assert access_payload["sub"] == str(user_response.id)

@pytest.mark.asyncio
async def test_refresh_access_token_invalid_token(db_session):
    # Arrange
    auth_service = AuthService(db_session)
    
    # Act & Assert
    with pytest.raises(ValueError, match="Invalid authentication credentials"):
        await auth_service.refresh_access_token("invalid.token.here")

@pytest.mark.asyncio
async def test_refresh_access_token_wrong_token_type(db_session, user_data):
    # Arrange
    auth_service = AuthService(db_session)
    user_response = await auth_service.register_user(user_data)
    
    # Create an access token (wrong type for refresh endpoint)
    access_token = auth_service._create_token(
        {"sub": str(user_response.id), "type": "access"},
        timedelta(minutes=15)
    )
    
    # Act & Assert
    with pytest.raises(ValueError, match="Invalid token type"):
        await auth_service.refresh_access_token(access_token)

@pytest.mark.asyncio
async def test_get_user_by_id(db_session, user_data):
    # Arrange
    auth_service = AuthService(db_session)
    registered_user = await auth_service.register_user(user_data)
    
    # Act
    user_response = await auth_service.get_user_by_id(registered_user.id)
    
    # Assert
    assert user_response is not None
    assert user_response.id == registered_user.id
    assert user_response.email == user_data.email
    assert user_response.username == user_data.username

@pytest.mark.asyncio
async def test_hash_and_verify_password():
    """Test password hashing and verification."""
    # Arrange
    auth_service = AuthService(AsyncMock())
    password = "SecurePassword123"
    
    # Act
    hashed = auth_service._hash_password(password)
    is_valid = auth_service._verify_password(password, hashed)
    is_invalid = auth_service._verify_password("WrongPassword", hashed)
    
    # Assert
    assert hashed != password  # Password was hashed
    assert is_valid is True  # Correct password verified
    assert is_invalid is False  # Wrong password rejected

@pytest.mark.asyncio
async def test_create_token():
    """Test JWT token creation."""
    # Arrange
    auth_service = AuthService(AsyncMock())
    data = {"sub": "user123", "type": "access"}
    expires_delta = timedelta(minutes=15)
    
    # Act
    token = auth_service._create_token(data, expires_delta)
    
    # Assert
    assert isinstance(token, str)
    assert len(token.split(".")) == 3  # JWT has three parts
    
    # Decode token to verify contents
    payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
    assert payload["sub"] == "user123"
    assert payload["type"] == "access"
    assert "exp" in payload 