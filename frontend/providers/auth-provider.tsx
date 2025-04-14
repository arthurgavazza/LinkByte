'use client'

import { createContext, useContext, useEffect, useState, type ReactNode, useCallback, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  refreshTokenApiAuthRefreshPost,
  useLoginApiAuthLoginPost,
  useLogoutApiAuthLogoutPost,
  useRegisterApiAuthRegisterPost,
} from '@/lib/api/generated/auth/auth'
import type { UserResponse } from '@/lib/api/generated/models'
import { toast } from 'sonner'
import { customInstanceFn } from '@/lib/api/custom-instance'

interface AuthContextType {
  user: UserResponse | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<boolean>
  register: (email: string, username: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const initialLoadAttempted = useRef(false)
  const router = useRouter()
  const pathname = usePathname()

  const isAuthenticated = !!user

  // Login mutation
  const loginMutation = useLoginApiAuthLoginPost()

  // Logout mutation
  const logoutMutation = useLogoutApiAuthLogoutPost()

  // Register mutation
  const registerMutation = useRegisterApiAuthRegisterPost()

  // Custom function to get current user
  const getCurrentUser = async (): Promise<UserResponse> => {
    return customInstanceFn<UserResponse>({
      url: '/api/auth/me',
      method: 'GET',
    })
  }

  // Function to fetch the current user profile
  const fetchUserProfile = useCallback(async () => {
    // Prevent multiple loading attempts for initial load
    if (initialLoadAttempted.current && isLoading) {
      console.log('Auth: Skipping duplicate fetch - already loading');
      return;
    }
    
    // Don't set loading state to true if we're already loading
    if (!isLoading) {
      setIsLoading(true);
      console.log('Auth: Started loading user profile');
    }
    
    // Mark that we've attempted the initial load
    initialLoadAttempted.current = true;
    
    try {
      console.log('Auth: Attempting to fetch user profile');
      const userData = await getCurrentUser();
      console.log('Auth: Successfully fetched user profile', userData);
      setUser(userData);
    } catch (error: any) {
      console.error('Auth: Failed to fetch user profile', error?.message || error);
      // If the error is a 401, it means the user is not authenticated
      if (error?.response?.status === 401) {
        console.log('Auth: User is not authenticated (401)');
      }
      setUser(null);
    } finally {
      console.log('Auth: Finished loading user profile');
      setIsLoading(false);
    }
  }, []); // No dependencies to avoid loops

  // Function to refresh the token
  const refreshToken = async () => {
    // Don't attempt refresh if we're not authenticated
    if (!isAuthenticated && !isLoading) {
      return false
    }
    
    try {
      await refreshTokenApiAuthRefreshPost()
      return true
    } catch (error) {
      console.error('Failed to refresh token', error)
      setUser(null)
      return false
    }
  }

  // Login function
  const login = async (username: string, password: string) => {
    try {
      console.log('Auth: Attempting login');
      
      // First attempt the login API call
      await loginMutation.mutateAsync({
        data: {
          username,
          password,
        },
      });
      console.log('Auth: Login API call successful');

      // After successful login, fetch the user profile
      setIsLoading(true);
      try {
        const userData = await getCurrentUser();
        console.log('Auth: User profile fetched after login', userData);
        setUser(userData);
        
        // Only redirect after we've confirmed the user is logged in
        console.log('Auth: Redirecting to dashboard');
        router.push('/dashboard');
      } catch (profileError) {
        console.error('Auth: Failed to fetch user profile after login', profileError);
        throw profileError;
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Auth: Login failed', error);
      toast.error('Login Failed', {
        description: 'Invalid credentials. Please try again.',
      });
      throw error;
    }
  }

  // Register function
  const register = async (email: string, username: string, password: string) => {
    try {
      await registerMutation.mutateAsync({
        data: {
          email,
          username,
          password,
        },
      })

      // After successful registration, log the user in
      await login(username, password)
    } catch (error) {
      console.error('Registration failed', error)
      throw error
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setUser(null)

      // Redirect to home page after logout
      router.push('/')
    } catch (error) {
      console.error('Logout failed', error)
      toast.error('Logout Failed', {
        description: 'Failed to logout. Please try again.',
      })
      throw error
    }
  }

  // Check authentication status on initial load
  useEffect(() => {
    // Initial auth check
    fetchUserProfile();

    // Only set up refresh token interval if we're authenticated
    let refreshInterval: NodeJS.Timeout | null = null;
    
    if (isAuthenticated) {
      refreshInterval = setInterval(() => {
        refreshToken();
      }, 14 * 60 * 1000); // Refresh every 14 minutes (assuming 15 min token lifetime)
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [fetchUserProfile]); // Only run on mount with stable fetchUserProfile

  // Authentication context value
  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
