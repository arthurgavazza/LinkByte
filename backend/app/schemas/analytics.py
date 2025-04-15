from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
from datetime import datetime
import uuid

class ClickDataPoint(BaseModel):
    """Schema for a single click data point."""
    date: datetime
    count: int

class ClickStats(BaseModel):
    """Schema for click statistics."""
    link_id: uuid.UUID
    total_clicks: int
    time_series: List[ClickDataPoint]
    previous_period_change: Optional[float] = None

class CountryData(BaseModel):
    """Schema for country statistics."""
    code: str
    name: str
    count: int
    percentage: float

class GeoStats(BaseModel):
    """Schema for geographic statistics."""
    link_id: uuid.UUID
    total_countries: int
    countries: List[CountryData]

class ReferrerData(BaseModel):
    """Schema for referrer statistics."""
    source: str
    count: int
    percentage: float

class ReferrerStats(BaseModel):
    """Schema for referrer statistics."""
    link_id: uuid.UUID
    total_referrers: int
    referrers: List[ReferrerData]

class DeviceData(BaseModel):
    """Schema for device statistics."""
    type: str  # mobile, desktop, tablet, etc.
    count: int
    percentage: float

class DeviceStats(BaseModel):
    """Schema for device statistics."""
    link_id: uuid.UUID
    devices: List[DeviceData]

class BrowserData(BaseModel):
    """Schema for browser statistics."""
    name: str
    count: int
    percentage: float

class BrowserStats(BaseModel):
    """Schema for browser statistics."""
    link_id: uuid.UUID
    browsers: List[BrowserData]

class LinkAnalyticsSummary(BaseModel):
    """Schema for link analytics summary."""
    link_id: uuid.UUID
    short_code: str
    total_clicks: int
    unique_visitors: int
    average_click_rate: float
    top_countries: List[CountryData]
    top_referrers: List[ReferrerData]
    top_browsers: List[BrowserData]
    top_devices: List[DeviceData]

    model_config = {"from_attributes": True}

class UserAnalyticsSummary(BaseModel):
    """Schema for user analytics summary."""
    user_id: uuid.UUID
    total_links: int
    total_clicks: int
    top_performing_links: List[Dict[str, Any]]
    click_growth: float
    
    model_config = {"from_attributes": True} 