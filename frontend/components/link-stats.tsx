'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export function LinkStats() {
  // This would fetch data from your API in a real application
  const data = [
    { date: 'Apr 1', clicks: 120 },
    { date: 'Apr 2', clicks: 145 },
    { date: 'Apr 3', clicks: 132 },
    { date: 'Apr 4', clicks: 178 },
    { date: 'Apr 5', clicks: 189 },
    { date: 'Apr 6', clicks: 167 },
    { date: 'Apr 7', clicks: 145 },
    { date: 'Apr 8', clicks: 156 },
    { date: 'Apr 9', clicks: 187 },
    { date: 'Apr 10', clicks: 210 },
    { date: 'Apr 11', clicks: 234 },
    { date: 'Apr 12', clicks: 256 },
    { date: 'Apr 13', clicks: 278 },
    { date: 'Apr 14', clicks: 301 },
  ]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorClicks)"
            strokeWidth={2}
            name="Clicks"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
