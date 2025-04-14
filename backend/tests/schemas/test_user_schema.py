import pytest
from pydantic import ValidationError
import uuid

from app.schemas.user import UserCreate, UserUpdate, UserResponse

def test_user_create_valid():
    """Test that a valid UserCreate schema passes validation."""
    # Valid data
    data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "Password123"
    }
    
    # Should not raise an exception
    user = UserCreate(**data)
    
    assert user.email == "test@example.com"
    assert user.username == "testuser"
    assert user.password == "Password123"

def test_user_create_invalid_email():
    """Test that an invalid email fails validation."""
    # Invalid email
    data = {
        "email": "not-an-email",
        "username": "testuser",
        "password": "Password123"
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        UserCreate(**data)

def test_user_create_invalid_username():
    """Test that an invalid username fails validation."""
    # Username too short
    data1 = {
        "email": "test@example.com",
        "username": "te",
        "password": "Password123"
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        UserCreate(**data1)
    
    # Username with invalid characters
    data2 = {
        "email": "test@example.com",
        "username": "test user",  # Contains space
        "password": "Password123"
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        UserCreate(**data2)

def test_user_create_invalid_password():
    """Test that an invalid password fails validation."""
    # Password too short
    data1 = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "Pass12"
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        UserCreate(**data1)
    
    # Password missing uppercase
    data2 = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "password123"
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        UserCreate(**data2)
    
    # Password missing lowercase
    data3 = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "PASSWORD123"
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        UserCreate(**data3)
    
    # Password missing digits
    data4 = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "PasswordNoDigits"
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        UserCreate(**data4)

def test_user_update_schema():
    """Test that UserUpdate schema works correctly."""
    # Full update
    data = {
        "email": "updated@example.com",
        "username": "updateduser",
        "password": "UpdatedPass123"
    }
    
    # Should not raise an exception
    user = UserUpdate(**data)
    
    assert user.email == "updated@example.com"
    assert user.username == "updateduser"
    assert user.password == "UpdatedPass123"
    
    # Partial update
    data = {
        "email": "updated@example.com"
    }
    
    # Should not raise an exception
    user = UserUpdate(**data)
    
    assert user.email == "updated@example.com"
    assert user.username is None
    assert user.password is None

def test_user_response_schema():
    """Test that UserResponse schema works correctly."""
    # Valid data
    data = {
        "id": uuid.uuid4(),
        "email": "test@example.com",
        "username": "testuser",
        "is_active": True,
        "is_verified": False,
        "created_at": "2023-01-01T00:00:00"
    }
    
    # Should not raise an exception
    user = UserResponse(**data)
    
    assert user.email == "test@example.com"
    assert user.username == "testuser"
    assert user.is_active is True
    assert user.is_verified is False 