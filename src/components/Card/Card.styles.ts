/**
 * Card styles using the Golden Ratio color system.
 */

export const clickableStyles = {
  cursor: 'pointer',
  _hover: {
    boxShadow: 'lg',
  },
};

export const variantStyles = {
  default: {},
  gradient: {
    bg: 'linear-gradient(180deg, var(--chakra-colors-bg-subtle) 0%, var(--chakra-colors-bg-surface) 100%)',
    border: '1px solid',
    borderColor: 'primary.light',
  },
  // Soft resting elevation — a gentle shadow does the separating, so the border
  // can soften to `border.subtle` (which alone would be too faint, especially in
  // dark mode). Use for standalone content cards that should read as raised
  // objects rather than flat framed boxes.
  elevated: {
    boxShadow: 'sm',
    borderColor: 'border.subtle',
  },
};
