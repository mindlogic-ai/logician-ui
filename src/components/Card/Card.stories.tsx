import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    children: 'Default Card',
    p: 8,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Gradient Card',
  },
};
