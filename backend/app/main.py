from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from fastapi.responses import JSONResponse
import structlog

from app.routers import links, analytics, auth
from app.middlewares.click_tracking import ClickTrackingMiddleware
from app.middlewares.auth import auth_middleware
from app.config import settings
from app.utils.exceptions import (
    AuthenticationError,
    DuplicateResourceError,
    TokenError,
    InvalidCredentialsError,
    UserDisabledError,
    UserNotFoundError
)

# Configure structured logging
logger = structlog.get_logger()

# Create the FastAPI app
app = FastAPI(
    title="LinkByte API",
    description="API for the LinkByte URL shortener",
    version="0.1.0",
)

# Database setup
engine = create_async_engine(str(settings.DATABASE_URL))
async_session_maker = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Dependency for database sessions
async def get_db():
    """Get a database session."""
    db = async_session_maker()
    try:
        yield db
    finally:
        await db.close()

# Store the session maker in app state
app.state.db_pool = async_session_maker

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL, add production URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add click tracking middleware
app.add_middleware(ClickTrackingMiddleware)

# Add authentication middleware
app.middleware("http")(auth_middleware)

# Exception handlers
@app.exception_handler(AuthenticationError)
async def auth_exception_handler(request: Request, exc: AuthenticationError):
    logger.error("Authentication error", 
                error=exc.message, 
                path=request.url.path, 
                status_code=exc.status_code)
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message},
    )

@app.exception_handler(DuplicateResourceError)
async def duplicate_resource_exception_handler(request: Request, exc: DuplicateResourceError):
    logger.error("Duplicate resource error", 
                resource_type=exc.resource_type, 
                field=exc.field, 
                value=exc.value, 
                path=request.url.path)
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message},
    )

# Include routers with tags
app.include_router(links.router, prefix="/api/links", tags=["links"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth", "authentication"])

@app.get("/")
async def root():
    """Root endpoint to check if API is running."""
    return {"message": "Welcome to LinkByte API"}

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"} 