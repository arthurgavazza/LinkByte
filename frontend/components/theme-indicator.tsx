'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

export function ThemeIndicator() {
  const { theme } = useTheme()
  const [showIndicator, setShowIndicator] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && theme !== currentTheme) {
      setCurrentTheme(theme)
      setShowIndicator(true)
      const timer = setTimeout(() => {
        setShowIndicator(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [theme, mounted, currentTheme])

  if (!mounted || !showIndicator) return null

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-lg"
        >
          {theme === 'dark' ? (
            <Moon className="h-4 w-4 text-accent" />
          ) : (
            <Sun className="h-4 w-4 text-accent" />
          )}
          <span className="text-sm font-medium">
            {theme === 'dark' ? 'Dark' : 'Light'} mode enabled
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
