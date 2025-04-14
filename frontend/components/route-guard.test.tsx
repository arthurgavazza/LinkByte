import { render, screen } from '@testing-library/react'
import { RouteGuard } from './route-guard'
import { MockAuthProvider } from '@/providers/mock-auth-provider'
import { describe, it, expect, vi } from 'vitest'
import { usePathname, useRouter } from 'next/navigation'

// Setup mocks
const pushMock = vi.fn()
const mockPathname = vi.fn().mockReturnValue('/dashboard')

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('RouteGuard', () => {
  beforeEach(() => {
    pushMock.mockClear()
    mockPathname.mockReturnValue('/dashboard') // default to protected route
  })

  it('redirects to login page when accessing protected route while unauthenticated', () => {
    render(
      <MockAuthProvider isAuthenticated={false} user={null} isLoading={false}>
        <RouteGuard>
          <div>Protected Content</div>
        </RouteGuard>
      </MockAuthProvider>
    )

    // Should have called router.push with '/login'
    expect(pushMock).toHaveBeenCalledWith('/login')
    
    // Protected content should not be rendered
    expect(screen.queryByText('Protected Content')).toBeNull()
  })

  it('displays children when authenticated on protected route', () => {
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
        isLoading={false}
      >
        <RouteGuard>
          <div>Protected Content</div>
        </RouteGuard>
      </MockAuthProvider>
    )

    // Should not redirect
    expect(pushMock).not.toHaveBeenCalled()
    
    // Protected content should be rendered
    expect(screen.getByText('Protected Content')).toBeDefined()
  })

  it('displays children when on public route regardless of authentication', () => {
    // Mock pathname to be a public route
    mockPathname.mockReturnValue('/')
    
    render(
      <MockAuthProvider isAuthenticated={false} user={null} isLoading={false}>
        <RouteGuard>
          <div>Public Content</div>
        </RouteGuard>
      </MockAuthProvider>
    )

    // Should not redirect
    expect(pushMock).not.toHaveBeenCalled()
    
    // Public content should be rendered
    expect(screen.getByText('Public Content')).toBeDefined()
  })
}) 