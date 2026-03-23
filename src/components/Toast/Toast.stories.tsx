import { Flex, Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { Toast } from './Toast';
import { Toaster } from './Toaster';
import { useToast } from './useToast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

export const BasicStatuses: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                description: 'This is an informational message.',
                status: 'info',
              })
            }
          >
            Show Info Toast
          </Button>
          <Button
            onClick={() =>
              showToast({
                description: 'This is a warning message.',
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
      </>
    );
  },
};

export const WithTitles: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                title: 'Information',
                description: 'Here is some useful information for you.',
                status: 'info',
              })
            }
          >
            Info with Title
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Warning',
                description: 'Please review this warning message.',
                status: 'warning',
              })
            }
          >
            Warning with Title
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Success',
                description: 'Operation completed successfully.',
                status: 'success',
              })
            }
          >
            Success with Title
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Error',
                description: 'An error occurred while processing.',
                status: 'error',
              })
            }
          >
            Error with Title
          </Button>
        </Flex>
      </>
    );
  },
};

export const DurationControl: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                title: 'Quick Toast',
                description: 'This toast will disappear in 2 seconds',
                duration: 2000,
                status: 'info',
              })
            }
          >
            2 Seconds
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Normal Toast',
                description: 'This toast will disappear in 5 seconds (default)',
                duration: 5000,
                status: 'success',
              })
            }
          >
            5 Seconds (Default)
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Long Toast',
                description: 'This toast will stay for 10 seconds',
                duration: 10000,
                status: 'warning',
              })
            }
          >
            10 Seconds
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Persistent Toast',
                description: 'This toast will not auto-dismiss',
                duration: Infinity,
                status: 'error',
              })
            }
          >
            Persistent (No Auto-Dismiss)
          </Button>
        </Flex>
      </>
    );
  },
};

export const DismissControl: Story = {
  render: () => {
    const showToast = useToast();
    const [lastToastId, setLastToastId] = useState<string | null>(null);

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() => {
              const id = showToast({
                title: 'Dismissible Toast',
                description: 'Click "Dismiss Last" to close this toast',
                duration: null,
                status: 'info',
              });
              setLastToastId(id);
            }}
          >
            Show Toast
          </Button>
          <Button
            onClick={() => {
              if (lastToastId) {
                showToast.dismiss(lastToastId);
                setLastToastId(null);
              }
            }}
            disabled={!lastToastId}
          >
            Dismiss Last Toast
          </Button>
          <Button
            onClick={() => {
              showToast.dismissAll();
              setLastToastId(null);
            }}
          >
            Dismiss All Toasts
          </Button>
        </Flex>
      </>
    );
  },
};

export const MaxToastLimit: Story = {
  render: () => {
    const showToast = useToast();
    const [count, setCount] = useState(0);

    return (
      <>
        <Toaster />
        <Stack gap={3}>
          <Text fontSize="sm" color="gray.600">
            Maximum 3 toasts are shown at once. Older toasts are automatically
            dismissed.
          </Text>
          <Flex gap={3} wrap="wrap">
            <Button
              onClick={() => {
                const newCount = count + 1;
                setCount(newCount);
                showToast({
                  title: `Toast #${newCount}`,
                  description: `This is toast number ${newCount}`,
                  status: 'info',
                  duration: null,
                });
              }}
            >
              Add Toast (Count: {count})
            </Button>
            <Button
              onClick={() => {
                showToast.dismissAll();
                setCount(0);
              }}
            >
              Reset
            </Button>
          </Flex>
        </Stack>
      </>
    );
  },
};

export const UpdateToast: Story = {
  render: () => {
    const showToast = useToast();
    const [toastId, setToastId] = useState<string | null>(null);

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() => {
              const id = showToast({
                title: 'Loading...',
                description: 'Processing your request',
                status: 'info',
                duration: null,
              });
              setToastId(id);
            }}
          >
            Create Toast
          </Button>
          <Button
            onClick={() => {
              if (toastId) {
                showToast.update(toastId, {
                  title: 'Success!',
                  description: 'Your request was processed successfully',
                  type: 'success',
                  duration: 5000,
                });
              }
            }}
            disabled={!toastId}
          >
            Update to Success
          </Button>
          <Button
            onClick={() => {
              if (toastId) {
                showToast.update(toastId, {
                  title: 'Error!',
                  description: 'Something went wrong',
                  type: 'error',
                  duration: 5000,
                });
              }
            }}
            disabled={!toastId}
          >
            Update to Error
          </Button>
        </Flex>
      </>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                title: 'Custom Background',
                description: 'This toast has a purple background',
                status: 'info',
                styles: {
                  bg: 'purple.500',
                  color: 'white',
                },
              })
            }
          >
            Custom Background
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Custom Border',
                description: 'This toast has a thick border',
                status: 'success',
                styles: {
                  borderWidth: '4px',
                  borderColor: 'green.500',
                },
              })
            }
          >
            Custom Border
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Large Toast',
                description: 'This toast is wider and has larger text',
                status: 'warning',
                styles: {
                  maxW: '600px',
                  fontSize: 'lg',
                  p: 6,
                },
              })
            }
          >
            Custom Size
          </Button>
        </Flex>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                title: 'Long Description',
                description:
                  'This is a very long description that demonstrates how the toast handles longer content. The toast should properly wrap the text and maintain readability even with extensive information. This helps ensure that important messages are fully visible to users.',
                status: 'info',
              })
            }
          >
            Long Description
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'This is a Very Long Title That Should Wrap Properly',
                description: 'Short description with long title',
                status: 'warning',
              })
            }
          >
            Long Title
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Complex Content',
                description:
                  'Line 1: First piece of information\nLine 2: Second piece of information\nLine 3: Third piece of information',
                status: 'success',
              })
            }
          >
            Multi-line Content
          </Button>
        </Flex>
      </>
    );
  },
};

export const RapidFire: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Stack gap={3}>
          <Text fontSize="sm" color="gray.600">
            Test rapid toast creation and the 3-toast limit
          </Text>
          <Button
            onClick={() => {
              for (let i = 1; i <= 5; i++) {
                setTimeout(() => {
                  showToast({
                    title: `Toast ${i}`,
                    description: `Rapid fire toast number ${i}`,
                    status: i % 2 === 0 ? 'success' : 'info',
                  });
                }, i * 200);
              }
            }}
          >
            Show 5 Toasts Rapidly
          </Button>
        </Stack>
      </>
    );
  },
};
