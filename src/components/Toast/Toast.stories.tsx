import { Flex } from '@chakra-ui/react';
import { Meta } from '@storybook/react';

import { Button } from '../Button';
import { useToast } from './useToast';

const meta: Meta<typeof Text> = {
  title: 'Components/Toast',
};
export default meta;

export function Toasts() {
  const showToast = useToast();

  return (
    <Flex gap={3}>
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
            status: 'info',
          })
        }
      >
        Show Info Toast
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
}
