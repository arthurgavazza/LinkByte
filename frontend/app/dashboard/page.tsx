import { Suspense } from 'react'
import Link from 'next/link'
import { BarChart3, Link2, Plus, Search, Settings, Tag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LinkTable } from '@/components/link-table'
import { LinkStats } from '@/components/link-stats'
import { MainHeader } from '@/components/main-header'
import { DashboardContent } from '@/components/dashboard-content'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-6">
          <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardContent />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
