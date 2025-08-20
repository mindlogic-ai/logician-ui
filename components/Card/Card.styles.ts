import { BoxProps, ChakraProps } from '@chakra-ui/react';

import { ColorModeData } from '@/store/colorMode';
import theme from '@/theme/index';

export const modeStyles: Record<
  ColorModeData['colorMode'],
  // TODO: is there a better type to define style props?
  Partial<BoxProps>
> = {
  Light: {
    bgColor: theme.colors.white,
    color: theme.colors.black,
    borderColor: theme.colors.gray[100],
  },
  Dark: {
    // TODO: move to theme
    bgColor: '#3d4f58',
    color: theme.colors.white,
    borderColor: theme.colors.gray[500],
  },
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

export const variantStyles: Record<string, ChakraProps> = {
  default: {},
  gradient: {
    bg: `linear-gradient(180deg, #F5F8FD 0%, #FFFFFF 100%)`,
    border: `1px solid`,
    borderColor: 'blue.600',
  },
};
