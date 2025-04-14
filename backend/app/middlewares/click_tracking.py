from fastapi import Request, Depends
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
import uuid
import re
from typing import Optional

from app.db import get_db
from app.services.click_service import ClickService
from app.services.link_service import LinkService

class ClickTrackingMiddleware(BaseHTTPMiddleware):
    """Middleware for tracking link clicks."""
    
    async def dispatch(self, request: Request, call_next):
        """
        Process incoming requests to track link clicks.
        This only tracks requests to the redirect endpoint.
        """
        # Only process requests to the root path which is used for redirects
        # The regex matches paths like / followed by a short code
        path = request.url.path
        
        if re.match(r"^/[a-zA-Z0-9_-]+$", path):
            # Extract short code from path
            short_code = path.strip("/")
            
            try:
                # We need to manually create a DB session here
                db = request.app.state.db_pool()
                
                # Get link details
                link_service = LinkService(db)
                link = await link_service.get_link_by_short_code(short_code)
                
                if link:
                    # Record the click asynchronously
                    await self._record_click(request, link.id, db)
            except Exception as e:
                # Log the error but don't interrupt request processing
                print(f"Error tracking click: {str(e)}")
                # In production, use a proper logger
                # logger.error("Error tracking click", exc_info=e)
            
        # Continue processing the request
        response = await call_next(request)
        return response
    
    async def _record_click(self, request: Request, link_id: uuid.UUID, db: AsyncSession):
        """Record click data for a link."""
        # Extract request data
        ip_address = self._get_client_ip(request)
        user_agent = request.headers.get("user-agent")
        referrer = request.headers.get("referer")  # Note: HTTP spec spells it "referer"
        
        # Call click service to record the click
        # Country and city would be populated by a geo-IP service in production
        click_service = ClickService(db)
        await click_service.record_click(
            link_id=link_id,
            ip_address=ip_address,
            user_agent=user_agent,
            referrer=referrer,
            country=None,  # Could be added with a geo-IP service
            city=None,     # Could be added with a geo-IP service
            metadata={}
        )
        
        # Commit the transaction
        await db.commit()
    
    def _get_client_ip(self, request: Request) -> Optional[str]:
        """
        Get the client's IP address from the request.
        Handles reverse proxies by checking common headers.
        """
        # First check for proxy headers
        headers = request.headers
        
        # Check common proxy headers
        if "x-forwarded-for" in headers:
            # X-Forwarded-For format: client, proxy1, proxy2, ...
            return headers["x-forwarded-for"].split(",")[0].strip()
        
        if "x-real-ip" in headers:
            return headers["x-real-ip"]
        
        # Fallback to request client
        return request.client.host if request.client else None 