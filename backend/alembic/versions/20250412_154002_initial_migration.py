"""initial migration

Revision ID: 8a0951fb35ed
Revises: 
Create Date: 2025-04-12 15:40:02.727176+00:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '8a0951fb35ed'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('password_hash', sa.String(length=255), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_verified', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    op.create_table('links',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('short_code', sa.String(length=20), nullable=False),
    sa.Column('original_url', sa.Text(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=True),
    sa.Column('expires_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_password_protected', sa.Boolean(), nullable=False),
    sa.Column('password_hash', sa.String(length=255), nullable=True),
    sa.Column('click_count', sa.Integer(), nullable=False),
    sa.Column('link_metadata', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_links_expires_at', 'links', ['expires_at'], unique=False)
    op.create_index(op.f('ix_links_short_code'), 'links', ['short_code'], unique=True)
    op.create_index('ix_links_user_id_created_at', 'links', ['user_id', 'created_at'], unique=False)
    op.create_table('clicks',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('link_id', sa.UUID(), nullable=False),
    sa.Column('clicked_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('ip_address', sa.String(length=45), nullable=True),
    sa.Column('user_agent', sa.String(length=512), nullable=True),
    sa.Column('referrer', sa.String(length=512), nullable=True),
    sa.Column('country', sa.String(length=2), nullable=True),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('device_type', sa.String(length=50), nullable=True),
    sa.Column('browser', sa.String(length=50), nullable=True),
    sa.Column('os', sa.String(length=50), nullable=True),
    sa.Column('click_metadata', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
    sa.ForeignKeyConstraint(['link_id'], ['links.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_clicks_clicked_at'), 'clicks', ['clicked_at'], unique=False)
    op.create_index('ix_clicks_country', 'clicks', ['country'], unique=False)
    op.create_index('ix_clicks_device_type', 'clicks', ['device_type'], unique=False)
    op.create_index('ix_clicks_link_id_clicked_at', 'clicks', ['link_id', 'clicked_at'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_clicks_link_id_clicked_at', table_name='clicks')
    op.drop_index('ix_clicks_device_type', table_name='clicks')
    op.drop_index('ix_clicks_country', table_name='clicks')
    op.drop_index(op.f('ix_clicks_clicked_at'), table_name='clicks')
    op.drop_table('clicks')
    op.drop_index('ix_links_user_id_created_at', table_name='links')
    op.drop_index(op.f('ix_links_short_code'), table_name='links')
    op.drop_index('ix_links_expires_at', table_name='links')
    op.drop_table('links')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    # ### end Alembic commands ### 