from pydantic import BaseModel, Field, HttpUrl, field_validator, model_validator
from typing import Optional, Dict, List, Any
from datetime import datetime
import uuid
import re

class LinkBase(BaseModel):
    """Base schema for link data."""
    original_url: HttpUrl = Field(..., description="The original URL to be shortened")
    custom_alias: Optional[str] = Field(None, description="Custom alias for the shortened URL")
    expires_at: Optional[datetime] = Field(None, description="Expiration date for the link")
    is_password_protected: bool = Field(False, description="Whether the link is password protected")
    user_id: Optional[uuid.UUID] = Field(None, description="The user ID of the link creator")
    
    @field_validator('custom_alias')
    @classmethod
    def validate_custom_alias(cls, v):
        if v is not None:
            if len(v) < 3:
                raise ValueError('Custom alias must be at least 3 characters long')
            if len(v) > 20:
                raise ValueError('Custom alias must be at most 20 characters long')
            # Stricter validation for special characters
            if not re.match(r'^[a-zA-Z0-9_-]+$', v):
                raise ValueError('Custom alias can only contain alphanumeric characters, hyphens, and underscores')
        return v

class LinkCreate(LinkBase):
    """Schema for creating a new link."""
    password: Optional[str] = Field(None, description="Password for protected links")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional metadata")
    
    @model_validator(mode='after')
    def validate_password_required(self):
        if self.is_password_protected:
            if not self.password or len(self.password) < 6:
                raise ValueError('Password is required and must be at least 6 characters for protected links')
        if not self.is_password_protected:
            self.password = None
        return self

class LinkUpdate(BaseModel):
    """Schema for updating an existing link."""
    original_url: Optional[HttpUrl] = None
    custom_alias: Optional[str] = None
    expires_at: Optional[datetime] = None
    is_active: Optional[bool] = None
    is_password_protected: Optional[bool] = None
    password: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    
    @field_validator('custom_alias')
    @classmethod
    def validate_custom_alias(cls, v):
        if v is not None:
            if len(v) < 3:
                raise ValueError('Custom alias must be at least 3 characters long')
            if len(v) > 20:
                raise ValueError('Custom alias must be at most 20 characters long')
            # Stricter validation for special characters
            if not re.match(r'^[a-zA-Z0-9_-]+$', v):
                raise ValueError('Custom alias can only contain alphanumeric characters, hyphens, and underscores')
        return v
    
    @model_validator(mode='after')
    def validate_password_required(self):
        if self.is_password_protected:
            if self.password is not None and len(self.password) < 6:
                raise ValueError('Password must be at least 6 characters for protected links')
        return self

class LinkResponse(LinkBase):
    """Schema for link response data."""
    id: uuid.UUID
    short_code: str
    user_id: Optional[uuid.UUID] = None
    is_active: bool
    click_count: int = 0
    created_at: datetime
    updated_at: datetime
    
    model_config = {"from_attributes": True}

class LinkClickResponse(BaseModel):
    """Schema for link resolution with click tracking."""
    original_url: HttpUrl
    is_password_protected: bool
    
    model_config = {"from_attributes": True}

class LinkStatsResponse(BaseModel):
    """Schema for link statistics."""
    id: uuid.UUID
    short_code: str
    original_url: HttpUrl
    click_count: int
    created_at: datetime
    top_countries: List[Dict[str, Any]]
    top_referrers: List[Dict[str, Any]]
    top_browsers: List[Dict[str, Any]]
    top_devices: List[Dict[str, Any]]
    
    model_config = {"from_attributes": True}

class LinkList(BaseModel):
    """Schema for paginated link responses."""
    items: List[LinkResponse]
    total: int
    page: int
    per_page: int
    total_pages: int 