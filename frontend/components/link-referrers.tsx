'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LinkReferrersProps {
  linkId: string
}

export function LinkReferrers({ linkId }: LinkReferrersProps) {
  // In a real app, you would fetch data based on the linkId
  const referrers = [
    { source: 'Google', clicks: 523, percentage: 42.5 },
    { source: 'Direct', clicks: 225, percentage: 18.3 },
    { source: 'Twitter', clicks: 156, percentage: 12.7 },
    { source: 'Facebook', clicks: 103, percentage: 8.4 },
    { source: 'LinkedIn', clicks: 76, percentage: 6.2 },
    { source: 'Instagram', clicks: 54, percentage: 4.4 },
    { source: 'Email', clicks: 42, percentage: 3.4 },
    { source: 'Other', clicks: 55, percentage: 4.1 },
  ]

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff8042',
    '#a4de6c',
  ]

  return (
    <Tabs defaultValue="chart">
      <TabsList className="mb-4">
        <TabsTrigger value="chart">Chart View</TabsTrigger>
        <TabsTrigger value="table">Table View</TabsTrigger>
      </TabsList>

      <TabsContent value="chart">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={referrers.slice(0, 6)}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="clicks"
                nameKey="source"
                label={({ source, percentage }) => `${source}: ${percentage}%`}
              >
                {referrers.slice(0, 6).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [`${value} clicks`, props.payload.source]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--card-foreground))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referrers.map(referrer => (
              <TableRow key={referrer.source}>
                <TableCell className="font-medium">{referrer.source}</TableCell>
                <TableCell className="text-right">{referrer.clicks}</TableCell>
                <TableCell className="text-right">{referrer.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}
