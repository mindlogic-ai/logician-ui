/**
 * Standard focus ring styles for interactive components.
 *
 * - _focus: suppresses the browser's default outline on all focus events (including mouse)
 * - _focusVisible: shows the ring only on keyboard focus (CSS :focus-visible)
 *
 * No transition, on purpose. The ring answers a key press, and keyboard
 * actions should land instantly — Tab is pressed hundreds of times a day. It
 * also used to be a `transition` *shorthand* under `:focus-visible`, which
 * replaced the element's whole transition list while focused, so a
 * keyboard-focused Switch or Checkbox snapped its fill instead of fading it.
 */
export const focusRing = {
  _focus: { outline: 'none' },
  _focusVisible: {
    outline: 'none',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 2px, var(--chakra-colors-primary-main) 0px 0px 0px 4px',
  },
} as const;
