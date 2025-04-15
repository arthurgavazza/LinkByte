import type { Preview } from '@storybook/react'
import { StoryProviders } from '../stories/mock-providers'
import React from 'react'
import '../app/globals.css'
import { ThemeProvider } from '../components/theme-provider'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" attribute="class">
        <StoryProviders>
          <div className="p-4 bg-background text-foreground">
            <Story />
          </div>
        </StoryProviders>
      </ThemeProvider>
    ),
  ],
};

export default preview;