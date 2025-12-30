import { Meta, StoryObj } from '@storybook/react';

import { UrlInput } from './UrlInput';

const meta = {
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
} satisfies Meta<typeof UrlInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'mysite',
    size: 'md',
    isDisabled: false,
    isInvalid: false,
    leftAddon: 'https://',
    rightAddon: '.com',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'mysite',
    size: 'md',
    isDisabled: true,
    isInvalid: false,
    leftAddon: 'https://',
    rightAddon: '.com',
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'mysite',
    size: 'md',
    isDisabled: false,
    isInvalid: true,
    leftAddon: 'https://',
    rightAddon: '.com',
  },
};

export const CustomAddons: Story = {
  args: {
    placeholder: 'mysite',
    size: 'md',
    isDisabled: false,
    isInvalid: false,
    leftAddon: 'ftp://',
    rightAddon: '/home',
  },
};
