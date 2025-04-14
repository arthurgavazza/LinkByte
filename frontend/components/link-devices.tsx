'use client'

interface LinkDevicesProps {
  linkId: string
}

export function LinkDevices({ linkId }: LinkDevicesProps) {
  // In a real app, you would fetch data based on the linkId
  const devices = [
    { name: 'Mobile', percentage: 58.3 },
    { name: 'Desktop', percentage: 32.4 },
    { name: 'Tablet', percentage: 9.3 },
  ]

  return (
    <div className="space-y-4">
      {devices.map(device => (
        <div key={device.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{device.name}</div>
            <div className="text-sm text-muted-foreground">{device.percentage}%</div>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${device.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
