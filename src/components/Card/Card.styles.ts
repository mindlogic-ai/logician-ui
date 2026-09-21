/**
 * Card styles using the Golden Ratio color system.
 */

/**
 * The clickable hover is flat: the ground steps one tier to `bg.subtle` and
 * the border darkens to `border.strong`. Nothing lifts and nothing grows a
 * shadow. A raised hover said "this floats", and a card in a list does not;
 * the tier step and the border say "this is the one under the pointer" with
 * no elevation, and both tokens invert, so the state reads in dark mode where
 * a neutral tint would vanish.
 */
export const clickableStyles = {
  cursor: 'pointer',
  _hover: {
    bg: 'bg.subtle',
    borderColor: 'border.strong',
  },
};

/**
 * The wash card: one tier off the page with a hairline. For a block that
 * summarises or concludes (an AI summary, a total after a purchase, the
 * invitation being accepted). It is what `gradient` used to paint with a
 * 180deg wash and a brand-tinted border; the gradient read as decoration and
 * the tinted border claimed brand for a surface that is not an action.
 *
 * The tier is `bg.subtle` in light but `bg.muted` in dark: `bg.subtle` sits
 * one grayDark step above `bg.surface` there, too close to read as a different
 * surface, and `border.subtle` resolves to the same step, so the hairline would
 * vanish. `border.default` keeps the edge in both modes.
 */
const washStyles = {
  bg: { base: 'bg.subtle', _dark: 'bg.muted' },
  borderColor: 'border.default',
};

export const variantStyles = {
  default: {},
  wash: washStyles,
  /** @deprecated Renders as `wash`; use `variant="wash"`. */
  gradient: washStyles,
  // Soft resting elevation — a gentle shadow does the separating, so the border
  // can soften to `border.subtle` (which alone would be too faint, especially in
  // dark mode). Use for standalone content cards that should read as raised
  // objects rather than flat framed boxes.
  elevated: {
    boxShadow: 'sm',
    borderColor: 'border.subtle',
  },
};
