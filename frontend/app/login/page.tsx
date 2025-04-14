import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { Suspense } from 'react'

import { LoginFormWrapper } from '@/components/login-form-wrapper'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

export const metadata: Metadata = {
  title: 'Login - LinkByte',
  description: 'Sign in to your LinkByte account',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link href="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <div className="flex justify-center">
            <Logo size="lg" asLink={false} />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:text-primary/90">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="border bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
            <Suspense fallback={<div>Loading form...</div>}>
              <LoginFormWrapper />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
