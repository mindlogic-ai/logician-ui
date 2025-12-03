import { ReactNode } from 'react';
import {
  BoxProps,
  ChakraProps,
  UseToastOptions as ChakraUseToastOptions,
} from '@chakra-ui/react';

export interface MLToastOptions {
  title?: ReactNode;
  description: ReactNode;
  status?: Extract<
    ChakraUseToastOptions['status'],
    'info' | 'warning' | 'success' | 'error'
  >;
}

export interface ToastProps extends Omit<BoxProps, 'title'>, MLToastOptions {}

export type UseToastOptions = ChakraUseToastOptions &
  MLToastOptions & {
    styles?: ChakraProps;
  };
