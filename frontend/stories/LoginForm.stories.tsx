import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor, expect } from '@storybook/test'
import { LoginForm } from '@/components/login-form'
import { AuthProvider } from '@/providers/auth-provider'
import { Decorator } from '@storybook/react'

// A custom decorator to wrap the component with AuthProvider
const withAuthProvider: Decorator = (Story) => {
  return (
    <div className="w-full max-w-md p-6 bg-background rounded-lg shadow">
      <AuthProvider>
        <Story />
      </AuthProvider>
    </div>
  );
};

const meta: Meta<typeof LoginForm> = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    // Enable App Router for navigation hooks
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
      }
    }
  },
  decorators: [withAuthProvider],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginForm>

// Mock fetch setup function to be used in story play functions
const setupMockFetch = () => {
  const originalFetch = window.fetch;
  
  // Mock the fetch function
  window.fetch = async (url, options) => {
    if (url.toString().includes('/api/auth/login')) {
      // Mock successful login
      return {
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      } as Response
    } else if (url.toString().includes('/api/auth/me')) {
      // Mock user profile endpoint
      return {
        ok: true,
        status: 200,
        json: async () => ({ 
          id: '123',
          username: 'testuser',
          email: 'test@example.com'
        }),
      } as Response
    }
    
    // For all other requests, use the original fetch
    return originalFetch(url, options);
  };
  
  // Return cleanup function
  return () => {
    window.fetch = originalFetch;
  };
};

export const Default: Story = {
  args: {
    onSuccess: () => console.log('Login success'),
  },
}

export const Filled: Story = {
  args: {
    onSuccess: () => console.log('Login success'),
  },
  play: async ({ canvasElement }) => {
    const cleanup = setupMockFetch();
    const canvas = within(canvasElement);
    
    // Fill in the form
    await userEvent.type(canvas.getByLabelText(/username or email/i), 'testuser');
    await userEvent.type(canvas.getByLabelText(/password/i), 'Password123');
    
    // Check values
    expect(canvas.getByLabelText(/username or email/i)).toHaveValue('testuser');
    expect(canvas.getByLabelText(/password/i)).toHaveValue('Password123');
    
    cleanup();
  },
}

export const TogglePasswordVisibility: Story = {
  args: {
    onSuccess: () => console.log('Login success'),
  },
  play: async ({ canvasElement }) => {
    const cleanup = setupMockFetch();
    const canvas = within(canvasElement);
    
    // Fill in password field
    await userEvent.type(canvas.getByLabelText(/password/i), 'Password123');
    
    // Get password field and toggle button
    const passwordField = canvas.getByLabelText(/password/i);
    const toggleButton = canvas.getByRole('button', { name: /show password/i });
    
    // Check initial state (password is hidden)
    expect(passwordField).toHaveAttribute('type', 'password');
    
    // Click toggle button to show password
    await userEvent.click(toggleButton);
    
    // Check that password is now visible
    expect(passwordField).toHaveAttribute('type', 'text');
    
    // Click toggle button again to hide password
    await userEvent.click(toggleButton);
    
    // Check that password is hidden again
    expect(passwordField).toHaveAttribute('type', 'password');
    
    cleanup();
  },
}

export const SubmitForm: Story = {
  args: {
    onSuccess: () => console.log('Login success'),
  },
  play: async ({ canvasElement }) => {
    const cleanup = setupMockFetch();
    const canvas = within(canvasElement);
    
    // Fill in the form
    await userEvent.type(canvas.getByLabelText(/username or email/i), 'testuser');
    await userEvent.type(canvas.getByLabelText(/password/i), 'Password123');
    
    // Submit the form
    await userEvent.click(canvas.getByRole('button', { name: /sign in/i }));
    
    // Wait for the button to show loading state
    await waitFor(() => {
      expect(canvas.getByText(/signing in/i)).toBeInTheDocument();
    });
    
    cleanup();
  },
}

export const Validation: Story = {
  args: {
    onSuccess: () => console.log('Login success'),
  },
  play: async ({ canvasElement }) => {
    const cleanup = setupMockFetch();
    const canvas = within(canvasElement);
    
    // Submit empty form to trigger validation
    const submitButton = canvas.getByRole('button', { name: /sign in/i });
    await userEvent.click(submitButton);
    
    // Check validation errors
    await waitFor(() => {
      expect(canvas.getByText(/username or email is required/i)).toBeInTheDocument();
      expect(canvas.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    // Fill in one field to see partial validation
    await userEvent.type(canvas.getByLabelText(/username or email/i), 'testuser');
    
    // Submit again
    await userEvent.click(submitButton);
    
    // Check that only password validation error is shown
    await waitFor(() => {
      expect(canvas.queryByText(/username or email is required/i)).not.toBeInTheDocument();
      expect(canvas.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    cleanup();
  },
} 