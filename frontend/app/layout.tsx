import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeIndicator } from '@/components/theme-indicator'
import { QueryProvider } from '@/providers/query-provider'
import { AuthProvider } from '@/providers/auth-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ProgressProvider } from '@/providers/progress-provider'
import { ErrorBoundary } from '@/components/error-boundary'
import { RouteGuard } from '@/components/route-guard'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkByte - URL Shortener',
  description: 'Create short links with powerful analytics',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <QueryProvider>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ProgressProvider>
                  <RouteGuard>
                    {children}
                  </RouteGuard>
                  <ThemeIndicator />
                  <ToastProvider />
                </ProgressProvider>
              </ThemeProvider>
            </AuthProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

import './globals.css'
