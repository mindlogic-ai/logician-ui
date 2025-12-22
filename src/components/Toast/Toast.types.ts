import { ReactNode } from 'react';
import { BoxProps } from '@chakra-ui/react';

export type ToastStatus = 'info' | 'warning' | 'success' | 'error';

export interface MLToastOptions {
  title?: ReactNode;
  description: ReactNode;
  status?: ToastStatus;
}

export interface ToastProps extends Omit<BoxProps, 'title'>, MLToastOptions {
  onClose?: () => void;
}

export interface UseToastOptions extends MLToastOptions {
  duration?: number;
  isClosable?: boolean;
  position?: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left';
  styles?: Record<string, any>;
}

export interface CreateToastOptions extends UseToastOptions {
  id?: string;
}
