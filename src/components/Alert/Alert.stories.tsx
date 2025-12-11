import { VStack } from '@chakra-ui/react';
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

/**
 * All alert status variants using the Golden Ratio color system.
 * Each variant uses `lightest` background with `dark` text for WCAG AA compliance.
 */
export const AllVariants: Story = {
  render: () => (
    <VStack spacing={4} align="stretch">
      <Alert status="info">
        This is an info alert - use for general information.
      </Alert>
      <Alert status="success">
        This is a success alert - use for confirmations.
      </Alert>
      <Alert status="warning">
        This is a warning alert - use for caution messages.
      </Alert>
      <Alert status="error">
        This is an error alert - use for error messages.
      </Alert>
    </VStack>
  ),
};

export const Info: Story = {
  args: {
    status: 'info',
    children: 'This is an informational message.',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    children: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    children: 'Please review your changes before continuing.',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    children: 'An error occurred. Please try again.',
  },
};

export const WithCloseButton: Story = {
  args: {
    status: 'success',
    children: '성공적으로 완료되었습니다!',
    onClose: action('onClose'),
  },
};
