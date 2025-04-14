import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, BarChart3, Clock, ExternalLink, Link2, Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { URLShortenerForm } from '@/components/url-shortener-form'
import { RecentLinks } from '@/components/recent-links'
import { MainHeader } from '@/components/main-header'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex-1">
        <section className="hero-gradient w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Shorten, Share, Track
                  </h1>
                  <p className="max-w-[600px] opacity-90 md:text-xl">
                    Create short links with powerful analytics. Track clicks, geographic data, and
                    referral sources all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="btn-accent-hover bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Link href="#shorten">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-white/10 bg-white/20 text-white hover:bg-white/30"
                  >
                    <Link href="/features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Try it now</CardTitle>
                    <CardDescription>Paste your long URL to get started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <URLShortenerForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section id="shorten" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Powerful Link Management
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create, customize, and track your links with our comprehensive suite of tools.
              </p>
            </div>
            <div className="mx-auto mt-10 grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-10">
              <Card className="card-gradient-hover border-0 shadow-card transition-all duration-300 hover:shadow-card-hover">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Link2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle>Custom Links</CardTitle>
                    <CardDescription>
                      Create branded short links with custom aliases
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="card-gradient-hover border-0 shadow-card transition-all duration-300 hover:shadow-card-hover">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-secondary/10 p-2">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle>Detailed Analytics</CardTitle>
                    <CardDescription>Track clicks, locations, and referral sources</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="card-gradient-hover border-0 shadow-card transition-all duration-300 hover:shadow-card-hover">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-accent/10 p-2">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle>Link Protection</CardTitle>
                    <CardDescription>
                      Add passwords or expiration dates to your links
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="card-gradient-hover border-0 shadow-card transition-all duration-300 hover:shadow-card-hover">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle>Link Scheduling</CardTitle>
                    <CardDescription>Schedule links to activate at specific times</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="card-gradient-hover border-0 shadow-card transition-all duration-300 hover:shadow-card-hover">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-secondary/10 p-2">
                    <ExternalLink className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle>Bulk Shortening</CardTitle>
                    <CardDescription>Shorten multiple URLs at once with our API</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="card-gradient-hover border-0 shadow-card transition-all duration-300 hover:shadow-card-hover">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-accent/10 p-2">
                    <BarChart3 className="h-6 w-6 text-accent" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle>QR Codes</CardTitle>
                    <CardDescription>Generate QR codes for your shortened links</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recent Links</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                View and manage your recently shortened links
              </p>
            </div>
            <div className="mx-auto mt-8 md:max-w-[64rem]">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-background/50 p-1">
                  <TabsTrigger value="all" className="data-[state=active]:bg-background">
                    All Links
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="data-[state=active]:bg-background">
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="data-[state=active]:bg-background">
                    Popular
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <Suspense fallback={<div>Loading...</div>}>
                    <RecentLinks />
                  </Suspense>
                </TabsContent>
                <TabsContent value="recent" className="mt-4">
                  <Suspense fallback={<div>Loading...</div>}>
                    <RecentLinks filter="recent" />
                  </Suspense>
                </TabsContent>
                <TabsContent value="popular" className="mt-4">
                  <Suspense fallback={<div>Loading...</div>}>
                    <RecentLinks filter="popular" />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">LinkByte © 2025</p>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/terms"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
