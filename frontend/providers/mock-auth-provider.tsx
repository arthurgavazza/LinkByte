'use client'

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react'
import type { UserResponse } from '@/lib/api/generated/models'

interface AuthContextType {
  user: UserResponse | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<boolean>
  register: (email: string, username: string, password: string) => Promise<void>
}

// Create a separate context for mocking in Storybook
const MockAuthContext = createContext<AuthContextType | undefined>(undefined)

interface MockAuthProviderProps {
  children: ReactNode
  user: UserResponse | null
  isAuthenticated: boolean
  isLoading?: boolean
}

export function MockAuthProvider({ 
  children, 
  user: initialUser, 
  isAuthenticated: initialIsAuthenticated, 
  isLoading: initialIsLoading = false 
}: MockAuthProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(initialUser)
  const [isLoading, setIsLoading] = useState<boolean>(initialIsLoading)
  
  // Update isAuthenticated when user changes
  const isAuthenticated = initialIsAuthenticated
  
  // Set loading to false after initial render for testing
  useEffect(() => {
    if (initialIsLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [initialIsLoading])
  
  // Mock implementation of auth functions
  const login = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 100))
    setUser(initialUser)
    setIsLoading(false)
  }
  
  const logout = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 100))
    setUser(null)
    setIsLoading(false)
  }
  
  const refreshToken = async () => {
    return Promise.resolve(true)
  }
  
  const register = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 100))
    setUser(initialUser)
    setIsLoading(false)
  }

  // Mock auth context value
  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    register,
  }

  return <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>
}

// Override the useAuth hook for tests
export const useAuth = () => {
  const context = useContext(MockAuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a MockAuthProvider')
  }

  return context
} 