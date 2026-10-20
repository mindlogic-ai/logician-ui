/**
 * Disabled look for filled controls (Button, IconButton, Tag, …).
 *
 * Fixed `disabled.bg` / `disabled.fg` colours instead of `opacity: 0.5`: a
 * half-transparent control takes on whatever is behind it, so the same
 * disabled button read differently on every layer (and a disabled primary
 * still looked "primary"). WCAG exempts disabled controls from contrast, so
 * these are not in the contrast audit. No hover/press change while disabled.
 *
 * Spread under `_disabled`. Ghost-style controls that have no fill use
 * `disabledText` instead so they do not suddenly grow a grey box.
 */
export const disabledControl = {
  bg: 'disabled.bg',
  color: 'disabled.fg',
  borderColor: 'transparent',
  opacity: 1,
  boxShadow: 'none',
} as const;

export const disabledText = {
  bg: 'transparent',
  color: 'disabled.fg',
  borderColor: 'transparent',
  opacity: 1,
  boxShadow: 'none',
} as const;
