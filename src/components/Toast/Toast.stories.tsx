import { Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Toast } from './Toast';
import { useToast } from './useToast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

export const Toasts: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <Flex gap={3}>
        <Button
          onClick={() =>
            showToast({
              description: 'There was an error processing your request.',
              status: 'info',
            })
          }
        >
          Show Info Toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              description: 'This is a warning toast.',
              status: 'warning',
            })
          }
        >
          Show Warning Toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              description: 'Your action was successful.',
              status: 'success',
            })
          }
        >
          Show Success Toast
        </Button>
        <Button
          onClick={() =>
            showToast({
              description: 'There was an error processing your request.',
              status: 'error',
            })
          }
        >
          Show Error Toast
        </Button>
      </Flex>
    );
  },
};
