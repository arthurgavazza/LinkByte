'use client'

import Link from 'next/link'
import { LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Logo } from '@/components/logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'
import { useAuth } from '../stories/mock-providers'

/**
 * This is a special version of the MainHeader component used only in Storybook.
 * It imports the mock useAuth hook directly instead of the real one.
 */
export function MainHeaderStory() {
  // Use the auth hook
  const { user, logout, isAuthenticated } = useAuth()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size="lg" />
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link 
            href="/" 
            className={`text-sm font-medium ${isActive('/') ? '' : 'text-muted-foreground'}`}
          >
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium ${isActive('/dashboard') ? '' : 'text-muted-foreground'}`}
              >
                Dashboard
              </Link>
              <Link 
                href="/analytics" 
                className={`text-sm font-medium ${isActive('/analytics') ? '' : 'text-muted-foreground'}`}
              >
                Analytics
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {user?.username || 'User'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
} 