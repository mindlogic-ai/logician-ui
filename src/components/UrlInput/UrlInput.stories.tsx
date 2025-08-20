import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { UrlInput, UrlInputProps } from './UrlInput';

const meta: Meta<typeof UrlInput> = {
  title: 'Components/UrlInput',
  component: UrlInput,
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
    leftAddon: { control: 'text' },
    rightAddon: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn<UrlInputProps> = args => <UrlInput {...args} />;

export const Basic: StoryFn<UrlInputProps> = Template.bind({});
Basic.args = {
  placeholder: 'mysite',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  leftAddon: 'https://',
  rightAddon: '.com',
};

export const Disabled: StoryFn<UrlInputProps> = Template.bind({});
Disabled.args = {
  placeholder: 'mysite',
  size: 'md',
  isDisabled: true,
  isInvalid: false,
  leftAddon: 'https://',
  rightAddon: '.com',
};

export const Invalid: StoryFn<UrlInputProps> = Template.bind({});
Invalid.args = {
  placeholder: 'mysite',
  size: 'md',
  isDisabled: false,
  isInvalid: true,
  leftAddon: 'https://',
  rightAddon: '.com',
};

export const CustomAddons: StoryFn<UrlInputProps> = Template.bind({});
CustomAddons.args = {
  placeholder: 'mysite',
  size: 'md',
  isDisabled: false,
  isInvalid: false,
  leftAddon: 'ftp://',
  rightAddon: '/home',
};
