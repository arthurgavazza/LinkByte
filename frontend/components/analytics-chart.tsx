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

interface AnalyticsChartProps {
  period: 'daily' | 'weekly' | 'monthly'
}

export function AnalyticsChart({ period }: AnalyticsChartProps) {
  // This would fetch data from your API in a real application
  const dailyData = [
    { date: 'Apr 1', clicks: 1200, visitors: 980 },
    { date: 'Apr 2', clicks: 1450, visitors: 1200 },
    { date: 'Apr 3', clicks: 1320, visitors: 1100 },
    { date: 'Apr 4', clicks: 1780, visitors: 1400 },
    { date: 'Apr 5', clicks: 1890, visitors: 1500 },
    { date: 'Apr 6', clicks: 1670, visitors: 1300 },
    { date: 'Apr 7', clicks: 1450, visitors: 1150 },
    { date: 'Apr 8', clicks: 1560, visitors: 1250 },
    { date: 'Apr 9', clicks: 1870, visitors: 1500 },
    { date: 'Apr 10', clicks: 2100, visitors: 1700 },
    { date: 'Apr 11', clicks: 2340, visitors: 1900 },
    { date: 'Apr 12', clicks: 2560, visitors: 2100 },
    { date: 'Apr 13', clicks: 2780, visitors: 2300 },
    { date: 'Apr 14', clicks: 3010, visitors: 2500 },
  ]

  const weeklyData = [
    { date: 'Week 1', clicks: 8500, visitors: 6800 },
    { date: 'Week 2', clicks: 9200, visitors: 7400 },
    { date: 'Week 3', clicks: 10500, visitors: 8600 },
    { date: 'Week 4', clicks: 12300, visitors: 10200 },
  ]

  const monthlyData = [
    { date: 'Jan', clicks: 32000, visitors: 26000 },
    { date: 'Feb', clicks: 35000, visitors: 28000 },
    { date: 'Mar', clicks: 42000, visitors: 34000 },
    { date: 'Apr', clicks: 54000, visitors: 44000 },
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
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
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
            name="Clicks"
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="hsl(var(--secondary))"
            fillOpacity={1}
            fill="url(#colorVisitors)"
            strokeWidth={2}
            name="Visitors"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
