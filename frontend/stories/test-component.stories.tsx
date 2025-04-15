import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// A test component that uses both React Query and Tailwind CSS
const TestComponent = () => {
  // Simple query that doesn't actually fetch but tests the QueryClient
  const { isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: () => Promise.resolve('test data'),
    enabled: false, // Don't actually run the query
  });

  return (
    <div className="p-4 rounded-lg border border-border">
      <h1 className="text-2xl font-bold text-primary mb-4">Test Component</h1>
      <p className="text-foreground mb-2">This tests both styling and QueryClient</p>
      <p className="text-muted-foreground">Query is {isLoading ? 'loading' : 'ready'}</p>
      <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
        Test Button
      </button>
    </div>
  );
};

// Story metadata
const meta = {
  title: 'Test/TestComponent',
  component: TestComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {}; 