import type { Meta, StoryObj } from '@storybook/react'
import { expect, within, userEvent, waitFor, fn } from '@storybook/test'
import { RegisterForm } from '@/components/register-form'
import { AuthProvider } from '@/providers/auth-provider'
import React from 'react'
import { Decorator } from '@storybook/react'

// A custom decorator to wrap the component with AuthProvider
const withAuthProvider: Decorator = (Story) => (
  <div className="w-full max-w-md p-6 bg-background rounded-lg shadow">
    <AuthProvider>
      <Story />
    </AuthProvider>
  </div>
);

// Mock fetch for API calls
const setupMockFetch = () => {
  const originalFetch = window.fetch;
  
  // Mock the fetch function
  window.fetch = async (url, options) => {
    if (url.toString().includes('/api/auth/register')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ id: '123', username: 'testuser' }),
      } as Response;
    } else if (url.toString().includes('/api/auth/login')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      } as Response;
    } else if (url.toString().includes('/api/auth/me')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ id: '123', username: 'testuser', email: 'test@example.com' }),
      } as Response;
    }
    
    return originalFetch(url, options);
  };
  
  return () => {
    window.fetch = originalFetch;
  };
};

const meta: Meta<typeof RegisterForm> = {
  title: 'Auth/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
    // Enable App Router for navigation hooks
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/register',
      }
    }
  },
  args: {
    onSuccess: fn(),
  },
  decorators: [withAuthProvider],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {}

export const Filled: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('Fill in the form', async () => {
      await userEvent.type(canvas.getByLabelText(/email/i), 'test@example.com')
      await userEvent.type(canvas.getByLabelText(/username/i), 'testuser')
      await userEvent.type(canvas.getByLabelText(/^password$/i), 'Password123')
      await userEvent.type(canvas.getByLabelText(/confirm password/i), 'Password123')
    })
    
    await step('Verify values', async () => {
      await expect(canvas.getByLabelText(/email/i)).toHaveValue('test@example.com')
      await expect(canvas.getByLabelText(/username/i)).toHaveValue('testuser')
      await expect(canvas.getByLabelText(/^password$/i)).toHaveValue('Password123')
      await expect(canvas.getByLabelText(/confirm password/i)).toHaveValue('Password123')
    })
  },
}

export const TogglePasswordVisibility: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('Fill in password fields', async () => {
      await userEvent.type(canvas.getByLabelText(/^password$/i), 'Password123')
      await userEvent.type(canvas.getByLabelText(/confirm password/i), 'Password123')
    })
    
    await step('Toggle password visibility', async () => {
      const passwordField = canvas.getByLabelText(/^password$/i)
      const confirmPasswordField = canvas.getByLabelText(/confirm password/i)
      
      const toggleButtons = canvas.getAllByRole('button', { name: /show password/i })
      const passwordToggleButton = toggleButtons[0]
      const confirmPasswordToggleButton = toggleButtons[1]
      
      // Check initial state (passwords are hidden)
      await expect(passwordField).toHaveAttribute('type', 'password')
      await expect(confirmPasswordField).toHaveAttribute('type', 'password')
      
      // Click password toggle button
      await userEvent.click(passwordToggleButton)
      
      // Check that password is now visible
      await expect(passwordField).toHaveAttribute('type', 'text')
      await expect(confirmPasswordField).toHaveAttribute('type', 'password') // Still hidden
      
      // Click confirm password toggle button
      await userEvent.click(confirmPasswordToggleButton)
      
      // Check that both passwords are visible
      await expect(passwordField).toHaveAttribute('type', 'text')
      await expect(confirmPasswordField).toHaveAttribute('type', 'text')
      
      // Click both toggle buttons again to hide passwords
      await userEvent.click(passwordToggleButton)
      await userEvent.click(confirmPasswordToggleButton)
      
      // Check that passwords are hidden again
      await expect(passwordField).toHaveAttribute('type', 'password')
      await expect(confirmPasswordField).toHaveAttribute('type', 'password')
    })
  },
}

