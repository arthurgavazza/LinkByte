import pytest
from pydantic import ValidationError
from datetime import datetime, timedelta
import uuid

from app.schemas.link import LinkCreate, LinkUpdate, LinkResponse

def test_link_create_valid():
    """Test that a valid LinkCreate schema passes validation."""
    # Valid data
    data = {
        "original_url": "https://example.com/very/long/path",
        "custom_alias": "example",
        "expires_at": (datetime.utcnow() + timedelta(days=7)).isoformat(),
        "is_password_protected": True,
        "password": "securepassword"
    }
    
    # Should not raise an exception
    link = LinkCreate(**data)
    
    assert link.original_url == "https://example.com/very/long/path"
    assert link.custom_alias == "example"
    assert link.is_password_protected is True
    assert link.password == "securepassword"

def test_link_create_minimal():
    """Test that a minimal LinkCreate schema passes validation."""
    # Minimal data
    data = {
        "original_url": "https://example.com"
    }
    
    # Should not raise an exception
    link = LinkCreate(**data)
    
    assert link.original_url == "https://example.com"
    assert link.custom_alias is None
    assert link.expires_at is None
    assert link.is_password_protected is False
    assert link.password is None

def test_link_create_invalid_url():
    """Test that an invalid URL fails validation."""
    # Invalid URL
    data = {
        "original_url": "not-a-valid-url"
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        LinkCreate(**data)

def test_link_create_invalid_custom_alias():
    """Test that an invalid custom alias fails validation."""
    # Invalid custom alias (too short)
    data1 = {
        "original_url": "https://example.com",
        "custom_alias": "ab"  # Too short
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        LinkCreate(**data1)
    
    # Invalid custom alias (special characters)
    data2 = {
        "original_url": "https://example.com",
        "custom_alias": "invalid@alias"  # Contains invalid character
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        LinkCreate(**data2)

def test_link_create_password_validation():
    """Test that password validation works correctly."""
    # Password protection enabled but no password
    data = {
        "original_url": "https://example.com",
        "is_password_protected": True
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        LinkCreate(**data)
    
    # Password protection enabled with short password
    data = {
        "original_url": "https://example.com",
        "is_password_protected": True,
        "password": "short"
    }
    
    # Should raise a ValidationError
    with pytest.raises(ValidationError):
        LinkCreate(**data)
    
    # Password protection disabled with password
    data = {
        "original_url": "https://example.com",
        "is_password_protected": False,
        "password": "password123"
    }
    
    # Should not raise an exception, but password should be None
    link = LinkCreate(**data)
    assert link.password is None

def test_link_update_schema():
    """Test that LinkUpdate schema works correctly."""
    # All fields
    data = {
        "original_url": "https://updated-example.com",
        "custom_alias": "updated",
        "expires_at": (datetime.utcnow() + timedelta(days=14)).isoformat(),
        "is_active": False,
        "is_password_protected": True,
        "password": "newpassword123"
    }
    
    # Should not raise an exception
    link = LinkUpdate(**data)
    
    assert link.original_url == "https://updated-example.com"
    assert link.custom_alias == "updated"
    assert link.is_active is False
    assert link.is_password_protected is True
    assert link.password == "newpassword123"
    
    # Partial update
    data = {
        "is_active": False
    }
    
    # Should not raise an exception
    link = LinkUpdate(**data)
    
    assert link.original_url is None
    assert link.custom_alias is None
    assert link.is_active is False
    assert link.is_password_protected is None
    assert link.password is None

def test_link_response_schema():
    """Test that LinkResponse schema works correctly."""
    # Valid data
    data = {
        "id": uuid.uuid4(),
        "original_url": "https://example.com",
        "short_code": "example",
        "custom_alias": "example",
        "expires_at": None,
        "is_password_protected": False,
        "user_id": uuid.uuid4(),
        "is_active": True,
        "click_count": 42,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    # Should not raise an exception
    link = LinkResponse(**data)
    
    assert link.original_url == "https://example.com"
    assert link.short_code == "example"
    assert link.is_active is True
    assert link.click_count == 42 