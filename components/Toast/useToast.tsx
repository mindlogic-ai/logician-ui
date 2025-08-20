import { useRef } from 'react';
import { ToastId, useToast as useChakraToast } from '@chakra-ui/react';

import { Toast } from './Toast';
import { toastStyles } from './Toast.styles';
import { UseToastOptions } from './Toast.types';

const MAX_TOASTS = 3;

export const useToast = (props?: UseToastOptions) => {
  const toast = useChakraToast();
  const activeToasts = useRef<ToastId[]>([]); // Track active toast IDs

  const showToast = ({
    status = 'success',
    title,
    description,
    position = 'top',
    styles: stylesProp,
    ...rest
  }: UseToastOptions) => {
    const styles = {
      ...toastStyles[status],
      ...stylesProp,
    };

    // Close the earliest toast if the limit is reached
    if (activeToasts.current.length >= MAX_TOASTS) {
      const [oldestToastId] = activeToasts.current;
      if (oldestToastId) {
        toast.close(oldestToastId); // Close the oldest toast
        activeToasts.current.shift(); // Remove it from the list
      }
    }

    // Create a new toast and capture its ID
    const toastId = toast({
      duration: 5000,
      isClosable: true,
      position,
      ...props,
      render: () => (
        <Toast
          title={title || ''}
          description={description}
          status={status}
          onClose={() => toast.close(toastId)} // Close this specific toast
          {...styles} // Apply status-specific styles
        />
      ),
      onCloseComplete: () => {
        // Remove the toast ID from the active list once closed
        activeToasts.current = activeToasts.current.filter(
          id => id !== toastId,
        );
      },
      ...rest,
    });

    // Add the new toast ID to the active list
    activeToasts.current.push(toastId);
  };

  return showToast;
};
