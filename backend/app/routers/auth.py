from fastapi import APIRouter, Depends, HTTPException, Response, status, Cookie, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
import structlog

from app.db import get_db
from app.schemas.user import UserCreate, UserResponse, Token
from app.services.auth_service import AuthService
from app.utils.auth import get_current_user
from app.utils.exceptions import (
    AuthenticationError,
    DuplicateResourceError,
    InvalidCredentialsError,
    UserDisabledError,
    TokenError
)

# Configure structured logging
logger = structlog.get_logger()

router = APIRouter(
    tags=["authentication"],
)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    request: Request,
    user: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user."""
    auth_service = AuthService(db)
    try:
        new_user = await auth_service.register_user(user)
        logger.info(
            "User registered successfully",
            user_id=str(new_user.id),
            username=new_user.username,
            request_id=request.headers.get("X-Request-ID")
        )
        return new_user
    except DuplicateResourceError as e:
        # This will be handled by the global exception handler
        logger.warning(
            "Registration failed - duplicate resource",
            error=e.message,
            field=e.field,
            value=e.value,
            request_id=request.headers.get("X-Request-ID")
        )
        raise
    except Exception as e:
        logger.error(
            "Unexpected error during registration",
            error=str(e),
            request_id=request.headers.get("X-Request-ID")
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during registration"
        )

@router.post("/login")
async def login(
    request: Request,
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    """Login and get access token as HTTP-only cookie."""
    auth_service = AuthService(db)
    try:
        result = await auth_service.authenticate_user(form_data.username, form_data.password)
        
        # Set HTTP-only cookies
        response.set_cookie(
            key="access_token",
            value=result["access_token"],
            httponly=True,
            secure=True,  # Set to True in production
            samesite="lax",
            max_age=1800,  # 30 minutes
        )
        
        response.set_cookie(
            key="refresh_token",
            value=result["refresh_token"],
            httponly=True,
            secure=True,  # Set to True in production
            samesite="lax",
            max_age=604800,  # 7 days
        )
        
        logger.info(
            "User logged in successfully",
            user_id=result["user_id"],
            request_id=request.headers.get("X-Request-ID")
        )
        
        return {"success": True, "user_id": result["user_id"]}
    except (InvalidCredentialsError, UserDisabledError) as e:
        # These will be handled by the global exception handler
        logger.warning(
            "Login failed",
            error=e.message,
            username=form_data.username,
            request_id=request.headers.get("X-Request-ID")
        )
        raise
    except Exception as e:
        logger.error(
            "Unexpected error during login",
            error=str(e),
            request_id=request.headers.get("X-Request-ID")
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during login"
        )

@router.post("/refresh")
async def refresh_token(
    request: Request,
    response: Response,
    refresh_token: Optional[str] = Cookie(None),
    db: AsyncSession = Depends(get_db)
):
    """Refresh access token using refresh token."""
    if not refresh_token:
        logger.warning(
            "Token refresh failed - missing token",
            request_id=request.headers.get("X-Request-ID")
        )
        raise TokenError("Missing refresh token")
    
    auth_service = AuthService(db)
    try:
        result = await auth_service.refresh_access_token(refresh_token)
        
        # Set new HTTP-only cookie for access token
        response.set_cookie(
            key="access_token",
            value=result["access_token"],
            httponly=True,
            secure=True,  # Set to True in production
            samesite="lax",
            max_age=1800,  # 30 minutes
        )
        
        # Set new HTTP-only cookie for refresh token (if rotated)
        if "refresh_token" in result:
            response.set_cookie(
                key="refresh_token",
                value=result["refresh_token"],
                httponly=True,
                secure=True,  # Set to True in production
                samesite="lax",
                max_age=604800,  # 7 days
            )
        
        logger.info(
            "Token refreshed successfully",
            request_id=request.headers.get("X-Request-ID")
        )
        
        return {"success": True}
    except AuthenticationError as e:
        # This will be handled by the global exception handler
        logger.warning(
            "Token refresh failed",
            error=e.message,
            request_id=request.headers.get("X-Request-ID")
        )
        raise
    except Exception as e:
        logger.error(
            "Unexpected error during token refresh",
            error=str(e),
            request_id=request.headers.get("X-Request-ID")
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during token refresh"
        )

@router.post("/logout")
async def logout(
    request: Request,
    response: Response
):
    """Logout by clearing auth cookies."""
    response.delete_cookie(key="access_token")
    response.delete_cookie(key="refresh_token")
    
    logger.info(
        "User logged out",
        request_id=request.headers.get("X-Request-ID")
    )
    
    return {"success": True}

@router.get("/me", response_model=UserResponse)
async def get_current_user_endpoint(
    request: Request,
    current_user: UserResponse = Depends(get_current_user)
):
    """Get the current authenticated user."""
    logger.info(
        "Current user fetched",
        user_id=str(current_user.id),
        request_id=request.headers.get("X-Request-ID")
    )
    
    return current_user 