import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Badge } from '.';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Pro Plan',
  },
  argTypes: {
    textTransform: {
      control: 'radio',
      options: ['none', 'uppercase'],
    },
  },
};

export default meta;
type Story = StoryFn<typeof Badge>;

export const Basic: Story = (args) => <Badge {...args} />;
