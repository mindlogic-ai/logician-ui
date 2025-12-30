import { Meta, StoryObj } from '@storybook/react';

import { Badge } from '.';

const meta = {
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
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
