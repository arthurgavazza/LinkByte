from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional
import uuid
import re

class UserBase(BaseModel):
    """Base schema for user data."""
    email: EmailStr = Field(..., description="User's email address")
    username: str = Field(..., description="Username for login")
    
    @validator('username')
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters long')
        if len(v) > 50:
            raise ValueError('Username must be at most 50 characters long')
        if not re.match(r'^[a-zA-Z0-9_-]+$', v):
            raise ValueError('Username can only contain alphanumeric characters, hyphens, and underscores')
        return v

class UserCreate(UserBase):
    """Schema for creating a new user."""
    password: str = Field(..., min_length=8, description="User's password")
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one number')
        return v

class UserUpdate(BaseModel):
    """Schema for updating user information."""
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None
    
    @validator('username')
    def validate_username(cls, v):
        if v is not None:
            if len(v) < 3:
                raise ValueError('Username must be at least 3 characters long')
            if len(v) > 50:
                raise ValueError('Username must be at most 50 characters long')
            if not re.match(r'^[a-zA-Z0-9_-]+$', v):
                raise ValueError('Username can only contain alphanumeric characters, hyphens, and underscores')
        return v
    
    @validator('password')
    def validate_password(cls, v):
        if v is not None:
            if len(v) < 8:
                raise ValueError('Password must be at least 8 characters long')
            if not any(c.isupper() for c in v):
                raise ValueError('Password must contain at least one uppercase letter')
            if not any(c.islower() for c in v):
                raise ValueError('Password must contain at least one lowercase letter')
            if not any(c.isdigit() for c in v):
                raise ValueError('Password must contain at least one number')
        return v

class UserResponse(UserBase):
    """Schema for user response data."""
    id: uuid.UUID
    is_active: bool
    is_verified: bool
    created_at: str
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    """Schema for authentication tokens."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    """Schema for JWT token payload."""
    sub: str  # subject (user id)
    exp: int  # expiration time
    type: str  # token type (access or refresh) 