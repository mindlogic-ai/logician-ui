import { BoxProps } from '@chakra-ui/react';

import type { MLToastOptions } from './Toast.types';

export const toastStyles = {
  info: {
    bg: 'primary.light',
    color: 'primary.dark',
    borderColor: 'primary.lighter',
  },
  warning: {
    bg: 'warning.lighter',
    color: 'warning.dark',
    borderColor: 'warning.light',
  },
  success: {
    bg: 'success.lighter',
    color: 'success.dark',
    borderColor: 'success.light',
  },
  error: {
    bg: 'danger.lighter',
    color: 'danger.dark',
    borderColor: 'danger.light',
  },
} satisfies Record<MLToastOptions['status'], BoxProps>;
