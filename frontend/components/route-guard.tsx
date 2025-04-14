'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()

  const publicPaths = ['/', '/login', '/signup', '/forgot-password']
  const isPublicPath = publicPaths.includes(pathname) || pathname.startsWith('/[shortCode]')
  const isLoginPage = pathname === '/login'

  useEffect(() => {
    // Only check authentication after loading is complete
    if (!isLoading) {
      // If user is not authenticated and trying to access a protected route
      if (!isAuthenticated && !isPublicPath) {
        console.log('RouteGuard: Redirecting to login page from', pathname);
        router.push('/login')
      }
      
      // If user is authenticated and on the login page, redirect to dashboard
      if (isAuthenticated && isLoginPage) {
        console.log('RouteGuard: User is already authenticated, redirecting to dashboard');
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, isLoading, isPublicPath, isLoginPage, router, pathname])

  // Show loading indicator only for protected routes while still determining auth state
  if (isLoading && !isPublicPath) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  // If not authenticated and not public path, don't render children yet (we're redirecting)
  if (!isLoading && !isAuthenticated && !isPublicPath) {
    return null
  }

  // Otherwise, render children
  return <>{children}</>
} 