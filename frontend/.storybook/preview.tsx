import type { Preview } from '@storybook/react'
import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import global styles
import '../app/globals.css'

// Import your theme provider
import { ThemeProvider } from '../components/theme-provider'

// Indicate that we're in Storybook context
if (typeof window !== 'undefined') {
  window.STORYBOOK_CONTEXT = true;
}

// Create a QueryClient for all stories
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Create a decorator to apply theme and other providers
const withProviders = (Story: React.ComponentType) => {
  useEffect(() => {
    // Set the STORYBOOK_CONTEXT flag
    if (typeof window !== 'undefined') {
      window.STORYBOOK_CONTEXT = true;
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <div className="p-6 bg-background min-h-[100px]">
          <Story />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Configure Next.js parameters for Storybook
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'hsl(var(--background))' },
        { name: 'dark', value: 'hsl(222 47% 11%)' },
      ],
    },
  },
  // Global decorators for all stories
  decorators: [withProviders],
}

export default preview