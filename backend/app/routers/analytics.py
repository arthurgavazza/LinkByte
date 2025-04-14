from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, List, Optional
from datetime import datetime

from app.db import get_db
from app.schemas.analytics import ClickStats, GeoStats, ReferrerStats
from app.services.analytics_service import AnalyticsService

router = APIRouter()

@router.get("/links/{link_id}/clicks", response_model=ClickStats)
async def get_link_clicks(
    link_id: str,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    interval: str = "day",
    db: AsyncSession = Depends(get_db)
):
    """Get click statistics for a specific link."""
    analytics_service = AnalyticsService(db)
    return await analytics_service.get_link_clicks(link_id, start_date, end_date, interval)

@router.get("/links/{link_id}/geo", response_model=GeoStats)
async def get_link_geo_stats(
    link_id: str,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: AsyncSession = Depends(get_db)
):
    """Get geographic statistics for a specific link."""
    analytics_service = AnalyticsService(db)
    return await analytics_service.get_link_geo_stats(link_id, start_date, end_date)

@router.get("/links/{link_id}/referrers", response_model=ReferrerStats)
async def get_link_referrers(
    link_id: str,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    """Get referrer statistics for a specific link."""
    analytics_service = AnalyticsService(db)
    return await analytics_service.get_link_referrers(link_id, start_date, end_date, limit)

@router.get("/user/{user_id}/summary", response_model=Dict)
async def get_user_summary(
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get analytics summary for a user."""
    analytics_service = AnalyticsService(db)
    return await analytics_service.get_user_summary(user_id) 