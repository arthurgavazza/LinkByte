from typing import Optional

class AuthenticationError(Exception):
    """Base exception for authentication errors."""
    def __init__(self, message: str = "Authentication error", status_code: int = 401):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class InvalidCredentialsError(AuthenticationError):
    """Raised when credentials are invalid."""
    def __init__(self, message: str = "Invalid username or password"):
        super().__init__(message=message, status_code=401)

class UserDisabledError(AuthenticationError):
    """Raised when a user account is disabled."""
    def __init__(self, message: str = "User account is disabled"):
        super().__init__(message=message, status_code=401)

class UserNotFoundError(AuthenticationError):
    """Raised when a user is not found."""
    def __init__(self, message: str = "User not found"):
        super().__init__(message=message, status_code=404)

class TokenError(AuthenticationError):
    """Raised when there's an issue with a token."""
    def __init__(self, message: str = "Invalid token"):
        super().__init__(message=message, status_code=401)

class DuplicateResourceError(Exception):
    """Raised when a resource already exists."""
    def __init__(self, resource_type: str, field: str, value: str):
        self.resource_type = resource_type
        self.field = field
        self.value = value
        self.message = f"{resource_type} with {field} '{value}' already exists"
        self.status_code = 409
        super().__init__(self.message) 