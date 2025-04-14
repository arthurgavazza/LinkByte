from fastapi import Depends, HTTPException, status, Cookie, Request
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt, JWTError
from typing import Optional
import uuid
import structlog

from app.db import get_db
from app.schemas.user import UserResponse, TokenPayload
from app.services.auth_service import AuthService
from app.config import settings
from app.utils.exceptions import TokenError, UserNotFoundError, UserDisabledError

# Configure structured logging
logger = structlog.get_logger()

async def get_current_user(
    request: Request,
    access_token: Optional[str] = Cookie(None),
    db: AsyncSession = Depends(get_db)
) -> UserResponse:
    """
    Verify access token and return the current user.
    
    Args:
        access_token: The JWT access token from the cookie
        db: Database session
        
    Returns:
        UserResponse: The authenticated user
        
    Raises:
        TokenError: If token is invalid
        UserNotFoundError: If user doesn't exist
        UserDisabledError: If user account is disabled
    """
    request_id = request.headers.get("X-Request-ID", "unknown")
    
    if not access_token:
        logger.warning("Authentication failed - no token", request_id=request_id)
        raise TokenError("Not authenticated")
    
    try:
        # Decode the token
        payload = jwt.decode(
            access_token, 
            settings.JWT_SECRET_KEY, 
            algorithms=[settings.JWT_ALGORITHM]
        )
        token_data = TokenPayload(**payload)
        
        # Check token type and expiration
        if token_data.type != "access":
            logger.warning("Authentication failed - invalid token type", 
                         token_type=token_data.type,
                         request_id=request_id)
            raise TokenError("Invalid token type")
            
        if not token_data.sub:
            logger.warning("Authentication failed - missing subject claim", 
                         request_id=request_id)
            raise TokenError("Invalid token")
            
    except JWTError as e:
        logger.warning("Authentication failed - JWT decode error", 
                     error=str(e), 
                     request_id=request_id)
        raise TokenError("Invalid token")
    
    # Get user from database
    auth_service = AuthService(db)
    user = await auth_service.get_user_by_id(uuid.UUID(token_data.sub))
    
    if not user:
        logger.warning("Authentication failed - user not found", 
                     user_id=token_data.sub,
                     request_id=request_id)
        raise UserNotFoundError()
        
    if not user.is_active:
        logger.warning("Authentication failed - inactive user", 
                     user_id=str(user.id),
                     request_id=request_id)
        raise UserDisabledError()
    
    logger.info("User authenticated", 
               user_id=str(user.id), 
               request_id=request_id)
        
    return user 