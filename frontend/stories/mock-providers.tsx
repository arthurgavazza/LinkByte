'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Define the Auth context type to match the real one
interface AuthContextType {
  user: any
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<boolean>
  register: (email: string, username: string, password: string) => Promise<void>
}

// Create the Auth context for Storybook
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Props for the Auth provider
interface StoryAuthProviderProps {
  children: ReactNode
  user: any
  isAuthenticated: boolean
  isLoading?: boolean
}

// Story Auth Provider component
export function StoryAuthProvider({
  children,
  user,
  isAuthenticated,
  isLoading = false,
}: StoryAuthProviderProps) {
  // Mock implementation of auth functions
  const login = async () => {
    console.log('Mock login called')
  }
  
  const logout = async () => {
    console.log('Mock logout called')
  }
  
  const refreshToken = async () => {
    console.log('Mock refresh token called')
    return true
  }
  
  const register = async () => {
    console.log('Mock register called')
  }

  // Value for the context
  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    register,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the useAuth hook with the same name as the real one
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

// Create a simple QueryClient provider for Storybook
interface StoryQueryProviderProps {
  children: ReactNode
}

export function StoryQueryProvider({ children }: StoryQueryProviderProps) {
  // Create a new QueryClient for each story
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// Combined provider for both Auth and Query
interface StoryProvidersProps {
  children: ReactNode
  user?: any
  isAuthenticated?: boolean
  isLoading?: boolean
}

export function StoryProviders({
  children,
  user = null,
  isAuthenticated = false,
  isLoading = false,
}: StoryProvidersProps) {
  return (
    <StoryQueryProvider>
      <StoryAuthProvider
        user={user}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
      >
        {children}
      </StoryAuthProvider>
    </StoryQueryProvider>
  )
} 