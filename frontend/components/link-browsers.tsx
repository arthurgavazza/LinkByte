'use client'

interface LinkBrowsersProps {
  linkId: string
}

export function LinkBrowsers({ linkId }: LinkBrowsersProps) {
  // In a real app, you would fetch data based on the linkId
  const browsers = [
    { name: 'Chrome', percentage: 64.7 },
    { name: 'Safari', percentage: 18.2 },
    { name: 'Firefox', percentage: 8.4 },
    { name: 'Edge', percentage: 6.5 },
    { name: 'Others', percentage: 2.2 },
  ]

  return (
    <div className="space-y-4">
      {browsers.map(browser => (
        <div key={browser.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{browser.name}</div>
            <div className="text-sm text-muted-foreground">{browser.percentage}%</div>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-secondary"
              style={{ width: `${browser.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
