import { useRef } from 'react';
import { Toaster as ChakraToaster, createToaster } from '@chakra-ui/react';

import { Toast } from './Toast';
import { toastStyles } from './Toast.styles';
import { UseToastOptions } from './Toast.types';

const MAX_TOASTS = 3;

// Create a toaster instance
const toaster = createToaster({
  placement: 'top',
  duration: 5000,
});

// Export Toaster component for rendering in app
export const Toaster = () => (
  <ChakraToaster toaster={toaster as any} insetInline={{ mdDown: '4' }}>
    {(toast: any) => toast.render?.({ id: toast.id })}
  </ChakraToaster>
);

export const useToast = () => {
  const activeToasts = useRef<string[]>([]); // Track active toast IDs

  const showToast = ({
    status = 'success',
    title,
    description,
    placement = 'top',
    styles: stylesProp,
    duration = 5000,
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

    // Create a new toast and capture its ID
    const toastId = toaster.create({
      duration,
      placement,
      render: ({ id }) => (
        <Toast
          title={title || ''}
          description={description}
          status={status}
          onClose={() => toaster.dismiss(id)} // Close this specific toast
          {...styles} // Apply status-specific styles
        />
      ),
      onStatusChange: ({ status: toastStatus }) => {
        if (toastStatus === 'unmounted') {
          // Remove the toast ID from the active list once closed
          activeToasts.current = activeToasts.current.filter(
            (id) => id !== toastId
          );
        }
      },
      ...rest,
    } as any);

    // Add the new toast ID to the active list
    activeToasts.current.push(toastId);

    return toastId;
  };

  const dismissAll = () => {
    activeToasts.current.forEach((id) => toaster.dismiss(id));
    activeToasts.current = [];
  };

  return Object.assign(showToast, {
    dismiss: toaster.dismiss,
    dismissAll,
    update: toaster.update,
  });
};
