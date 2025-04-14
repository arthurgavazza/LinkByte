from sqlalchemy import select, func, extract, desc, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import text
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
import uuid
from sqlalchemy import insert

from app.models.click import Click
from app.models.link import Link
from app.schemas.analytics import (
    ClickStats, 
    ClickDataPoint, 
    GeoStats, 
    CountryData, 
    ReferrerStats, 
    ReferrerData,
    UserAnalyticsSummary,
    LinkAnalyticsSummary
)

class AnalyticsService:
    """Service for handling analytics operations."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_link_clicks(
        self, 
        link_id: str, 
        start_date: Optional[datetime] = None, 
        end_date: Optional[datetime] = None, 
        interval: str = "day"
    ) -> ClickStats:
        """Get click statistics for a specific link."""
        # Convert string ID to UUID
        link_uuid = uuid.UUID(link_id)
        
        # Set default dates if not provided
        if not end_date:
            end_date = datetime.utcnow()
        if not start_date:
            start_date = end_date - timedelta(days=30)
            
        # Calculate total clicks
        total_clicks_query = select(func.count(Click.id)).where(
            and_(
                Click.link_id == link_uuid,
                Click.clicked_at >= start_date,
                Click.clicked_at <= end_date
            )
        )
        total_clicks_result = await self.db.execute(total_clicks_query)
        total_clicks = total_clicks_result.scalar() or 0
        
        # Calculate previous period change
        previous_start = start_date - (end_date - start_date)
        previous_end = start_date - timedelta(seconds=1)
        
        previous_clicks_query = select(func.count(Click.id)).where(
            and_(
                Click.link_id == link_uuid,
                Click.clicked_at >= previous_start,
                Click.clicked_at <= previous_end
            )
        )
        previous_clicks_result = await self.db.execute(previous_clicks_query)
        previous_clicks = previous_clicks_result.scalar() or 0
        
        previous_period_change = None
        if previous_clicks > 0:
            previous_period_change = ((total_clicks - previous_clicks) / previous_clicks) * 100
        
        # Get time series data based on interval
        if interval == "hour":
            date_trunc_expr = func.date_trunc('hour', Click.clicked_at)
        elif interval == "day":
            date_trunc_expr = func.date_trunc('day', Click.clicked_at)
        elif interval == "week":
            date_trunc_expr = func.date_trunc('week', Click.clicked_at)
        elif interval == "month":
            date_trunc_expr = func.date_trunc('month', Click.clicked_at)
        else:
            date_trunc_expr = func.date_trunc('day', Click.clicked_at)
        
        time_series_query = select(
            date_trunc_expr.label('date'),
            func.count(Click.id).label('count')
        ).where(
            and_(
                Click.link_id == link_uuid,
                Click.clicked_at >= start_date,
                Click.clicked_at <= end_date
            )
        ).group_by('date').order_by('date')
        
        time_series_result = await self.db.execute(time_series_query)
        time_series_data = time_series_result.all()
        
        time_series = [
            ClickDataPoint(date=row.date, count=row.count)
            for row in time_series_data
        ]
        
        return ClickStats(
            link_id=link_uuid,
            total_clicks=total_clicks,
            time_series=time_series,
            previous_period_change=previous_period_change
        )
    
    async def get_link_geo_stats(
        self, 
        link_id: str, 
        start_date: Optional[datetime] = None, 
        end_date: Optional[datetime] = None
    ) -> GeoStats:
        """Get geographic statistics for a specific link."""
        # Convert string ID to UUID
        link_uuid = uuid.UUID(link_id)
        
        # Set default dates if not provided
        if not end_date:
            end_date = datetime.utcnow()
        if not start_date:
            start_date = end_date - timedelta(days=30)
        
        # Query for country data
        country_query = select(
            Click.country,
            func.count(Click.id).label('count')
        ).where(
            and_(
                Click.link_id == link_uuid,
                Click.clicked_at >= start_date,
                Click.clicked_at <= end_date,
                Click.country.is_not(None)
            )
        ).group_by(Click.country).order_by(desc('count'))
        
        country_result = await self.db.execute(country_query)
        country_data = country_result.all()
        
        # Get total count for percentage calculation
        total_countries_count = sum(row.count for row in country_data)
        
        # Prepare country list with name mapping
        countries = []
        for row in country_data:
            country_code = row.country
            country_name = self._get_country_name(country_code)  # Helper method to map code to name
            percentage = (row.count / total_countries_count * 100) if total_countries_count > 0 else 0
            
            countries.append(CountryData(
                code=country_code,
                name=country_name,
                count=row.count,
                percentage=percentage
            ))
        
        return GeoStats(
            link_id=link_uuid,
            total_countries=len(countries),
            countries=countries
        )
    
    async def get_link_referrers(
        self, 
        link_id: str, 
        start_date: Optional[datetime] = None, 
        end_date: Optional[datetime] = None,
        limit: int = 10
    ) -> ReferrerStats:
        """Get referrer statistics for a specific link."""
        # Convert string ID to UUID
        link_uuid = uuid.UUID(link_id)
        
        # Set default dates if not provided
        if not end_date:
            end_date = datetime.utcnow()
        if not start_date:
            start_date = end_date - timedelta(days=30)
        
        # Query for referrer data
        referrer_query = select(
            Click.referrer,
            func.count(Click.id).label('count')
        ).where(
            and_(
                Click.link_id == link_uuid,
                Click.clicked_at >= start_date,
                Click.clicked_at <= end_date,
                Click.referrer.is_not(None)
            )
        ).group_by(Click.referrer).order_by(desc('count')).limit(limit)
        
        referrer_result = await self.db.execute(referrer_query)
        referrer_data = referrer_result.all()
        
        # Get total count for percentage calculation (including those beyond the limit)
        total_referrers_query = select(func.count(Click.id)).where(
            and_(
                Click.link_id == link_uuid,
                Click.clicked_at >= start_date,
                Click.clicked_at <= end_date,
                Click.referrer.is_not(None)
            )
        )
        total_referrers_result = await self.db.execute(total_referrers_query)
        total_referrers_count = total_referrers_result.scalar() or 0
        
        # Prepare referrer list
        referrers = []
        for row in referrer_data:
            source = row.referrer if row.referrer else "Direct"
            percentage = (row.count / total_referrers_count * 100) if total_referrers_count > 0 else 0
            
            referrers.append(ReferrerData(
                source=source,
                count=row.count,
                percentage=percentage
            ))
        
        # Count unique referrers
        unique_referrers_query = select(func.count(Click.referrer.distinct())).where(
            and_(
                Click.link_id == link_uuid,
                Click.clicked_at >= start_date,
                Click.clicked_at <= end_date,
                Click.referrer.is_not(None)
            )
        )
        unique_referrers_result = await self.db.execute(unique_referrers_query)
        total_unique_referrers = unique_referrers_result.scalar() or 0
        
        return ReferrerStats(
            link_id=link_uuid,
            total_referrers=total_unique_referrers,
            referrers=referrers
        )
    
    async def get_user_summary(self, user_id: str) -> Dict:
        """Get analytics summary for a user."""
        # Convert string ID to UUID
        user_uuid = uuid.UUID(user_id)
        
        # Get user's links
        links_query = select(Link).where(Link.user_id == user_uuid)
        links_result = await self.db.execute(links_query)
        links = links_result.scalars().all()
        
        total_links = len(links)
        
        if total_links == 0:
            return UserAnalyticsSummary(
                user_id=user_uuid,
                total_links=0,
                total_clicks=0,
                top_performing_links=[],
                click_growth=0.0
            ).dict()
        
        # Calculate total clicks
        link_ids = [link.id for link in links]
        total_clicks_query = select(func.count(Click.id)).where(Click.link_id.in_(link_ids))
        total_clicks_result = await self.db.execute(total_clicks_query)
        total_clicks = total_clicks_result.scalar() or 0
        
        # Calculate click growth (comparing current month vs previous month)
        current_date = datetime.utcnow()
        current_month_start = datetime(current_date.year, current_date.month, 1)
        previous_month_start = current_month_start.replace(
            month=current_month_start.month - 1 if current_month_start.month > 1 else 12,
            year=current_month_start.year if current_month_start.month > 1 else current_month_start.year - 1
        )
        
        current_month_clicks_query = select(func.count(Click.id)).where(
            and_(
                Click.link_id.in_(link_ids),
                Click.clicked_at >= current_month_start
            )
        )
        previous_month_clicks_query = select(func.count(Click.id)).where(
            and_(
                Click.link_id.in_(link_ids),
                Click.clicked_at >= previous_month_start,
                Click.clicked_at < current_month_start
            )
        )
        
        current_month_clicks_result = await self.db.execute(current_month_clicks_query)
        previous_month_clicks_result = await self.db.execute(previous_month_clicks_query)
        
        current_month_clicks = current_month_clicks_result.scalar() or 0
        previous_month_clicks = previous_month_clicks_result.scalar() or 0
        
        click_growth = 0.0
        if previous_month_clicks > 0:
            click_growth = ((current_month_clicks - previous_month_clicks) / previous_month_clicks) * 100
        
        # Get top performing links
        top_links_query = select(
            Link.id,
            Link.short_code,
            Link.original_url,
            func.count(Click.id).label('click_count')
        ).join(
            Click, Link.id == Click.link_id
        ).where(
            Link.user_id == user_uuid
        ).group_by(
            Link.id
        ).order_by(
            desc('click_count')
        ).limit(5)
        
        top_links_result = await self.db.execute(top_links_query)
        top_links_data = top_links_result.all()
        
        top_performing_links = []
        for row in top_links_data:
            top_performing_links.append({
                "link_id": str(row.id),
                "short_code": row.short_code,
                "original_url": row.original_url,
                "click_count": row.click_count
            })
        
        return UserAnalyticsSummary(
            user_id=user_uuid,
            total_links=total_links,
            total_clicks=total_clicks,
            top_performing_links=top_performing_links,
            click_growth=click_growth
        ).dict()
    
    def _get_country_name(self, country_code: str) -> str:
        """Helper method to get country name from country code."""
        # This could be replaced with a proper country code library
        # or a lookup table with all country codes
        country_mapping = {
            "US": "United States",
            "GB": "United Kingdom",
            "CA": "Canada",
            "AU": "Australia",
            "DE": "Germany",
            "FR": "France",
            "JP": "Japan",
            "CN": "China",
            "IN": "India",
            "BR": "Brazil",
            # Add more mappings as needed
        }
        
        return country_mapping.get(country_code, country_code)

    async def track_click(self, link_id: str, user_agent: str = "", referrer: str = "", ip_address: str = ""):
        """
        Track a click on a short link.
        
        Args:
            link_id: The ID of the link that was clicked
            user_agent: The user agent of the client
            referrer: The referrer URL
            ip_address: The IP address of the client
            
        Returns:
            The created click record
        """
        # Create a new click record
        click_id = str(uuid.uuid4())
        
        # Get geolocation data if available (simplified for now)
        country = None
        city = None
        
        # Parse user agent for device and browser info (simplified for now)
        device_type = "unknown"
        browser = "unknown"
        os = "unknown"
        
        if "mobile" in user_agent.lower():
            device_type = "mobile"
        elif "tablet" in user_agent.lower():
            device_type = "tablet"
        else:
            device_type = "desktop"
            
        # Insert the click record
        stmt = insert(Click).values(
            id=click_id,
            link_id=link_id,
            clicked_at=datetime.utcnow(),
            ip_address=ip_address,
            user_agent=user_agent,
            referrer=referrer,
            country=country,
            city=city,
            device_type=device_type,
            browser=browser,
            os=os
        )
        
        await self.db.execute(stmt)
        await self.db.commit()
        
        # Update the click count on the link (will be implemented in link_service)
        
        # Return the click ID
        return click_id
        
    async def get_click_count(self, link_id: str) -> int:
        """
        Get the total number of clicks for a link.
        
        Args:
            link_id: The ID of the link
            
        Returns:
            The total number of clicks
        """
        stmt = select(Click).where(Click.link_id == link_id)
        result = await self.db.execute(stmt)
        clicks = result.scalars().all()
        
        return len(clicks)
        
    async def get_clicks_by_date(self, link_id: str, start_date: datetime, end_date: datetime):
        """
        Get clicks for a link within a date range.
        
        Args:
            link_id: The ID of the link
            start_date: The start date of the range
            end_date: The end date of the range
            
        Returns:
            List of clicks within the date range
        """
        stmt = select(Click).where(
            Click.link_id == link_id,
            Click.clicked_at >= start_date,
            Click.clicked_at <= end_date
        )
        
        result = await self.db.execute(stmt)
        clicks = result.scalars().all()
        
        return clicks 