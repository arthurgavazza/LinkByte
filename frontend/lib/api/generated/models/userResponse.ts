/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * LinkByte API
 * API for the LinkByte URL shortener
 * OpenAPI spec version: 0.1.0
 */

/**
 * Schema for user response data.
 */
export interface UserResponse {
  created_at: string;
  /** User's email address */
  email: string;
  id: string;
  is_active: boolean;
  is_verified: boolean;
  /** Username for login */
  username: string;
}
