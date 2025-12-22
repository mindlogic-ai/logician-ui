import { useRef } from 'react';
import { createToaster, Toaster as ChakraToaster } from '@chakra-ui/react';

import { Toast } from './Toast';
import { toastStyles } from './Toast.styles';
import { CreateToastOptions, UseToastOptions } from './Toast.types';

const MAX_TOASTS = 3;

// Create a toaster instance
const toaster = createToaster({
  placement: 'top',
  pauseOnPageIdle: true,
});

// Export the Toaster component for use in app root
export const Toaster = () => <ChakraToaster toaster={toaster} />;

export const useToast = () => {
  const activeToasts = useRef<string[]>([]); // Track active toast IDs

  const showToast = ({
    status = 'success',
    title,
    description,
    position = 'top',
    duration = 5000,
    isClosable = true,
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
        toaster.dismiss(oldestToastId); // Close the oldest toast
        activeToasts.current.shift(); // Remove it from the list
      }
    }

    // Create a new toast
    const toastId = toaster.create({
      duration,
      type: status === 'error' ? 'error' : status === 'warning' ? 'warning' : status === 'info' ? 'info' : 'success',
      render: ({ onClose }) => (
        <Toast
          title={title || ''}
          description={description}
          status={status}
          onClose={onClose}
          {...styles}
        />
      ),
    });

    // Add the new toast ID to the active list
    if (toastId) {
      activeToasts.current.push(toastId);
    }

    return toastId;
  };

  return Object.assign(showToast, {
    close: toaster.dismiss,
    closeAll: () => toaster.dismiss(),
    update: toaster.update,
    isActive: (id: string) => activeToasts.current.includes(id),
  });
};

// Export the toaster for direct usage
export { toaster };
