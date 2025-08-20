import { ButtonProps } from '@chakra-ui/react';

import { ButtonVariant } from '@/components/Button/Button.types';
import theme from '@/theme/index';

export const variantStyles: Record<
  Exclude<ButtonVariant, undefined>,
  Partial<ButtonProps>
> = {
  primary: {
    borderColor: 'primary.main',
    bgColor: 'primary.main',
    color: 'white',
    _hover: {
      borderColor: 'blue.800',
      bgColor: 'blue.800',
    },
    // TODO: pressed styles currently not applying accurately in Storybook
    _pressed: {
      bgColor: 'blue.1000',
    },
  },
  secondary: {
    borderColor: '#dbe7ff',
    bgColor: 'primary.light',
    color: 'primary.main',
    _hover: {
      borderColor: '#c8d9ff',
      bgColor: 'blue.200',
    },
    _pressed: {
      bgColor: 'blue.400',
    },
  },
  tertiary: {
    borderColor: 'gray.400',
    bgColor: 'white',
    color: 'gray.1200',
    _hover: {
      bgColor: 'gray.50',
    },
  },
  danger: {
    borderColor: 'danger.main',
    bgColor: 'danger.main',
    color: 'white',
    _hover: {
      bgColor: theme.colors.red[600],
    },
  },
  link: {
    borderColor: 'transparent',
    bgColor: 'transparent',
    borderRadius: 'none',
    _hover: {
      bgColor: 'transparent',
    },
  },
};
