import React from 'react';
import { fn } from 'storybook/test';
import { Meta, StoryFn } from '@storybook/react';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    status: 'error',
    children: 'Pro 플랜 무료 체험이 Jan 01 에 종료됩니다.',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['error', 'success', 'warning', 'info'],
      description: 'Status of the Alert component',
    },
    onClose: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryFn<typeof Alert>;

// Default story without a close button
export const Default: Story = (args) => <Alert {...args} />;

// Story with a close button
export const WithButton: Story = (args) => <Alert {...args} />;
WithButton.args = {
  status: 'success',
  children: '성공적으로 완료되었습니다!',
  onClose: fn(),
};
