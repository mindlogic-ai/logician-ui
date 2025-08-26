import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Icon } from '@/components/Icon';

import { Input, InputDataProps } from './Input';

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

const Template: StoryFn<InputDataProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

export const Basic: StoryFn<InputDataProps> = Template.bind({});
Basic.args = {};

export const LeftIcon: StoryFn<InputDataProps> = Template.bind({});
LeftIcon.args = {
  placeholder: 'Phone number',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  leftIcon: <Icon icon="IoCall" color="gray.300" />,
};

export const RightIcon: StoryFn<InputDataProps> = Template.bind({});
RightIcon.args = {
  placeholder: 'Search...',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  rightIcon: <Icon icon="IoSearch" color="gray.300" />,
  maxLength: 20,
};
