import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
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
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'error',
    children: 'Pro 플랜 무료 체험이 Jan 01 에 종료됩니다.',
  },
};

export const WithCloseButton: Story = {
  args: {
    status: 'success',
    children: '성공적으로 완료되었습니다!',
    onClose: action('onClose'),
  },
};
