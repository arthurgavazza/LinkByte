'use client'

import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

interface LinkQRCodeProps {
  url: string
  size?: number
}

export function LinkQRCode({ url, size = 200 }: LinkQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: size,
          margin: 2,
          color: {
            dark: '#0078D7', // Use the primary blue directly instead of CSS variable
            light: '#FFFFFF',
          },
        },
        error => {
          if (error) console.error('QR Code error:', error)
        }
      )
    }
  }, [url, size])

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="rounded-md" />
      <p className="mt-2 text-center text-sm text-muted-foreground">{url}</p>
    </div>
  )
}
