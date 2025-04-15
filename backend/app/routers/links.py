from fastapi import APIRouter, Depends, HTTPException, status, Request, Body, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from datetime import datetime
import uuid

from app.db import get_db
from app.schemas.link import LinkCreate, LinkResponse, LinkUpdate, LinkList
from app.services.link_service import LinkService
from app.services.analytics_service import AnalyticsService
from app.middlewares.auth import require_auth

router = APIRouter()

# Define password verification payload
class PasswordVerifyRequest(BaseModel):
    password: str

@router.post("/", response_model=LinkResponse, status_code=status.HTTP_201_CREATED)
async def create_link(
    request: Request,
    link_data: LinkCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create a new shortened link."""
    # Get authenticated user ID (optional)
    print("Creating link")
    try:
        user_id = require_auth(request)
    except HTTPException:
        # If not authenticated, the link is created anonymously
        user_id = None
    
    link_service = LinkService(db)
    
    # Add user_id to link_data if authenticated
    if user_id:
        link_data.user_id = user_id
    
    try:
        return await link_service.create_link(link_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{short_code}", response_model=LinkResponse)
async def get_link(
    short_code: str,
    db: AsyncSession = Depends(get_db)
):
    """Get link information by short code."""
    link_service = LinkService(db)
    link = await link_service.get_link_by_short_code(short_code)
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    return link

@router.get("/{short_code}/resolve")
async def resolve_link(
    short_code: str,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """Resolve a short link to its original URL and track the click."""
    # Get the link
    link_service = LinkService(db)
    link = await link_service.get_link_by_short_code(short_code)
    
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    
    if link.expires_at and link.expires_at < datetime.utcnow():
        raise HTTPException(status_code=410, detail="Link has expired")
    
    if link.is_password_protected:
        raise HTTPException(status_code=401, detail="Password protected link")
    
    # Track the click
    analytics_service = AnalyticsService(db)
    await analytics_service.track_click(
        link_id=str(link.id),
        user_agent=request.headers.get("user-agent", ""),
        referrer=request.headers.get("referer", ""),
        ip_address=request.headers.get("x-forwarded-for") or request.headers.get("x-real-ip", "")
    )
    
    # Return the original URL
    return {"original_url": link.original_url}

@router.post("/{short_code}/verify")
async def verify_password(
    short_code: str,
    request: Request,
    verify_data: PasswordVerifyRequest,
    db: AsyncSession = Depends(get_db)
):
    """Verify password for a password-protected link."""
    link_service = LinkService(db)
    link = await link_service.get_link_by_short_code(short_code)
    
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    
    if link.expires_at and link.expires_at < datetime.utcnow():
        raise HTTPException(status_code=410, detail="Link has expired")
    
    if not link.is_password_protected:
        # If not password protected, return the original URL
        return {"original_url": link.original_url}
    
    # Verify password
    if not link_service.verify_password(link.password_hash, verify_data.password):
        raise HTTPException(status_code=401, detail="Incorrect password")
    
    # Track the click
    analytics_service = AnalyticsService(db)
    await analytics_service.track_click(
        link_id=str(link.id),
        user_agent=request.headers.get("user-agent", ""),
        referrer=request.headers.get("referer", ""),
        ip_address=request.headers.get("x-forwarded-for") or request.headers.get("x-real-ip", "")
    )
    
    # Return the original URL
    return {"original_url": link.original_url}

@router.get("/", response_model=List[LinkResponse])
async def get_links(
    skip: int = 0,
    limit: int = 100,
    user_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    """Get all links, with optional user filtering."""
    link_service = LinkService(db)
    return await link_service.get_links(skip, limit, user_id)

@router.put("/{link_id}", response_model=LinkResponse)
async def update_link(
    link_id: str,
    link_update: LinkUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update an existing link."""
    link_service = LinkService(db)
    updated_link = await link_service.update_link(link_id, link_update)
    if not updated_link:
        raise HTTPException(status_code=404, detail="Link not found")
    return updated_link

@router.delete("/{link_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_link(
    link_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Delete a link."""
    link_service = LinkService(db)
    success = await link_service.delete_link(link_id)
    if not success:
        raise HTTPException(status_code=404, detail="Link not found")
    return None

@router.get("/my-links", response_model=LinkList)
async def get_user_links(
    request: Request,
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=100, description="Items per page"),
    search: Optional[str] = None,
    sort_by: Optional[str] = None,
    sort_order: Optional[str] = None,
    status: Optional[str] = Query(
        None, 
        description="Filter by status (active, expired, protected)",
        pattern="^(active|expired|protected)$"
    ),
    db: AsyncSession = Depends(get_db)
):
    """Get all links for the authenticated user."""
    # Get authenticated user ID (required)
    user_id = require_auth(request)
    
    link_service = LinkService(db)
    
    # Get links with pagination
    links, total = await link_service.get_links_by_user(
        user_id=user_id,
        page=page,
        per_page=per_page,
        search=search,
        sort_by=sort_by,
        sort_order=sort_order,
        status=status
    )
    
    # Calculate total pages
    total_pages = (total + per_page - 1) // per_page
    
    return LinkList(
        items=links,
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages
    ) 