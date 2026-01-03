import { ReactNode } from 'react';
import { BoxProps } from '@chakra-ui/react';

export interface MLToastOptions {
  title?: ReactNode;
  description: ReactNode;
  status?: 'info' | 'warning' | 'success' | 'error';
}

export interface ToastProps extends Omit<BoxProps, 'title'>, MLToastOptions {}

export type ToastPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

export interface UseToastOptions extends MLToastOptions {
  duration?: number;
  /** v3 prop: toast placement */
  placement?: ToastPlacement;
  /**
   * @deprecated Use `placement` instead. Maintained for v2 backward compatibility.
   */
  position?: ToastPlacement;
  /**
   * @deprecated No longer needed in v3. Toast always has close button.
   * Maintained for v2 backward compatibility (ignored).
   */
  isClosable?: boolean;
  styles?: BoxProps;
  [key: string]: any;
}
