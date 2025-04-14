import pytest
from httpx import AsyncClient
from fastapi import status

pytestmark = pytest.mark.asyncio

async def test_register_user(client: AsyncClient):
    """Test user registration endpoint."""
    # Arrange
    user_data = {
        "email": "newuser@example.com",
        "username": "newuser",
        "password": "Password123"
    }
    
    # Act
    response = await client.post("/api/auth/register", json=user_data)
    
    # Assert
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["email"] == user_data["email"]
    assert data["username"] == user_data["username"]
    assert "id" in data
    assert "is_active" in data
    assert "is_verified" in data
    assert "password" not in data  # Ensure password is not returned

async def test_register_user_duplicate_email(client: AsyncClient):
    """Test user registration with duplicate email."""
    # Arrange
    user_data = {
        "email": "duplicate@example.com",
        "username": "duplicate_email",
        "password": "Password123"
    }
    
    # Register first time
    await client.post("/api/auth/register", json=user_data)
    
    # Act - try to register again with same email
    response = await client.post("/api/auth/register", json=user_data)
    
    # Assert
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "Email already registered" in response.text

async def test_register_user_duplicate_username(client: AsyncClient):
    """Test user registration with duplicate username."""
    # Arrange - First user
    first_user = {
        "email": "first@example.com",
        "username": "duplicate_username",
        "password": "Password123"
    }
    
    # Register first user
    await client.post("/api/auth/register", json=first_user)
    
    # Arrange - Second user with same username
    second_user = {
        "email": "second@example.com",
        "username": "duplicate_username",
        "password": "Password123"
    }
    
    # Act - Register second user
    response = await client.post("/api/auth/register", json=second_user)
    
    # Assert
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "Username already taken" in response.text

async def test_login_user(client: AsyncClient):
    """Test user login endpoint."""
    # Arrange - Register a user
    user_data = {
        "email": "logintest@example.com",
        "username": "logintest",
        "password": "Password123"
    }
    await client.post("/api/auth/register", json=user_data)
    
    # Act - Login
    login_data = {
        "username": user_data["username"],
        "password": user_data["password"]
    }
    response = await client.post(
        "/api/auth/login", 
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    # Assert
    assert response.status_code == status.HTTP_200_OK
    assert "success" in response.json()
    assert response.json()["success"] == True
    
    # Check cookies are set
    assert "access_token" in response.cookies
    assert "refresh_token" in response.cookies

async def test_login_user_wrong_password(client: AsyncClient):
    """Test user login with wrong password."""
    # Arrange - Register a user
    user_data = {
        "email": "wrongpass@example.com",
        "username": "wrongpass",
        "password": "Password123"
    }
    await client.post("/api/auth/register", json=user_data)
    
    # Act - Login with wrong password
    login_data = {
        "username": user_data["username"],
        "password": "WrongPassword123"
    }
    response = await client.post(
        "/api/auth/login", 
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    # Assert
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

async def test_login_user_nonexistent_user(client: AsyncClient):
    """Test login with non-existent user."""
    # Arrange
    login_data = {
        "username": "nonexistent",
        "password": "Password123"
    }
    
    # Act
    response = await client.post(
        "/api/auth/login", 
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    # Assert
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

async def test_get_current_user(client: AsyncClient):
    """Test get current user endpoint."""
    # Arrange - Register and login
    user_data = {
        "email": "currentuser@example.com",
        "username": "currentuser",
        "password": "Password123"
    }
    await client.post("/api/auth/register", json=user_data)
    
    # Login to get auth cookies
    login_data = {
        "username": user_data["username"],
        "password": user_data["password"]
    }
    login_response = await client.post(
        "/api/auth/login", 
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    # Create a client that passes cookies
    cookies = login_response.cookies
    
    # Act - Get current user
    response = await client.get("/api/auth/me", cookies=cookies)
    
    # Assert
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["email"] == user_data["email"]
    assert data["username"] == user_data["username"]

async def test_get_current_user_unauthenticated(client: AsyncClient):
    """Test get current user endpoint without authentication."""
    # Act
    response = await client.get("/api/auth/me")
    
    # Assert
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

async def test_refresh_token(client: AsyncClient):
    """Test token refresh endpoint."""
    # Arrange - Register and login
    user_data = {
        "email": "refreshtoken@example.com",
        "username": "refreshtoken",
        "password": "Password123"
    }
    await client.post("/api/auth/register", json=user_data)
    
    # Login to get auth cookies
    login_data = {
        "username": user_data["username"],
        "password": user_data["password"]
    }
    login_response = await client.post(
        "/api/auth/login", 
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    # Get cookies from login
    cookies = login_response.cookies
    
    # Act - Refresh token
    response = await client.post("/api/auth/refresh", cookies=cookies)
    
    # Assert
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["success"] == True
    
    # Verify cookies are updated
    assert "access_token" in response.cookies
    assert "refresh_token" in response.cookies

async def test_refresh_token_invalid(client: AsyncClient):
    """Test token refresh with invalid token."""
    # Act - Try to refresh without a valid token
    response = await client.post("/api/auth/refresh")
    
    # Assert
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

async def test_logout(client: AsyncClient):
    """Test logout endpoint."""
    # Arrange - Register and login
    user_data = {
        "email": "logout@example.com",
        "username": "logout",
        "password": "Password123"
    }
    await client.post("/api/auth/register", json=user_data)
    
    # Login to get auth cookies
    login_data = {
        "username": user_data["username"],
        "password": user_data["password"]
    }
    login_response = await client.post(
        "/api/auth/login", 
        data=login_data,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    # Get cookies from login
    cookies = login_response.cookies
    
    # Act - Logout
    response = await client.post("/api/auth/logout", cookies=cookies)
    
    # Assert
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["success"] == True
    
    # Verify cookies are cleared (have empty value and expired)
    assert "access_token" in response.cookies
    # Most HTTP clients represent deleted cookies as empty strings
    assert response.cookies["access_token"] == "" 