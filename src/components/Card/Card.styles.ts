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
};
