import { useRef } from 'react';

import {
  TOAST_ACTION_DURATION,
  TOAST_DEFAULT_DURATION,
  toastStyles,
} from './Toast.styles';
import {
  ToasterCreateOptions,
  ToastStatusChangeDetails,
  UseToastOptions,
} from './Toast.types';
import { toaster } from './Toaster';

const MAX_TOASTS = 3;

/**
 * Custom hook for managing toast notifications
 * @returns Toast management functions
 */
export const useToast = () => {
  const activeToasts = useRef<string[]>([]); // Track active toast IDs

  const showToast = ({
    status = 'neutral',
    title,
    description,
    styles: stylesProp,
    duration: durationProp,
    action,
    ...rest
  }: UseToastOptions) => {
    // A toast with an action stays longer, unless the caller chose a duration
    // (including `null` / `Infinity` for a persistent toast).
    const duration =
      durationProp !== undefined
        ? durationProp
        : action
          ? TOAST_ACTION_DURATION
          : TOAST_DEFAULT_DURATION;

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
      // Zag's own toast store only knows `info/success/warning/error/loading`
      // and REQUIRES one — `neutral` is ours, not Zag's, and both omitting
      // `type` and passing `'neutral'` throw from inside the machine.
      // `'info'` here only feeds Zag's priority sort; the status that
      // actually renders travels through `meta.status` below and is read
      // back out in `Toaster`.
      type: status === 'neutral' ? 'info' : status,
      meta: {
        // Pass custom data through meta
        status, // the real status — `Toaster` renders from this, not `type`
        styles, // for custom toast style
        action, // ReactNode label, so it travels in meta rather than `action`
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
