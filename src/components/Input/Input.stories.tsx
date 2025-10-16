import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { IoCall, IoSearch } from '../Icon';

import { Input } from './Input';
import { InputProps } from './Input.types';

const meta: Meta<typeof Input> = {
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
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    maxLength: { control: 'number' },
  },
};

export default meta;

const Template: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

export const Basic: StoryFn<InputProps> = Template.bind({});
Basic.args = {};

export const LeftIcon: StoryFn<InputProps> = Template.bind({});
LeftIcon.args = {
  placeholder: 'Phone number',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  leftIcon: <IoCall color="gray.300" />,
};

export const RightIcon: StoryFn<InputProps> = Template.bind({});
RightIcon.args = {
  placeholder: 'Search...',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  rightIcon: <IoSearch color="gray.300" />,
  maxLength: 20,
};
