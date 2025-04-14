from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
import secrets
import string

from app.models.link import Link
from app.schemas.link import LinkCreate, LinkUpdate, LinkResponse

class LinkService:
    """Service for handling link operations."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create_link(self, link_data: LinkCreate, user_id: Optional[uuid.UUID] = None) -> Link:
        """Create a new shortened link."""
        # Generate short code if custom alias is not provided
        short_code = link_data.custom_alias or self._generate_short_code()
        
        # Check if short code already exists
        if await self._short_code_exists(short_code):
            if link_data.custom_alias:
                raise ValueError(f"Custom alias '{short_code}' is already in use")
            # If it's a generated code that already exists, try again
            return await self.create_link(link_data, user_id)
        
        # Hash password if link is password protected
        password_hash = None
        if link_data.is_password_protected and link_data.password:
            from passlib.hash import bcrypt
            password_hash = bcrypt.hash(link_data.password)
        
        # Create new link
        link = Link(
            id=uuid.uuid4(),
            short_code=short_code,
            original_url=str(link_data.original_url),
            user_id=user_id,
            expires_at=link_data.expires_at,
            is_active=True,
            is_password_protected=link_data.is_password_protected,
            password_hash=password_hash,
            click_count=0,
            metadata=link_data.metadata or {}
        )
        
        self.db.add(link)
        await self.db.flush()
        await self.db.refresh(link)
        
        return link
    
    async def get_link_by_id(self, link_id: uuid.UUID) -> Optional[Link]:
        """Get a link by its ID."""
        stmt = select(Link).where(Link.id == link_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()
    
    async def get_link_by_short_code(self, short_code: str) -> Optional[Link]:
        """Get a link by its short code."""
        stmt = select(Link).where(Link.short_code == short_code)
        result = await self.db.execute(stmt)
        return result.scalars().first()
    
    async def get_links(
        self, 
        skip: int = 0, 
        limit: int = 100, 
        user_id: Optional[uuid.UUID] = None
    ) -> List[Link]:
        """Get all links, optionally filtered by user ID."""
        stmt = select(Link).order_by(Link.created_at.desc()).offset(skip).limit(limit)
        
        if user_id:
            stmt = stmt.where(Link.user_id == user_id)
        
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
    
    async def update_link(self, link_id: uuid.UUID, link_data: LinkUpdate) -> Optional[Link]:
        """Update an existing link."""
        link = await self.get_link_by_id(link_id)
        if not link:
            return None
        
        # Check if custom alias is being changed and if it already exists
        if link_data.custom_alias and link_data.custom_alias != link.short_code:
            if await self._short_code_exists(link_data.custom_alias):
                raise ValueError(f"Custom alias '{link_data.custom_alias}' is already in use")
        
        # Convert Pydantic model to dict, excluding None values
        update_data = link_data.dict(exclude_unset=True)
        
        # Handle password hashing
        if "is_password_protected" in update_data:
            if update_data.get("is_password_protected") and "password" in update_data:
                from passlib.hash import bcrypt
                update_data["password_hash"] = bcrypt.hash(update_data.pop("password"))
            elif not update_data.get("is_password_protected"):
                update_data["password_hash"] = None
                if "password" in update_data:
                    update_data.pop("password")
        
        # Update the link in the database
        stmt = (
            update(Link)
            .where(Link.id == link_id)
            .values(**update_data)
            .returning(Link)
        )
        
        result = await self.db.execute(stmt)
        await self.db.flush()
        
        return result.scalars().first()
    
    async def delete_link(self, link_id: uuid.UUID) -> bool:
        """Delete a link (or mark as inactive)."""
        link = await self.get_link_by_id(link_id)
        if not link:
            return False
        
        # Option 1: Hard delete
        # stmt = delete(Link).where(Link.id == link_id)
        # await self.db.execute(stmt)
        
        # Option 2: Soft delete (mark as inactive)
        link.is_active = False
        await self.db.flush()
        
        return True
    
    async def increment_click_count(self, link_id: uuid.UUID) -> bool:
        """Increment the click count for a link."""
        stmt = (
            update(Link)
            .where(Link.id == link_id)
            .values(click_count=Link.click_count + 1)
        )
        
        result = await self.db.execute(stmt)
        return result.rowcount > 0
    
    async def _short_code_exists(self, short_code: str) -> bool:
        """Check if a short code already exists."""
        stmt = select(func.count()).select_from(Link).where(Link.short_code == short_code)
        result = await self.db.execute(stmt)
        return result.scalar() > 0
    
    def _generate_short_code(self, length: int = 6) -> str:
        """Generate a random short code."""
        alphabet = string.ascii_letters + string.digits
        return ''.join(secrets.choice(alphabet) for _ in range(length)) 