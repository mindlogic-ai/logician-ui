import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { IoCall, IoSearch } from '@/components/Icon';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    maxLength: { control: 'number' },
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {};

export const LeftIcon: Story = {
  args: {
    placeholder: 'Phone number',
    size: 'md',
    disabled: false,
    invalid: false,
    leftIcon: <IoCall color="gray.300" />,
  },
};

export const RightIcon: Story = {
  args: {
    placeholder: 'Search...',
    size: 'md',
    disabled: false,
    invalid: false,
    rightIcon: <IoSearch color="gray.300" />,
    maxLength: 20,
  },
};
