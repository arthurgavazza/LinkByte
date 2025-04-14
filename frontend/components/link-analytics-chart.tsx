'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface LinkAnalyticsChartProps {
  period: 'daily' | 'weekly' | 'monthly'
  linkId: string
}

export function LinkAnalyticsChart({ period, linkId }: LinkAnalyticsChartProps) {
  // In a real app, you would fetch data based on the linkId and period
  const dailyData = [
    { date: 'Apr 1', clicks: 120, uniqueClicks: 98 },
    { date: 'Apr 2', clicks: 145, uniqueClicks: 120 },
    { date: 'Apr 3', clicks: 132, uniqueClicks: 110 },
    { date: 'Apr 4', clicks: 178, uniqueClicks: 140 },
    { date: 'Apr 5', clicks: 189, uniqueClicks: 150 },
    { date: 'Apr 6', clicks: 167, uniqueClicks: 130 },
    { date: 'Apr 7', clicks: 145, uniqueClicks: 115 },
    { date: 'Apr 8', clicks: 156, uniqueClicks: 125 },
    { date: 'Apr 9', clicks: 187, uniqueClicks: 150 },
    { date: 'Apr 10', clicks: 210, uniqueClicks: 170 },
    { date: 'Apr 11', clicks: 234, uniqueClicks: 190 },
    { date: 'Apr 12', clicks: 256, uniqueClicks: 210 },
    { date: 'Apr 13', clicks: 278, uniqueClicks: 230 },
    { date: 'Apr 14', clicks: 301, uniqueClicks: 250 },
  ]

  const weeklyData = [
    { date: 'Week 1', clicks: 850, uniqueClicks: 680 },
    { date: 'Week 2', clicks: 920, uniqueClicks: 740 },
    { date: 'Week 3', clicks: 1050, uniqueClicks: 860 },
    { date: 'Week 4', clicks: 1230, uniqueClicks: 1020 },
  ]

  const monthlyData = [
    { date: 'Jan', clicks: 3200, uniqueClicks: 2600 },
    { date: 'Feb', clicks: 3500, uniqueClicks: 2800 },
    { date: 'Mar', clicks: 4200, uniqueClicks: 3400 },
    { date: 'Apr', clicks: 5400, uniqueClicks: 4400 },
  ]

  const getData = () => {
    switch (period) {
      case 'weekly':
        return weeklyData
      case 'monthly':
        return monthlyData
      default:
        return dailyData
    }
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={getData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUniqueClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--card-foreground))',
              borderRadius: 'var(--radius)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorClicks)"
            strokeWidth={2}
            name="Total Clicks"
          />
          <Area
            type="monotone"
            dataKey="uniqueClicks"
            stroke="hsl(var(--secondary))"
            fillOpacity={1}
            fill="url(#colorUniqueClicks)"
            strokeWidth={2}
            name="Unique Clicks"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
