from sqlalchemy import Column, DateTime
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declared_attr

from app.db import Base

class TimestampMixin:
    """Mixin for adding created_at and updated_at columns to models."""
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now(), nullable=False)

class BaseModel(Base):
    """Base model class with common attributes and methods."""
    
    __abstract__ = True
    
    @declared_attr
    def __tablename__(cls):
        """Generate table name automatically based on class name."""
        return cls.__name__.lower() + 's' 