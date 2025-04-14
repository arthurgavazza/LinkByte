import Link from 'next/link'
import { ArrowLeft, Calendar, Download, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DateRangePicker } from '@/components/date-range-picker'
import { LinkAnalyticsChart } from '@/components/link-analytics-chart'
import { LinkGeoMap } from '@/components/link-geo-map'
import { LinkReferrers } from '@/components/link-referrers'
import { LinkDevices } from '@/components/link-devices'
import { LinkBrowsers } from '@/components/link-browsers'
import { LinkQRCode } from '@/components/link-qr-code'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/logo'

export const metadata: Metadata = {
  title: 'Link Analytics - LinkByte',
  description: 'Detailed analytics for your shortened link',
}

export default function LinkAnalyticsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the link data based on the ID
  const linkData = {
    id: params.id,
    shortUrl: 'linkbyte.io/product',
    longUrl: 'https://example.com/products/awesome-product-with-very-long-url',
    clicks: 1234,
    uniqueClicks: 876,
    ctr: 5.2,
    createdAt: '2023-04-15T10:30:00Z',
    expiresAt: null,
    isPasswordProtected: false,
    tags: ['marketing', 'product'],
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/edit/${params.id}`}>Edit Link</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`https://${linkData.shortUrl}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Link
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="container">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to dashboard
              </Link>
            </Button>
          </div>

          <div className="mb-6 flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Link Analytics</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-medium text-primary">{linkData.shortUrl}</span>
              <Badge variant="outline" className="text-xs">
                {linkData.isPasswordProtected ? 'Protected' : 'Public'}
              </Badge>
              {linkData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Original URL:{' '}
              <Link
                href={linkData.longUrl}
                className="text-primary hover:underline"
                target="_blank"
              >
                {linkData.longUrl}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              Created: {formatDate(linkData.createdAt)} • Expires:{' '}
              {linkData.expiresAt ? formatDate(linkData.expiresAt) : 'Never'}
            </p>
          </div>

          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <DateRangePicker />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Reports
              </Button>
            </div>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{linkData.clicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+24% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{linkData.uniqueClicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+18% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{linkData.ctr}%</div>
                <p className="text-xs text-muted-foreground">+2.3% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Time on Page</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1m 42s</div>
                <p className="text-xs text-muted-foreground">+12s from previous period</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Click Performance</CardTitle>
                <CardDescription>Track clicks over time for this link</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily">
                  <div className="flex items-center justify-between">
                    <TabsList>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm">
                      Compare to previous period
                    </Button>
                  </div>
                  <TabsContent value="daily" className="mt-4">
                    <LinkAnalyticsChart period="daily" linkId={params.id} />
                  </TabsContent>
                  <TabsContent value="weekly" className="mt-4">
                    <LinkAnalyticsChart period="weekly" linkId={params.id} />
                  </TabsContent>
                  <TabsContent value="monthly" className="mt-4">
                    <LinkAnalyticsChart period="monthly" linkId={params.id} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Where your link visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <LinkGeoMap linkId={params.id} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Referral Sources</CardTitle>
                <CardDescription>Where your traffic is coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <LinkReferrers linkId={params.id} />
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Device & Browser Breakdown</CardTitle>
                <CardDescription>What devices and browsers your visitors are using</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Devices</h3>
                    <LinkDevices linkId={params.id} />
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Browsers</h3>
                    <LinkBrowsers linkId={params.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>QR Code</CardTitle>
                <CardDescription>Scan to access your link</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <LinkQRCode url={`https://${linkData.shortUrl}`} />
                <Separator className="my-4" />
                <div className="flex w-full gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
