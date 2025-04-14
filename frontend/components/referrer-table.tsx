'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function ReferrerTable() {
  // This would fetch data from your API in a real application
  const referrers = [
    { source: 'Google', visits: 12345, percentage: 42.5 },
    { source: 'Direct', visits: 8765, percentage: 30.2 },
    { source: 'Twitter', visits: 3456, percentage: 11.9 },
    { source: 'Facebook', visits: 2345, percentage: 8.1 },
    { source: 'LinkedIn', visits: 1234, percentage: 4.2 },
    { source: 'Other', visits: 876, percentage: 3.1 },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Source</TableHead>
          <TableHead className="text-right">Visits</TableHead>
          <TableHead className="text-right">Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {referrers.map(referrer => (
          <TableRow key={referrer.source}>
            <TableCell className="font-medium">{referrer.source}</TableCell>
            <TableCell className="text-right">{referrer.visits.toLocaleString()}</TableCell>
            <TableCell className="text-right">{referrer.percentage}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
