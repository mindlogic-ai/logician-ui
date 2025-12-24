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
    title: 'Trial Ending Soon',
    description: 'Pro 플랜 무료 체험이 Jan 01 에 종료됩니다.',
  },
};

/**
 * Alert with only title (no description)
 */
export const TitleOnly: Story = {
  args: {
    status: 'info',
    title: 'New Feature Available',
  },
};

/**
 * Alert with only description (no title)
 */
export const DescriptionOnly: Story = {
  args: {
    status: 'warning',
    description:
      'Please save your work. The session will expire in 5 minutes.',
  },
};

/**
 * All alert status variants with title and description
 */
export const AllVariants: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      <Alert
        status="info"
        title="Information"
      />
      <Alert
        status="success"
        title="Success"
      />
      <Alert
        status="warning"
        title="Warning"
      />
      <Alert
        status="error"
        title="Error"
      />
    </VStack>
  ),
};

export const Info: Story = {
  args: {
    status: 'info',
    title: 'Information',
    description: 'This is an informational message.',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Success',
    description: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'Warning',
    description: 'Please review your changes before continuing.',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Error',
    description: 'An error occurred. Please try again.',
  },
};

export const WithCloseButton: Story = {
  args: {
    status: 'success',
    title: 'Success',
    description: '성공적으로 완료되었습니다!',
    onClose: action('onClose'),
  },
};

/**
 * Alert sizes - sm, md (default), lg
 * Size affects spacing and icon size
 */
export const Sizes: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      <Alert
        status="info"
        size="sm"
        title="Small Alert"
        description="This is a small size alert with smaller icon and spacing."
      />
      <Alert
        status="success"
        size="md"
        title="Medium Alert (Default)"
        description="This is the default medium size alert."
      />
      <Alert
        status="warning"
        size="lg"
        title="Large Alert"
        description="This is a large size alert with larger icon and spacing."
      />
    </VStack>
  ),
};
