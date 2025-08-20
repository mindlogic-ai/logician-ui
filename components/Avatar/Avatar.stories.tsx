import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Avatar } from '.';
const meta: Meta<typeof Avatar> = {
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
};

export default meta;
type Story = StoryFn<typeof Avatar>;
export const Basic: Story = args => <Avatar {...args} />;
