import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { CreateLinkForm } from '@/components/create-link-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Create Link - LinkByte',
  description: 'Create a new shortened URL with LinkByte',
}

export default function CreateLinkPage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <CreateLinkForm />
        </CardContent>
      </Card>
    </div>
  )
}
