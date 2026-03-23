import { BoxProps } from '@chakra-ui/react';

import type { ToastStatus } from './Toast.types';

/**
 * Toast variant styles using the Golden Ratio color system.
 *
 * Uses `lightest` backgrounds with `lighter` borders and `dark` text
 * for optimal readability and WCAG AA compliance.
 */
export const toastStyles: Record<ToastStatus, BoxProps> = {
  info: {
    bg: 'primary.extralight', // #E8EEFB
    color: 'primary.dark', // #0D317D
    borderColor: 'primary.lighter', // #B9CBF3
  },
  warning: {
    bg: 'warning.extralight', // #FBF6E8
    color: 'warning.dark', // #7D610D
    borderColor: 'warning.lighter', // #F3E4B9
  },
  success: {
    bg: 'success.extralight', // #E9FBE8
    color: 'success.dark', // #147D0D
    borderColor: 'success.lighter', // #BDF3B9
  },
  error: {
    bg: 'danger.extralight', // #FBE8E9
    color: 'danger.dark', // #7D0D14
    borderColor: 'danger.lighter', // #F3B9BD
  },
};

/**
 * CloseButton styles for each toast status.
 * Ensures visual consistency with the toast's color scheme.
 * Uses BoxProps for flexibility with Toast.CloseTrigger
 */
export const closeButtonStyles: Record<ToastStatus, BoxProps> = {
  info: {
    color: 'primary.dark',
    _hover: {
      bg: 'primary.lighter',
    },
  },
  warning: {
    color: 'warning.dark',
    _hover: {
      bg: 'warning.lighter',
    },
  },
  success: {
    color: 'success.dark',
    _hover: {
      bg: 'success.lighter',
    },
  },
  error: {
    color: 'danger.dark',
    _hover: {
      bg: 'danger.lighter',
    },
  },
};
