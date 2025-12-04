import { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '.';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    size: 'md',
    name: '',
    src: '',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
