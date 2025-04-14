import Link from 'next/link'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

// Client component wrapper for any navigation related hooks
const NotFoundContent = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20 text-center md:py-32">
      <Logo size="lg" asLink={false} />
      <div className="space-y-3">
        <h1 className="text-3xl font-bold sm:text-4xl">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}

export default function NotFoundPage() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <NotFoundContent />
      </Suspense>
    </div>
  )
}
