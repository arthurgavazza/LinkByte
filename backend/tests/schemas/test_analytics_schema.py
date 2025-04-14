import pytest
from datetime import datetime
import uuid

from app.schemas.analytics import (
    ClickDataPoint,
    ClickStats,
    CountryData,
    GeoStats,
    ReferrerData,
    ReferrerStats,
    DeviceData,
    DeviceStats,
    BrowserData,
    BrowserStats,
    LinkAnalyticsSummary
)

def test_click_stats_schema():
    """Test that ClickStats schema works correctly."""
    link_id = uuid.uuid4()
    data = {
        "link_id": link_id,
        "total_clicks": 100,
        "time_series": [
            {"date": datetime.utcnow(), "count": 10},
            {"date": datetime.utcnow(), "count": 20},
            {"date": datetime.utcnow(), "count": 30},
            {"date": datetime.utcnow(), "count": 40}
        ],
        "previous_period_change": 25.5
    }
    
    # Should not raise an exception
    click_stats = ClickStats(**data)
    
    assert click_stats.link_id == link_id
    assert click_stats.total_clicks == 100
    assert len(click_stats.time_series) == 4
    assert click_stats.previous_period_change == 25.5

def test_geo_stats_schema():
    """Test that GeoStats schema works correctly."""
    link_id = uuid.uuid4()
    data = {
        "link_id": link_id,
        "total_countries": 3,
        "countries": [
            {"code": "US", "name": "United States", "count": 50, "percentage": 50.0},
            {"code": "GB", "name": "United Kingdom", "count": 30, "percentage": 30.0},
            {"code": "CA", "name": "Canada", "count": 20, "percentage": 20.0}
        ]
    }
    
    # Should not raise an exception
    geo_stats = GeoStats(**data)
    
    assert geo_stats.link_id == link_id
    assert geo_stats.total_countries == 3
    assert len(geo_stats.countries) == 3
    assert geo_stats.countries[0].code == "US"
    assert geo_stats.countries[0].count == 50
    assert geo_stats.countries[0].percentage == 50.0

def test_referrer_stats_schema():
    """Test that ReferrerStats schema works correctly."""
    link_id = uuid.uuid4()
    data = {
        "link_id": link_id,
        "total_referrers": 3,
        "referrers": [
            {"source": "Google", "count": 50, "percentage": 50.0},
            {"source": "Twitter", "count": 30, "percentage": 30.0},
            {"source": "Direct", "count": 20, "percentage": 20.0}
        ]
    }
    
    # Should not raise an exception
    referrer_stats = ReferrerStats(**data)
    
    assert referrer_stats.link_id == link_id
    assert referrer_stats.total_referrers == 3
    assert len(referrer_stats.referrers) == 3
    assert referrer_stats.referrers[0].source == "Google"
    assert referrer_stats.referrers[0].count == 50
    assert referrer_stats.referrers[0].percentage == 50.0

def test_device_stats_schema():
    """Test that DeviceStats schema works correctly."""
    link_id = uuid.uuid4()
    data = {
        "link_id": link_id,
        "devices": [
            {"type": "Mobile", "count": 50, "percentage": 50.0},
            {"type": "Desktop", "count": 40, "percentage": 40.0},
            {"type": "Tablet", "count": 10, "percentage": 10.0}
        ]
    }
    
    # Should not raise an exception
    device_stats = DeviceStats(**data)
    
    assert device_stats.link_id == link_id
    assert len(device_stats.devices) == 3
    assert device_stats.devices[0].type == "Mobile"
    assert device_stats.devices[0].count == 50
    assert device_stats.devices[0].percentage == 50.0

def test_browser_stats_schema():
    """Test that BrowserStats schema works correctly."""
    link_id = uuid.uuid4()
    data = {
        "link_id": link_id,
        "browsers": [
            {"name": "Chrome", "count": 60, "percentage": 60.0},
            {"name": "Firefox", "count": 30, "percentage": 30.0},
            {"name": "Safari", "count": 10, "percentage": 10.0}
        ]
    }
    
    # Should not raise an exception
    browser_stats = BrowserStats(**data)
    
    assert browser_stats.link_id == link_id
    assert len(browser_stats.browsers) == 3
    assert browser_stats.browsers[0].name == "Chrome"
    assert browser_stats.browsers[0].count == 60
    assert browser_stats.browsers[0].percentage == 60.0

def test_link_analytics_summary_schema():
    """Test that LinkAnalyticsSummary schema works correctly."""
    link_id = uuid.uuid4()
    data = {
        "link_id": link_id,
        "short_code": "example",
        "total_clicks": 100,
        "unique_visitors": 80,
        "average_click_rate": 5.5,
        "top_countries": [
            {"code": "US", "name": "United States", "count": 50, "percentage": 50.0},
            {"code": "GB", "name": "United Kingdom", "count": 30, "percentage": 30.0}
        ],
        "top_referrers": [
            {"source": "Google", "count": 50, "percentage": 50.0},
            {"source": "Twitter", "count": 30, "percentage": 30.0}
        ],
        "top_browsers": [
            {"name": "Chrome", "count": 60, "percentage": 60.0},
            {"name": "Firefox", "count": 30, "percentage": 30.0}
        ],
        "top_devices": [
            {"type": "Mobile", "count": 50, "percentage": 50.0},
            {"type": "Desktop", "count": 40, "percentage": 40.0}
        ]
    }
    
    # Should not raise an exception
    summary = LinkAnalyticsSummary(**data)
    
    assert summary.link_id == link_id
    assert summary.short_code == "example"
    assert summary.total_clicks == 100
    assert summary.unique_visitors == 80
    assert summary.average_click_rate == 5.5
    assert len(summary.top_countries) == 2
    assert len(summary.top_referrers) == 2
    assert len(summary.top_browsers) == 2
    assert len(summary.top_devices) == 2 