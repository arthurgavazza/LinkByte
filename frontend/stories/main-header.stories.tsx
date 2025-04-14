import type { Meta, StoryObj } from '@storybook/react'
import { MainHeaderStory } from './main-header-story'
import { userEvent, within, expect } from '@storybook/test'
import { StoryAuthProvider } from './mock-providers'

const meta: Meta<typeof MainHeaderStory> = {
  title: 'Components/MainHeader',
  component: MainHeaderStory,
  parameters: {
    layout: 'fullscreen',
  },
  // Apply global decorator to all stories to ensure they have required providers
  decorators: [
    (Story) => (
      <div className="flex min-h-[200px] flex-col">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MainHeaderStory>

// Story for logged out state
export const LoggedOut: Story = {
  parameters: {
    // Customize auth state through parameters
    authState: {
      isAuthenticated: false,
      user: null,
    },
  },
  decorators: [
    (Story, context) => {
      const authState = context.parameters.authState || { isAuthenticated: false, user: null };
      return (
        <StoryAuthProvider {...authState}>
          <Story />
        </StoryAuthProvider>
      );
    },
  ],
}

// Story for logged in state
export const LoggedIn: Story = {
  parameters: {
    // Customize auth state through parameters
    authState: {
      isAuthenticated: true,
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        created_at: new Date().toISOString(),
        is_active: true,
        is_verified: true
      },
    },
  },
  decorators: [
    (Story, context) => {
      const authState = context.parameters.authState || { isAuthenticated: false, user: null };
      return (
        <StoryAuthProvider {...authState}>
          <Story />
        </StoryAuthProvider>
      );
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('Verify username is displayed', async () => {
      expect(canvas.getByText('testuser')).toBeTruthy()
    })
    
    await step('Verify authenticated nav links', async () => {
      expect(canvas.getByRole('link', { name: 'Dashboard' })).toBeTruthy()
      expect(canvas.getByRole('link', { name: 'Analytics' })).toBeTruthy()
    })
  },
} 