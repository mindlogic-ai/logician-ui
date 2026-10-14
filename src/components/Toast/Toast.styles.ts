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
    color: 'primary.darker',
    _hover: {
      bg: 'primary.lighter',
    },
  },
  warning: {
    color: 'warning.darker',
    _hover: {
      bg: 'warning.lighter',
    },
  },
  success: {
    color: 'success.darker',
    _hover: {
      bg: 'success.lighter',
    },
  },
  error: {
    color: 'danger.darker',
    _hover: {
      bg: 'danger.lighter',
    },
  },
};

/**
 * Action styles for each toast status.
 *
 * A toast's action is a text action in the toast's own text color — the same
 * palette as `toastStyles[status].color` — with the hover tint of the close ×.
 * No border and no fill: a neutral or outlined button inside a tinted toast
 * reads as a separate card dropped on top of it.
 *
 * `ml: -2` cancels the horizontal padding so the label lines up with the
 * description text above it.
 */
const actionBase: BoxProps = {
  fontWeight: 'bold',
  px: 2,
  py: 1,
  ml: -2,
  height: 'auto',
  alignSelf: 'flex-start',
  borderRadius: 'sm',
  borderWidth: 0,
  bg: 'transparent',
  cursor: 'pointer',
};

export const actionStyles: Record<ToastStatus, BoxProps> = {
  info: {
    ...actionBase,
    color: 'primary.dark',
    _hover: { bg: 'primary.lighter' },
    _focusVisible: { outline: '2px solid', outlineColor: 'primary.dark' },
  },
  warning: {
    ...actionBase,
    color: 'warning.dark',
    _hover: { bg: 'warning.lighter' },
    _focusVisible: { outline: '2px solid', outlineColor: 'warning.dark' },
  },
  success: {
    ...actionBase,
    color: 'success.dark',
    _hover: { bg: 'success.lighter' },
    _focusVisible: { outline: '2px solid', outlineColor: 'success.dark' },
  },
  error: {
    ...actionBase,
    color: 'danger.dark',
    _hover: { bg: 'danger.lighter' },
    _focusVisible: { outline: '2px solid', outlineColor: 'danger.dark' },
  },
};

/** Default duration (ms) of a toast without an action, when none is given */
export const TOAST_DEFAULT_DURATION = 5000;

/**
 * Default duration (ms) of a toast that carries an action, when none is given.
 * The reader needs time to read the message *and* decide to act.
 */
export const TOAST_ACTION_DURATION = 8000;
