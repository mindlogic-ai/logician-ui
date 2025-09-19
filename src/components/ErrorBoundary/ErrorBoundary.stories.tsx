import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ErrorBoundary } from './ErrorBoundary';

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

function ErrorComponent() {
  throw new Error('Test error');
  return <></>;
}

export const Default: Story = {
  args: {
    children: <ErrorComponent />,
    componentName: 'Storybook',
  },
};
