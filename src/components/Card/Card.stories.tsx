import { Meta, StoryFn } from '@storybook/react';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    children: 'Default Card',
    p: 8,
  },
};

export default meta;
type Story = StoryFn<typeof Card>;

export const Default: Story = {};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Gradient Card',
  },
};
