from sqlalchemy import Column, String, DateTime, ForeignKey, func, Index, JSON
from sqlalchemy.sql import expression
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.models.base import Base, TimestampMixin

class Click(Base, TimestampMixin):
    """Model representing a click on a shortened link."""
    
    __tablename__ = "clicks"
    
    id = Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4
    )
    
    link_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("links.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    clicked_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(),
        nullable=False,
        index=True
    )
    
    ip_address = Column(
        String(50),
        nullable=True
    )
    
    user_agent = Column(
        String(500),
        nullable=True
    )
    
    referrer = Column(
        String(2000),
        nullable=True
    )
    
    country = Column(
        String(100),
        nullable=True,
        index=True
    )
    
    city = Column(
        String(100),
        nullable=True
    )
    
    device_type = Column(
        String(50),
        nullable=True,
        index=True
    )
    
    browser = Column(
        String(100),
        nullable=True
    )
    
    os = Column(
        String(100),
        nullable=True
    )
    
    click_metadata = Column(
        JSON,
        nullable=True,
        default=dict
    )

    # Relationships
    link = relationship("Link", back_populates="clicks")
    
    # Secondary indexes
    __table_args__ = (
        Index('ix_clicks_link_id_clicked_at', 'link_id', 'clicked_at'),
        Index('ix_clicks_country', 'country'),
        Index('ix_clicks_device_type', 'device_type'),
    ) 