from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
import uuid
import os
from typing import Dict, Optional

from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, TokenPayload
from app.config import settings
from app.utils.exceptions import (
    DuplicateResourceError, 
    InvalidCredentialsError, 
    UserDisabledError, 
    UserNotFoundError,
    TokenError
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    """Service for handling authentication operations."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def register_user(self, user_data: UserCreate) -> UserResponse:
        """Register a new user."""
        # Check if email already exists
        email_exists = await self._get_user_by_email(user_data.email)
        if email_exists:
            raise DuplicateResourceError("User", "email", user_data.email)
        
        # Check if username already exists
        username_exists = await self._get_user_by_username(user_data.username)
        if username_exists:
            raise DuplicateResourceError("User", "username", user_data.username)
        
        # Hash the password
        hashed_password = self._hash_password(user_data.password)
        
        # Create new user
        user = User(
            id=uuid.uuid4(),
            email=user_data.email,
            username=user_data.username,
            password_hash=hashed_password,
            is_active=True,
            is_verified=False  # Email verification would be implemented separately
        )
        
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        
        # Convert to response model
        return UserResponse(
            id=user.id,
            email=user.email,
            username=user.username,
            is_active=user.is_active,
            is_verified=user.is_verified,
            created_at=user.created_at.isoformat()
        )
    
    async def authenticate_user(self, username: str, password: str) -> Dict:
        """Authenticate a user and return tokens."""
        # Check if user exists by username or email
        user = None
        if "@" in username:  # If username looks like an email
            user = await self._get_user_by_email(username)
        else:
            user = await self._get_user_by_username(username)
        
        if not user:
            raise InvalidCredentialsError()
        
        # Check if user is active
        if not user.is_active:
            raise UserDisabledError()
        
        # Verify password
        if not self._verify_password(password, user.password_hash):
            raise InvalidCredentialsError()
        
        # Create access and refresh tokens
        access_token = self._create_token(
            {"sub": str(user.id), "type": "access"},
            timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        
        refresh_token = self._create_token(
            {"sub": str(user.id), "type": "refresh"},
            timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        )
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user_id": str(user.id)
        }
    
    async def refresh_access_token(self, refresh_token: str) -> Dict:
        """Refresh access token using refresh token."""
        try:
            # Decode the refresh token
            payload = jwt.decode(refresh_token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
            token_data = TokenPayload(**payload)
            
            # Check if it's a refresh token
            if token_data.type != "refresh":
                raise TokenError("Invalid token type")
            
            # Get user from database
            user = await self._get_user_by_id(uuid.UUID(token_data.sub))
            if not user:
                raise UserNotFoundError()
            
            # Check if user is active
            if not user.is_active:
                raise UserDisabledError()
            
            # Create new access token
            access_token = self._create_token(
                {"sub": str(user.id), "type": "access"},
                timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
            )
            
            # Optionally, create new refresh token for token rotation
            # This enhances security by invalidating the old refresh token
            new_refresh_token = self._create_token(
                {"sub": str(user.id), "type": "refresh"},
                timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
            )
            
            return {
                "access_token": access_token,
                "refresh_token": new_refresh_token,
            }
            
        except JWTError:
            raise TokenError("Invalid authentication credentials")
    
    async def get_user_by_id(self, user_id: uuid.UUID) -> Optional[UserResponse]:
        """Get a user by ID and return the response model."""
        user = await self._get_user_by_id(user_id)
        if not user:
            return None
            
        return UserResponse(
            id=user.id,
            email=user.email,
            username=user.username,
            is_active=user.is_active,
            is_verified=user.is_verified,
            created_at=user.created_at.isoformat()
        )
    
    async def _get_user_by_email(self, email: str) -> Optional[User]:
        """Get a user by email."""
        stmt = select(User).where(User.email == email)
        result = await self.db.execute(stmt)
        return result.scalars().first()
    
    async def _get_user_by_username(self, username: str) -> Optional[User]:
        """Get a user by username."""
        stmt = select(User).where(User.username == username)
        result = await self.db.execute(stmt)
        return result.scalars().first()
    
    async def _get_user_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        """Get a user by ID."""
        stmt = select(User).where(User.id == user_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()
    
    def _hash_password(self, password: str) -> str:
        """Hash a password for storing."""
        return pwd_context.hash(password)
    
    def _verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a stored password against a provided password."""
        return pwd_context.verify(plain_password, hashed_password)
    
    def _create_token(self, data: dict, expires_delta: timedelta) -> str:
        """Create a new JWT token."""
        to_encode = data.copy()
        expire = datetime.utcnow() + expires_delta
        to_encode.update({"exp": int(expire.timestamp())})
        encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
        return encoded_jwt 