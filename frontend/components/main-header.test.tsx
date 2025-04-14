import { render, screen } from '@testing-library/react'
import { MainHeader } from './main-header'
import { MockAuthProvider } from '@/providers/mock-auth-provider'
import { describe, it, expect, vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('MainHeader', () => {
  it('renders login and signup buttons when user is not authenticated', () => {
    render(
      <MockAuthProvider isAuthenticated={false} user={null}>
        <MainHeader />
      </MockAuthProvider>
    )

    expect(screen.getByRole('link', { name: 'Login' })).toBeDefined()
    expect(screen.getByRole('link', { name: 'Sign Up' })).toBeDefined()
    
    // Dashboard and Analytics links should not be in the document for unauthenticated users
    const dashboardLink = screen.queryByRole('link', { name: 'Dashboard' })
    const analyticsLink = screen.queryByRole('link', { name: 'Analytics' })
    expect(dashboardLink).toBeNull()
    expect(analyticsLink).toBeNull()
  })

  it('renders user information and authenticated nav links when user is authenticated', () => {
    render(
      <MockAuthProvider 
        isAuthenticated={true} 
        user={{
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          created_at: new Date().toISOString(),
          is_active: true,
          is_verified: true
        }}
      >
        <MainHeader />
      </MockAuthProvider>
    )

    // Username should be displayed
    expect(screen.getByText('testuser')).toBeDefined()
    
    // Dashboard and Analytics links should be in the document for authenticated users
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeDefined()
    expect(screen.getByRole('link', { name: 'Analytics' })).toBeDefined()
    
    // Login and signup buttons should not be in the document
    const loginButton = screen.queryByRole('link', { name: 'Login' })
    const signUpButton = screen.queryByRole('link', { name: 'Sign Up' })
    expect(loginButton).toBeNull()
    expect(signUpButton).toBeNull()
  })
}) 