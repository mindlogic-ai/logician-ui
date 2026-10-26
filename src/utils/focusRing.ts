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

/**
 * The same two bands as {@link FOCUS_RING_SHADOW}, drawn INSIDE the element's
 * edge: the outer 2px in `focus.ring`, then the 2px `bg.canvas` band that keeps
 * the ring legible against whatever fill the element has.
 *
 * {@link focusRing} needs 4px of clear space on every side, because both bands
 * paint outside the box. Rows packed into a list cannot give it that — the band
 * lands on the neighbouring row, which paints its own background back over
 * half of it — and a list that scrolls (`overflow-x: auto`) clips it outright.
 * Same colour and weight, inside the box instead.
 */
export const FOCUS_RING_INSET_SHADOW =
  'inset 0 0 0 2px var(--chakra-colors-focus-ring), inset 0 0 0 4px var(--chakra-colors-bg-canvas)';

/** {@link focusRing}'s inset counterpart, for rows in a dense or scrolling list. */
export const focusRingInset = {
  _focus: { outline: 'none' },
  _focusVisible: {
    outline: 'none',
    boxShadow: FOCUS_RING_INSET_SHADOW,
  },
} as const;
