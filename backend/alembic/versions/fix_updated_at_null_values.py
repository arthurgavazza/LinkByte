"""fix updated_at null values

Revision ID: 20250520_fix_updated_at
Revises: 8a0951fb35ed
Create Date: 2025-05-20 00:00:00.000000+00:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text

# revision identifiers, used by Alembic.
revision = '20250520_fix_updated_at'
down_revision = '8a0951fb35ed'  # Set this to your most recent migration
branch_labels = None
depends_on = None


def upgrade() -> None:
    # First check if the updated_at column exists in links table, if not add it
    op.execute(text("""
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'links' AND column_name = 'updated_at'
            ) THEN
                ALTER TABLE links ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
            END IF;
        END $$;
    """))
    
    # Check if the updated_at column exists in clicks table, if not add it
    op.execute(text("""
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'clicks' AND column_name = 'updated_at'
            ) THEN
                ALTER TABLE clicks ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
            END IF;
        END $$;
    """))
    
    # Update all rows with null updated_at to current timestamp
    op.execute(text("UPDATE links SET updated_at = NOW() WHERE updated_at IS NULL"))
    op.execute(text("UPDATE clicks SET updated_at = NOW() WHERE updated_at IS NULL"))
    
    # Add server_default and not null constraints to updated_at columns
    op.alter_column('links', 'updated_at',
        existing_type=sa.DateTime(timezone=True),
        nullable=False,
        server_default=sa.text('now()')
    )
    op.alter_column('clicks', 'updated_at',
        existing_type=sa.DateTime(timezone=True),
        nullable=False,
        server_default=sa.text('now()')
    )


def downgrade() -> None:
    # Remove server_default and not null constraints
    op.alter_column('links', 'updated_at',
        existing_type=sa.DateTime(timezone=True),
        nullable=True,
        server_default=None
    )
    op.alter_column('clicks', 'updated_at',
        existing_type=sa.DateTime(timezone=True),
        nullable=True,
        server_default=None
    ) 