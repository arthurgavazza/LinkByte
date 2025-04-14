import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EditLinkForm } from '@/components/edit-link-form'
import { Logo } from '@/components/logo'

export const metadata: Metadata = {
  title: 'Edit Link - LinkByte',
  description: 'Modify your shortened link settings',
}

export default function EditLinkPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/analytics/link/${params.id}`}>View Analytics</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to dashboard
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Edit Link</CardTitle>
              <CardDescription>Modify the settings for your shortened link</CardDescription>
            </CardHeader>
            <CardContent>
              <EditLinkForm linkId={params.id} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
