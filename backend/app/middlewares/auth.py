from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from jose import jwt, JWTError
from typing import Optional
import uuid

from app.config import settings
from app.schemas.user import TokenPayload

async def auth_middleware(request: Request, call_next):
    """
    Middleware to handle authentication.
    
    This middleware checks for an access token in the cookies and validates it.
    It does not block requests, but sets a user_id attribute on the request if 
    authentication is successful.
    """
    # Get access token from cookies
    access_token: Optional[str] = request.cookies.get("access_token")
    
    # Set default user_id to None (unauthenticated)
    request.state.user_id = None
    
    if access_token:
        try:
            # Decode the token
            payload = jwt.decode(
                access_token, 
                settings.JWT_SECRET_KEY, 
                algorithms=[settings.JWT_ALGORITHM]
            )
            token_data = TokenPayload(**payload)
            
            # Check token type
            if token_data.type != "access":
                # Invalid token type, but don't block the request
                return await call_next(request)
                
            # Set user_id in request state
            request.state.user_id = uuid.UUID(token_data.sub)
            
        except (JWTError, ValueError):
            # Invalid token, but don't block the request
            pass
    
    # Continue with the request
    return await call_next(request)

def require_auth(request: Request):
    """
    Function to use within endpoints to require authentication.
    
    Returns the user_id if authenticated, otherwise raises HTTPException.
    """
    if request.state.user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return request.state.user_id 