export const ValidationErrors: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('Submit empty form to trigger validation', async () => {
      const submitButton = canvas.getByRole('button', { name: /create account/i })
      await userEvent.click(submitButton)
      
      await waitFor(() => {
        expect(canvas.getByText(/valid email is required/i)).toBeInTheDocument()
        expect(canvas.getByText(/username must be at least 3 characters/i)).toBeInTheDocument()
        expect(canvas.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
      })
    })
    
    await step('Fill in fields with invalid data', async () => {
      await userEvent.type(canvas.getByLabelText(/email/i), 'not-an-email')
      await userEvent.type(canvas.getByLabelText(/username/i), 'a@')
      await userEvent.type(canvas.getByLabelText(/^password$/i), 'short')
      await userEvent.type(canvas.getByLabelText(/confirm password/i), 'different')
      
      // Submit again
      await userEvent.click(canvas.getByRole('button', { name: /create account/i }))
      
      // Check specific validation errors
      await waitFor(() => {
        expect(canvas.getByText(/valid email is required/i)).toBeInTheDocument()
        expect(canvas.getByText(/username can only contain/i)).toBeInTheDocument()
        expect(canvas.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
        expect(canvas.getByText(/passwords don't match/i)).toBeInTheDocument()
      })
    })
  },
}

export const PasswordRequirements: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('Fill in valid data except password', async () => {
      await userEvent.type(canvas.getByLabelText(/email/i), 'test@example.com')
      await userEvent.type(canvas.getByLabelText(/username/i), 'testuser')
    })
    
    await step('Test password without uppercase', async () => {
      await userEvent.type(canvas.getByLabelText(/^password$/i), 'password123')
      await userEvent.type(canvas.getByLabelText(/confirm password/i), 'password123')
      
      await userEvent.click(canvas.getByRole('button', { name: /create account/i }))
      
      await waitFor(() => {
        expect(canvas.getByText(/password must contain at least one uppercase letter/i)).toBeInTheDocument()
      })
    })
    
    await step('Test password without lowercase', async () => {
      await userEvent.clear(canvas.getByLabelText(/^password$/i))
      await userEvent.clear(canvas.getByLabelText(/confirm password/i))
      
      await userEvent.type(canvas.getByLabelText(/^password$/i), 'PASSWORD123')
      await userEvent.type(canvas.getByLabelText(/confirm password/i), 'PASSWORD123')
      
      await userEvent.click(canvas.getByRole('button', { name: /create account/i }))
      
      await waitFor(() => {
        expect(canvas.getByText(/password must contain at least one lowercase letter/i)).toBeInTheDocument()
      })
    })
    
    await step('Test password without number', async () => {
      await userEvent.clear(canvas.getByLabelText(/^password$/i))
      await userEvent.clear(canvas.getByLabelText(/confirm password/i))
      
      await userEvent.type(canvas.getByLabelText(/^password$/i), 'PasswordNoNumber')
      await userEvent.type(canvas.getByLabelText(/confirm password/i), 'PasswordNoNumber')
      
      await userEvent.click(canvas.getByRole('button', { name: /create account/i }))
      
      await waitFor(() => {
        expect(canvas.getByText(/password must contain at least one number/i)).toBeInTheDocument()
      })
    })
  },
}

export const SuccessfulSubmission: Story = {
  play: async ({ args, canvasElement, step, mount }) => {
    // Use mount to set up a mock date before rendering
    await mount();
    
    const canvas = within(canvasElement);
    
    await step('Fill form with valid data', async () => {
      await userEvent.type(canvas.getByLabelText(/email/i), 'valid@example.com');
      await userEvent.type(canvas.getByLabelText(/username/i), 'validuser');
      await userEvent.type(canvas.getByLabelText(/^password$/i), 'ValidPassword123');
      await userEvent.type(canvas.getByLabelText(/confirm password/i), 'ValidPassword123');
    });
    
    await step('Submit the form', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /create account/i }));
    });
    
    await step('Verify success', async () => {
      // Verify onSuccess callback was called
      await waitFor(() => {
        expect(args.onSuccess).toHaveBeenCalled();
      });
    });
  },
};

export const CustomConfiguration: Story = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    
    await step('Fill in form fields', async () => {
      await userEvent.type(canvas.getByLabelText(/email/i), 'custom@example.com');
      await userEvent.type(canvas.getByLabelText(/username/i), 'custom-user');
      await userEvent.type(canvas.getByLabelText(/^password$/i), 'ValidPassword123');
      await userEvent.type(canvas.getByLabelText(/confirm password/i), 'ValidPassword123');
    });
    
    await step('Submit form and verify handler called', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /create account/i }));
      
      await waitFor(() => {
        expect(args.onSuccess).toHaveBeenCalled();
      });
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how the RegisterForm works with its default configuration.',
      },
    },
  },
}; 