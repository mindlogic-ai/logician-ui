import { BoxProps } from '@chakra-ui/react';

export const toastStyles: Record<string, BoxProps> = {
  success: {
    bg: 'success.lighter',
    color: 'success.dark',
    borderColor: 'success.light',
  },
  info: {
    bg: 'primary.light',
    color: 'primary.dark',
    borderColor: 'primary.lighter',
  },
  error: {
    bg: 'danger.lighter',
    color: 'danger.dark',
    borderColor: 'danger.light',
  },
};
