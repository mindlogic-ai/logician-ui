import theme from '@/theme/index';

/**
 * Card styles using the Golden Ratio color system.
 */

// Light mode styles only
export const cardStyles = {
  bgColor: theme.colors.white,
  color: theme.colors.gray[1300], // Primary text color
  borderColor: theme.colors.gray[200], // #E2E6F0
};

export const clickableStyles = {
  cursor: 'pointer',
  _hover: {
    boxShadow: 'lg',
    ['.card-image']: {
      transition: '0.3s all',
      transform: 'scale(1.05)',
      backgroundSize: '105%',
    },
  },
};

export const variantStyles = {
  default: {},
  gradient: {
    bg: `linear-gradient(180deg, ${theme.colors.gray[50]} 0%, ${theme.colors.white} 100%)`,
    border: `1px solid`,
    borderColor: 'blue.300', // #4A79DC
  },
};
