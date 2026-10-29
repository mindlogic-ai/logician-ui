import { BoxProps } from '@chakra-ui/react';

import type { ToastStatus } from './Toast.types';

/**
 * Toast variant styles on the BAZE token set.
 *
 * Each status is bg `{s}.bg` + text `{s}.fg` + a 1px `{s}.border` outline —
 * `info` reads its own `info.*` family instead of borrowing `primary.*`.
 * `neutral` carries no status (it is the default when none is given) and sits
 * on the muted ground: `bg.muted` + `fg.default` + a `border.default` outline.
 * Not `bg.surface` — that was white on a white canvas in light mode, set apart
 * only by a 1px border and the shadow, so a "링크를 복사했어요" confirmation was
 * easy to miss. Not the inverted tooltip pair either — ink (#252525) is
 * `primary.main`, the user's own chat bubble, so a plain "복사 완료" read as
 * the heaviest thing on the page, louder than an error toast. `bg.muted` is
 * already a registered separation from `bg.canvas` (see `contrast.test.ts`)
 * and flips per mode with the rest of the neutral ramp.
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
    bg: 'bg.muted',
    color: 'fg.default',
    borderColor: 'border.default',
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
    color: 'fg.muted',
    _hover: {
      bg: 'layer.1.active',
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
    color: 'fg.default',
    _hover: { bg: 'layer.1.active' },
    _focusVisible: { outline: '2px solid', outlineColor: 'fg.default' },
  },
};

/** Default duration (ms) of a toast without an action, when none is given */
export const TOAST_DEFAULT_DURATION = 5000;

/**
 * Default duration (ms) of a toast that carries an action, when none is given.
 * The reader needs time to read the message *and* decide to act.
 */
export const TOAST_ACTION_DURATION = 8000;
