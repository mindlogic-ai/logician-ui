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
    disabled: { control: 'boolean' },
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
    disabled: false,
    leftAddon: 'https://',
    rightAddon: '.com',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'mysite',
    size: 'md',
    disabled: true,
    leftAddon: 'https://',
    rightAddon: '.com',
  },
};

export const CustomAddons: Story = {
  args: {
    placeholder: 'mysite',
    size: 'md',
    disabled: false,
    leftAddon: 'ftp://',
    rightAddon: '/home',
  },
};
