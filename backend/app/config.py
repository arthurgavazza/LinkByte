import os
from pydantic import PostgresDsn
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings."""
    
    # Database settings
    DATABASE_URL: PostgresDsn = os.getenv(
        "DATABASE_URL", 
        "postgresql+asyncpg://postgres:postgres@localhost/linkbyte"
    )
    
    # JWT settings
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "supersecret")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # New settings from .env
    JWT_REFRESH_SECRET_KEY: str = os.getenv("JWT_REFRESH_SECRET_KEY", "supersecret-refresh")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    BACKEND_URL: str = os.getenv("BACKEND_URL", "http://localhost:8000")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Application settings
    CORS_ORIGINS: list = ["http://localhost:3000"]
    API_PREFIX: str = "/api"
    
    # URL settings
    BASE_URL: str = os.getenv("BASE_URL", "http://localhost:8000")
    
    # Analytics settings
    CLICK_TRACKING_ENABLED: bool = True
    
    class Config:
        """Pydantic config."""
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings() 