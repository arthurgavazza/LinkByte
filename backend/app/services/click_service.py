from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta
import uuid
import re
from ipaddress import ip_address
from typing import Dict, Optional

from app.models.click import Click
from app.models.link import Link

class ClickService:
    """Service for handling link click operations."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def record_click(
        self, 
        link_id: uuid.UUID, 
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
        referrer: Optional[str] = None,
        country: Optional[str] = None,
        city: Optional[str] = None,
        metadata: Optional[Dict] = None
    ) -> Click:
        """Record a click event for a link."""
        # Clean and anonymize IP address if present
        clean_ip = None
        if ip_address:
            clean_ip = self._anonymize_ip(ip_address)
        
        # Parse user agent to extract browser and device info
        device_type = None
        browser = None
        os = None
        if user_agent:
            device_type, browser, os = self._parse_user_agent(user_agent)
        
        # Clean referrer
        clean_referrer = None
        if referrer:
            clean_referrer = self._clean_referrer(referrer)
        
        # Create click record
        click = Click(
            id=uuid.uuid4(),
            link_id=link_id,
            clicked_at=datetime.utcnow(),
            ip_address=clean_ip,
            user_agent=user_agent,
            referrer=clean_referrer,
            country=country,
            city=city,
            device_type=device_type,
            browser=browser,
            os=os,
            click_metadata=metadata or {}
        )
        
        self.db.add(click)
        await self.db.flush()
        
        # Increment link click count
        await self._increment_link_click_count(link_id)
        
        return click
    
    async def _increment_link_click_count(self, link_id: uuid.UUID) -> None:
        """Increment the click count on the link."""
        link = await self.db.get(Link, link_id)
        if link:
            link.click_count += 1
            await self.db.flush()
    
    def _anonymize_ip(self, ip: str) -> str:
        """Anonymize IP address for privacy (keep first portion only)."""
        try:
            addr = ip_address(ip)
            if addr.version == 4:
                # For IPv4, keep the first two octets
                parts = ip.split('.')
                if len(parts) == 4:
                    return f"{parts[0]}.{parts[1]}.0.0"
            elif addr.version == 6:
                # For IPv6, keep the first half of the address
                parts = ip.split(':')
                if len(parts) >= 4:
                    return f"{parts[0]}:{parts[1]}:{parts[2]}:{parts[3]}:0:0:0:0"
            return ip  # Return original if parsing fails
        except:
            return ip  # Return original if invalid
    
    def _parse_user_agent(self, user_agent: str) -> tuple:
        """Extract device type, browser and OS from user agent string."""
        # Default values
        device_type = "unknown"
        browser = "unknown"
        os = "unknown"
        
        user_agent_lower = user_agent.lower()
        
        # Simple device detection
        if any(mobile in user_agent_lower for mobile in ["mobi", "android", "iphone", "ipod", "ipad", "webos"]):
            if "ipad" in user_agent_lower:
                device_type = "tablet"
            else:
                device_type = "mobile"
        else:
            device_type = "desktop"
        
        # Simple browser detection
        browsers = {
            "chrome": r"chrome/(\d+)",
            "safari": r"safari/(\d+)",
            "firefox": r"firefox/(\d+)",
            "edge": r"edge/(\d+)",
            "opera": r"opera/(\d+)",
            "ie": r"msie (\d+)"
        }
        
        for browser_name, pattern in browsers.items():
            if re.search(pattern, user_agent_lower):
                browser = browser_name
                break
        
        # Simple OS detection - Check mobile OS first
        if "android" in user_agent_lower:
            os = "android"
        elif "iphone" in user_agent_lower or "ipad" in user_agent_lower or "ipod" in user_agent_lower:
            os = "ios"
        elif "windows" in user_agent_lower:
            os = "windows"
        elif "mac os" in user_agent_lower:
            os = "macos"
        elif "linux" in user_agent_lower:
            os = "linux"
        
        return device_type, browser, os
    
    def _clean_referrer(self, referrer: str) -> str:
        """Clean and normalize referrer URL."""
        if not referrer:
            return None
            
        # Extract domain from referrer URL
        domain_match = re.search(r'https?://(?:www\.)?([^/]+)', referrer)
        if domain_match:
            return domain_match.group(1).lower()
        
        return referrer.lower()
    
    async def is_unique_click(self, link_id: uuid.UUID, ip_address: str) -> bool:
        """Check if this is a unique click (first time from this IP)."""
        if not ip_address:
            return True
            
        # Anonymize IP for consistency with stored data
        clean_ip = self._anonymize_ip(ip_address)
        
        # Check if there's a previous click from this IP
        from sqlalchemy import select, and_
        from sqlalchemy.sql import exists
        
        # Look for clicks in the last 24 hours from the same IP
        one_day_ago = datetime.utcnow() - timedelta(days=1)
        
        stmt = select(exists().where(
            and_(
                Click.link_id == link_id,
                Click.ip_address == clean_ip,
                Click.clicked_at >= one_day_ago
            )
        ))
        
        result = await self.db.execute(stmt)
        exists_click = result.scalar()
        
        # Return True if no previous click found
        return not exists_click 