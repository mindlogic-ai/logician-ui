import { useRef } from 'react';

import { TOAST_ACTION_DURATION, TOAST_DEFAULT_DURATION } from './Toast.styles';
import {
  ToasterCreateOptions,
  ToastStatus,
  ToastStatusChangeDetails,
  UseToastOptions,
  UseToastUpdateOptions,
} from './Toast.types';
import { toaster } from './Toaster';

const MAX_TOASTS = 3;

/**
 * Zag's own toast store only knows `info/success/warning/error/loading` and
 * REQUIRES one — `neutral` is ours, not Zag's, and both omitting `type` and
 * passing `'neutral'` throw from inside the machine. `'info'` only feeds Zag's
 * priority sort; the status that actually renders travels in `meta.status`
 * and is read back out in `Toaster`.
 */
const toZagType = (status: ToastStatus) =>
  status === 'neutral' ? 'info' : status;

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
      type: toZagType(status),
      meta: {
        // Pass custom data through meta
        status, // the real status — `Toaster` renders from this, not `type`
        // The `type` that `status` was paired with. A later
        // `toaster.update(id, { type })` changes `type` without touching
        // `meta.status`; the mismatch tells `Toaster` that `type` is newer.
        statusType: toZagType(status),
        // Only the caller's overrides — `Toaster` applies the status styles
        // itself, so they follow the status when it is updated.
        styles: stylesProp,
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

  /**
   * Update a toast in place. `status` (or Chakra's `type`) changes the colours
   * and icon; `meta` is merged into the toast's existing meta rather than
   * replacing it, so the close handler and the action survive the update.
   */
  const update = (
    id: string,
    { status, styles, action, meta, ...rest }: UseToastUpdateOptions
  ) => {
    const current =
      toaster.getVisibleToasts().find((toast) => toast.id === id)?.meta ?? {};
    const nextStatus: ToastStatus | undefined =
      status ?? (rest.type as ToastStatus | undefined);

    return toaster.update(id, {
      ...rest,
      ...(nextStatus && { type: toZagType(nextStatus) }),
      meta: {
        ...current,
        ...meta,
        ...(nextStatus && {
          status: nextStatus,
          statusType: toZagType(nextStatus),
        }),
        ...(styles !== undefined && { styles }),
        ...(action !== undefined && { action }),
      },
    } as ToasterCreateOptions);
  };

  return Object.assign(showToast, {
    dismiss: toaster.dismiss,
    dismissAll,
    update,
  });
};
