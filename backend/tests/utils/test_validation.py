import pytest
from datetime import datetime, timedelta, timezone

from app.utils.validation import (
    is_valid_url,
    is_valid_short_code,
    is_valid_password,
    is_expired,
    sanitize_url
)

def test_is_valid_url():
    """Test URL validation function."""
    # Valid URLs
    assert is_valid_url("https://example.com") is True
    assert is_valid_url("http://example.com/path") is True
    assert is_valid_url("https://subdomain.example.com/path?query=value") is True
    
    # Invalid URLs
    assert is_valid_url("not-a-url") is False
    assert is_valid_url("example.com") is False  # Missing scheme
    assert is_valid_url("") is False
    assert is_valid_url("https://") is False

def test_is_valid_short_code():
    """Test short code validation function."""
    # Valid short codes
    assert is_valid_short_code("example") is True
    assert is_valid_short_code("123456") is True
    assert is_valid_short_code("example-123") is True
    assert is_valid_short_code("example_123") is True
    
    # Invalid short codes
    assert is_valid_short_code("") is False  # Empty
    assert is_valid_short_code("ab") is False  # Too short
    assert is_valid_short_code("a" * 21) is False  # Too long
    assert is_valid_short_code("invalid@code") is False  # Invalid character
    assert is_valid_short_code("invalid space") is False  # Contains space

def test_is_valid_password():
    """Test password validation function."""
    # Valid passwords
    assert is_valid_password("password123") is True
    assert is_valid_password("password", min_length=6) is True
    assert is_valid_password("12345678") is True
    
    # Invalid passwords
    assert is_valid_password("") is False  # Empty
    assert is_valid_password(None) is False  # None
    assert is_valid_password("12345", min_length=6) is False  # Too short
    assert is_valid_password("123", min_length=4) is False  # Too short with custom min length

def test_is_expired():
    """Test expiration checking function."""
    # Not expired
    future_date = datetime.now(timezone.utc) + timedelta(days=1)
    assert is_expired(future_date) is False
    
    # Expired
    past_date = datetime.now(timezone.utc) - timedelta(days=1)
    assert is_expired(past_date) is True
    
    # None (no expiration)
    assert is_expired(None) is False

def test_sanitize_url():
    """Test URL sanitization function."""
    # URLs without scheme
    assert sanitize_url("example.com") == "https://example.com"
    assert sanitize_url("www.example.com/path") == "https://www.example.com/path"
    
    # URLs with scheme (should be unchanged)
    assert sanitize_url("https://example.com") == "https://example.com"
    assert sanitize_url("http://example.com/path") == "http://example.com/path" 