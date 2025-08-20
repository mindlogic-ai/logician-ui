import { IconButtonProps } from '@chakra-ui/react';

import { IconButtonVariant } from './IconButton.types';

// TODO: UX를 위해 hover, active 스타일 구분 필요
export const variantStyles: Record<
  Exclude<IconButtonVariant, undefined>,
  Partial<IconButtonProps>
> = {
  primary: {
    borderColor: 'primary.main',
    bgColor: 'primary.main',
    color: 'white',
    _hover: {
      borderColor: 'blue.800',
      bgColor: 'blue.800',
    },
  },
  secondary: {
    borderColor: 'primary.light',
    bgColor: 'primary.light',
    color: 'primary.main',
    _hover: {
      borderColor: 'blue.200',
      bgColor: 'blue.200',
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
      bgColor: 'red.600',
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
