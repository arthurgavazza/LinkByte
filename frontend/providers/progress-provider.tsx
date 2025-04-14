'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, createContext, useContext, type ReactNode, Suspense } from 'react'

interface ProgressContextType {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

interface ProgressProviderProps {
  children: ReactNode
}

function ProgressIndicator() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Reset loading state on route change
  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  return (
    <ProgressContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="fixed left-0 right-0 top-0 z-50 h-1 animate-pulse bg-primary" />
      )}
    </ProgressContext.Provider>
  )
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  return (
    <Suspense fallback={null}>
      <ProgressIndicator />
      <ProgressContext.Provider value={{ isLoading: false, setIsLoading: () => {} }}>
        {children}
      </ProgressContext.Provider>
    </Suspense>
  )
}

export const useProgress = () => {
  const context = useContext(ProgressContext)

  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }

  return context
}
