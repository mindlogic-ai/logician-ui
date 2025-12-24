import { ReactNode } from 'react';
import { BoxProps } from '@chakra-ui/react';

export interface MLToastOptions {
  title?: ReactNode;
  description: ReactNode;
  status?: 'info' | 'warning' | 'success' | 'error';
}

export interface ToastProps extends Omit<BoxProps, 'title'>, MLToastOptions {}

export interface UseToastOptions extends MLToastOptions {
  duration?: number;
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
  styles?: BoxProps;
  [key: string]: any;
}
