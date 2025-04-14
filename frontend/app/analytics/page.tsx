import { Suspense } from 'react'
import Link from 'next/link'
import { BarChart3, Calendar, Globe, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnalyticsChart } from '@/components/analytics-chart'
import { GeographicMap } from '@/components/geographic-map'
import { ReferrerTable } from '@/components/referrer-table'
import { DateRangePicker } from '@/components/date-range-picker'
import { MainHeader } from '@/components/main-header'

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground">Track and analyze your link performance</p>
            </div>
            <div className="flex items-center gap-2">
              <DateRangePicker />
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54,321</div>
                <p className="text-xs text-muted-foreground">+24% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32,456</div>
                <p className="text-xs text-muted-foreground">+18% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Click Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground">+2.3% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Top Countries</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Across 6 continents</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Click Performance</CardTitle>
              <CardDescription>Track clicks over time for all your links</CardDescription>
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
                  <Suspense fallback={<div>Loading chart...</div>}>
                    <AnalyticsChart period="daily" />
                  </Suspense>
                </TabsContent>
                <TabsContent value="weekly" className="mt-4">
                  <Suspense fallback={<div>Loading chart...</div>}>
                    <AnalyticsChart period="weekly" />
                  </Suspense>
                </TabsContent>
                <TabsContent value="monthly" className="mt-4">
                  <Suspense fallback={<div>Loading chart...</div>}>
                    <AnalyticsChart period="monthly" />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Where your link visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading map...</div>}>
                  <GeographicMap />
                </Suspense>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <div className="text-sm font-medium">United States</div>
                    </div>
                    <div className="text-sm">42.5%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <div className="text-sm font-medium">United Kingdom</div>
                    </div>
                    <div className="text-sm">18.3%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="text-sm font-medium">Germany</div>
                    </div>
                    <div className="text-sm">12.7%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="text-sm font-medium">Canada</div>
                    </div>
                    <div className="text-sm">8.4%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="text-sm font-medium">Australia</div>
                    </div>
                    <div className="text-sm">6.2%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Referral Sources</CardTitle>
                <CardDescription>Where your traffic is coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading referrers...</div>}>
                  <ReferrerTable />
                </Suspense>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Device & Browser Breakdown</CardTitle>
              <CardDescription>What devices and browsers your visitors are using</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Devices</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Mobile</div>
                        <div className="text-sm text-muted-foreground">58.3%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: '58.3%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Desktop</div>
                        <div className="text-sm text-muted-foreground">32.4%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: '32.4%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Tablet</div>
                        <div className="text-sm text-muted-foreground">9.3%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: '9.3%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium">Browsers</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Chrome</div>
                        <div className="text-sm text-muted-foreground">64.7%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: '64.7%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Safari</div>
                        <div className="text-sm text-muted-foreground">18.2%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: '18.2%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Firefox</div>
                        <div className="text-sm text-muted-foreground">8.4%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: '8.4%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Edge</div>
                        <div className="text-sm text-muted-foreground">6.5%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: '6.5%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Others</div>
                        <div className="text-sm text-muted-foreground">2.2%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: '2.2%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
