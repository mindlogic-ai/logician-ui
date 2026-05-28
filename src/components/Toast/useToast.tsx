import { useRef } from 'react';

import { toastStyles } from './Toast.styles';
import {
  ToasterCreateOptions,
  ToastStatusChangeDetails,
  UseToastOptions,
} from './Toast.types';
import { toaster } from './toaster';

const MAX_TOASTS = 3;

/**
 * Custom hook for managing toast notifications
 * @returns Toast management functions
 */
export const useToast = () => {
  const activeToasts = useRef<string[]>([]); // Track active toast IDs

  const showToast = ({
    status = 'success',
    title,
    description,
    styles: stylesProp,
    duration = 5000,
    ...rest
  }: UseToastOptions) => {
    // NOTE: placement is not supported - must be configured in Toaster.tsx createToaster()
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
      title,
      description,
      type: status, // Maps to our status
      meta: {
        // Pass custom data through meta
        styles, // for custom toast style
        onClose: () => toaster.dismiss(toastId), // Custom close handler
      },
      onStatusChange: (details: ToastStatusChangeDetails) => {
        if (details.status === 'unmounted') {
          // Remove the toast ID from the active list once closed
          activeToasts.current = activeToasts.current.filter(
            (id) => id !== toastId
          );
        }
      },
      ...rest,
    } as ToasterCreateOptions);

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
