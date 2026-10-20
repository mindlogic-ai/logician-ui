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
 * The wash card: a neutral `bg.muted` ground, borderless. For a block that
 * summarises or concludes (an AI summary, a total after a purchase, the
 * invitation being accepted) — the wash alone separates it from the page, so
 * it does not need a hairline on top of it. (Not the sand `secondary.surface`:
 * that tint reads peach as a background and is accent-only.)
 */
const washStyles = {
  bg: 'bg.muted',
  borderColor: 'transparent',
};

export const variantStyles = {
  default: {},
  wash: washStyles,
  // Soft resting elevation — a gentle shadow does the separating, so the border
  // can soften to `border.subtle` (which alone would be too faint, especially in
  // dark mode). Use for standalone content cards that should read as raised
  // objects rather than flat framed boxes.
  elevated: {
    boxShadow: 'sm',
    borderColor: 'border.subtle',
  },
};
