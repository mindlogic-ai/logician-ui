/**
 * Card styles using the Golden Ratio color system.
 */

export const cardStyles = {
  '.card-image': {
    transitionProperty: 'common',
    transitionDuration: 'normal',
    transitionTimingFunction: 'ease',
  },
};

export const clickableStyles = {
  cursor: 'pointer',
  _hover: {
    boxShadow: 'lg',
    '.card-image': {
      transform: 'scale(1.05)',
      backgroundSize: '105%',
    },
  },
};

export const variantStyles = {
  default: {},
  gradient: {
    bg: 'linear-gradient(180deg, #F5F8FD 0%, #FFFFFF 100%)',
    border: '1px solid',
    borderColor: 'blue.300', // #1241A6
  },
};
