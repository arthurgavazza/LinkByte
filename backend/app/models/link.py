from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer, Text, Index
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import uuid

from app.models.base import BaseModel, TimestampMixin

class Link(BaseModel, TimestampMixin):
    """Link model for storing shortened URLs."""
    
    __tablename__ = "links"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    short_code = Column(String(20), unique=True, nullable=False, index=True)
    original_url = Column(Text, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    expires_at = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    click_count = Column(Integer, default=0)
    is_password_protected = Column(Boolean, default=False)
    password_hash = Column(String(255), nullable=True)
    link_metadata = Column(JSONB, default={})
    
    # Relationships
    user = relationship("User", back_populates="links")
    clicks = relationship("Click", back_populates="link", cascade="all, delete-orphan")
    
    # Secondary indexes
    __table_args__ = (
        Index('ix_links_user_id_created_at', 'user_id', 'created_at'),
        Index('ix_links_expires_at', 'expires_at'),
    ) 