'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LinkGeoMapProps {
  linkId: string
}

export function LinkGeoMap({ linkId }: LinkGeoMapProps) {
  // In a real app, you would fetch data based on the linkId
  const [_view, setView] = useState<'map' | 'table'>('map')

  const geoData = [
    { country: 'United States', clicks: 523, percentage: 42.5 },
    { country: 'United Kingdom', clicks: 225, percentage: 18.3 },
    { country: 'Germany', clicks: 156, percentage: 12.7 },
    { country: 'Canada', clicks: 103, percentage: 8.4 },
    { country: 'Australia', clicks: 76, percentage: 6.2 },
    { country: 'France', clicks: 54, percentage: 4.4 },
    { country: 'Japan', clicks: 42, percentage: 3.4 },
    { country: 'Other', clicks: 55, percentage: 4.1 },
  ]

  return (
    <div>
      <Tabs defaultValue="map" onValueChange={value => setView(value as 'map' | 'table')}>
        <TabsList className="mb-4">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="map">
          <div className="flex h-[300px] w-full items-center justify-center rounded-md bg-muted">
            <div className="text-muted-foreground">
              Geographic map visualization would be displayed here
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {geoData.slice(0, 5).map(item => (
              <div key={item.country} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <div className="text-sm font-medium">{item.country}</div>
                </div>
                <div className="text-sm">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {geoData.map(item => (
                <TableRow key={item.country}>
                  <TableCell className="font-medium">{item.country}</TableCell>
                  <TableCell className="text-right">{item.clicks}</TableCell>
                  <TableCell className="text-right">{item.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}
