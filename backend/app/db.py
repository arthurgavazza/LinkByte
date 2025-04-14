from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base

from app.config import settings

# Create async engine
engine = create_async_engine(str(settings.DATABASE_URL), echo=True)

# Create session factory
async_session_factory = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# Create base class for models
Base = declarative_base()

async def get_db() -> AsyncSession:
    """
    Dependency for getting async db session.
    """
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close() 