import { colors } from '@/theme/colors';

// Light mode styles only
export const cardStyles = {
  bgColor: colors.white,
  color: colors.black,
  borderColor: colors.gray[100],
};

export const clickableStyles = {
  cursor: 'pointer',
  _hover: {
    boxShadow: 'lg',
    ['.card-image']: {
      // TODO: define in theme
      transition: '0.3s all',
      transform: 'scale(1.05)',
      backgroundSize: '105%',
    },
  },
};

export const variantStyles = {
  default: {},
  gradient: {
    bg: `linear-gradient(180deg, #F5F8FD 0%, #FFFFFF 100%)`,
    border: `1px solid`,
    borderColor: 'blue.600',
  },
};
