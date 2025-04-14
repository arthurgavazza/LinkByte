'use client'

import React, { createContext, useContext, ReactNode } from 'react'

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