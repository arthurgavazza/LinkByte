# URL Shortener Redirection Flow

## Efficient Server-Side Approach

This implementation uses server-side components for optimal performance:

```mermaid
flowchart TD
    A[User clicks short link] --> B[Next.js Server Component loads]
    B --> C["Server-side fetch to /api/links/{shortCode}/resolve"]
    C --> D{Backend processes request}
    
    %% Backend processing
    D --> E{Check if link exists}
    E -->|Not Found| F[Return 404]
    F --> G[Next.js shows 404 page]
    
    E -->|Link Found| H{Check if expired}
    H -->|Expired| I[Return 410]
    I --> J[Show expired link page]
    
    H -->|Valid| K{Check if password protected}
    K -->|Protected| L[Return 401]
    L --> M[Redirect to password page]
    
    K -->|Not Protected| N["Track click (non-blocking)"]
    N --> O[Return original URL]
    O --> P[Next.js redirects to destination URL]
    
    %% Password flow
    M --> Q[User enters password]
    Q --> R[POST to /api/links/{shortCode}/verify]
    R --> S{Verify password}
    S -->|Incorrect| T[Return 401]
    T --> U[Show error message]
    S -->|Correct| V["Track click (non-blocking)"]
    V --> W[Return original URL]
    W --> X[Browser redirects to destination]
```

## Implementation Details

### Frontend Components

1. **ShortCode Page** (`/[shortCode]/page.tsx`): 
   - Server component that handles direct redirection
   - Makes an efficient fetch directly to backend for link resolution
   - Handles different responses (404, 410, 401) from backend
   - Forwards user-agent, referrer, and IP headers for analytics

2. **Password Page** (`/[shortCode]/password/page.tsx`):
   - Client component for password protected links
   - Handles form submission and validation
   - Makes direct fetch to backend for verification
   - Redirects to destination after successful verification

### Backend Endpoints

1. **Link Resolution** (`/api/links/{short_code}/resolve`):
   - Checks if link exists, is active, and not expired
   - Checks if link is password protected
   - Tracks click (non-blocking) if link is valid and not protected
   - Returns original URL for immediate redirection

2. **Password Verification** (`/api/links/{short_code}/verify`):
   - Verifies password for protected links
   - Tracks click after successful verification
   - Returns original URL for redirection

### Click Tracking

- Implemented server-side in the backend
- Captures user-agent, referrer, and IP information
- Stores data in PostgreSQL database
- Updates link click count
- Non-blocking to ensure fast redirection

## Advantages

1. **Performance**: Direct server-side redirection with minimal latency
2. **Reliability**: Backend handles all logic, reducing failure points
3. **Accuracy**: All clicks are tracked server-side without relying on client JavaScript
4. **SEO Friendly**: Proper 301 redirects for search engines
5. **Simplified Flow**: Fewer moving parts, more maintainable architecture
6. **Efficiency**: No unnecessary client-side rendering before redirection 