import { BoxProps } from '@chakra-ui/react';

import type { ToastStatus } from './Toast.types';

/**
 * Toast variant styles on the BAZE token set.
 *
 * Each status is bg `{s}.bg` + text `{s}.fg` + a 1px `{s}.border` outline —
 * `info` reads its own `info.*` family instead of borrowing `primary.*`.
 * `neutral` carries no status (it is the default when none is given) and is
 * inverted: the tooltip pair `tooltip.bg` / `tooltip.fg`. A `bg.surface` toast
 * was white on a white canvas in light mode, set apart only by a 1px border
 * and the shadow — a "링크를 복사했어요" confirmation was easy to miss. The
 * tooltip pair already flips per mode (ink in light, off-white in dark), so the
 * toast stays the highest-contrast thing on the page in both.
 */
export const toastStyles: Record<ToastStatus, BoxProps> = {
  info: {
    bg: 'info.bg',
    color: 'info.fg',
    borderColor: 'info.border',
  },
  warning: {
    bg: 'warning.bg',
    color: 'warning.fg',
    borderColor: 'warning.border',
  },
  success: {
    bg: 'success.bg',
    color: 'success.fg',
    borderColor: 'success.border',
  },
  error: {
    bg: 'danger.bg',
    color: 'danger.fg',
    borderColor: 'danger.border',
  },
  neutral: {
    bg: 'tooltip.bg',
    color: 'tooltip.fg',
    borderColor: 'tooltip.bg',
  },
};

/**
 * CloseButton styles for each toast status.
 * Ensures visual consistency with the toast's color scheme.
 * Uses BoxProps for flexibility with Toast.CloseTrigger
 */
export const closeButtonStyles: Record<ToastStatus, BoxProps> = {
  info: {
    color: 'info.fg',
    _hover: {
      bg: 'info.border',
    },
  },
  warning: {
    color: 'warning.fg',
    _hover: {
      bg: 'warning.border',
    },
  },
  success: {
    color: 'success.fg',
    _hover: {
      bg: 'success.border',
    },
  },
  error: {
    color: 'danger.fg',
    _hover: {
      bg: 'danger.border',
    },
  },
  neutral: {
    color: 'tooltip.fg',
    _hover: {
      // A tint of the toast's own text colour: no surface token sits on the
      // inverted ground in both modes.
      bg: 'color-mix(in srgb, var(--chakra-colors-tooltip-fg) 16%, transparent)',
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
    color: 'info.fg',
    _hover: { bg: 'info.border' },
    _focusVisible: { outline: '2px solid', outlineColor: 'info.fg' },
  },
  warning: {
    ...actionBase,
    color: 'warning.fg',
    _hover: { bg: 'warning.border' },
    _focusVisible: { outline: '2px solid', outlineColor: 'warning.fg' },
  },
  success: {
    ...actionBase,
    color: 'success.fg',
    _hover: { bg: 'success.border' },
    _focusVisible: { outline: '2px solid', outlineColor: 'success.fg' },
  },
  error: {
    ...actionBase,
    color: 'danger.fg',
    _hover: { bg: 'danger.border' },
    _focusVisible: { outline: '2px solid', outlineColor: 'danger.fg' },
  },
  neutral: {
    ...actionBase,
    color: 'tooltip.fg',
    _hover: {
      bg: 'color-mix(in srgb, var(--chakra-colors-tooltip-fg) 16%, transparent)',
    },
    _focusVisible: { outline: '2px solid', outlineColor: 'tooltip.fg' },
  },
};

/** Default duration (ms) of a toast without an action, when none is given */
export const TOAST_DEFAULT_DURATION = 5000;

/**
 * Default duration (ms) of a toast that carries an action, when none is given.
 * The reader needs time to read the message *and* decide to act.
 */
export const TOAST_ACTION_DURATION = 8000;
