/**
 * Standard focus ring styles for interactive components.
 *
 * - _focus: suppresses the browser's default outline on all focus events (including mouse)
 * - _focusVisible: shows the ring only on keyboard focus (CSS :focus-visible)
 *
 * Two rings: an inner 2px band in `bg.canvas` that separates the ring from the
 * control (so a black ring on a black button still reads), and an outer 2px in
 * `focus.ring`. The inner band used to be a hardcoded `rgb(255,255,255)`,
 * which drew a white halo in dark mode; it now follows the canvas token.
 *
 * No transition, on purpose. The ring answers a key press, and keyboard
 * actions should land instantly — Tab is pressed hundreds of times a day. It
 * also used to be a `transition` *shorthand* under `:focus-visible`, which
 * replaced the element's whole transition list while focused, so a
 * keyboard-focused Switch or Checkbox snapped its fill instead of fading it.
 */
export const FOCUS_RING_SHADOW =
  'var(--chakra-colors-bg-canvas) 0px 0px 0px 2px, var(--chakra-colors-focus-ring) 0px 0px 0px 4px';

export const focusRing = {
  _focus: { outline: 'none' },
  _focusVisible: {
    outline: 'none',
    boxShadow: FOCUS_RING_SHADOW,
  },
} as const;
