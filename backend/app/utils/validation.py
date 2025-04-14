import re
from typing import Optional
from urllib.parse import urlparse
from datetime import datetime, timezone

def is_valid_url(url: str) -> bool:
    """
    Validate if a string is a valid URL.
    
    Args:
        url: The URL to validate
        
    Returns:
        bool: True if the URL is valid, False otherwise
    """
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False

def is_valid_short_code(short_code: str) -> bool:
    """
    Validate if a string is a valid short code.
    
    Args:
        short_code: The short code to validate
        
    Returns:
        bool: True if the short code is valid, False otherwise
    """
    if not short_code or len(short_code) < 3 or len(short_code) > 20:
        return False
    
    # Only allow alphanumeric characters, hyphens, and underscores
    return bool(re.match(r'^[a-zA-Z0-9_-]+$', short_code))

def is_valid_password(password: Optional[str], min_length: int = 6) -> bool:
    """
    Validate if a password meets the minimum requirements.
    
    Args:
        password: The password to validate
        min_length: The minimum length required
        
    Returns:
        bool: True if the password is valid, False otherwise
    """
    if not password:
        return False
    
    return len(password) >= min_length

def is_expired(expires_at: Optional[datetime]) -> bool:
    """
    Check if a datetime has expired.
    
    Args:
        expires_at: The expiration datetime
        
    Returns:
        bool: True if expired, False otherwise
    """
    if not expires_at:
        return False
    
    now = datetime.now(timezone.utc)
    return expires_at < now

def sanitize_url(url: str) -> str:
    """
    Sanitize a URL by removing potentially harmful components.
    
    Args:
        url: The URL to sanitize
        
    Returns:
        str: The sanitized URL
    """
    # Basic sanitization - ensure URL has a scheme
    if not urlparse(url).scheme:
        url = f"https://{url}"
    
    # TODO: Add more sanitization rules as needed
    
    return url 