import { ReactNode } from 'react';
import {
  BoxProps,
  ToastOptions,
  ToastRootProps,
  ToastStatusChangeDetails,
} from '@chakra-ui/react';

/**
 * Toast status type - common toast statuses used in Logician UI
 * Subset of Zag.js Type, excluding 'loading' for UI consistency
 */
export type ToastStatus = 'info' | 'warning' | 'success' | 'error';

/**
 * Toast component props
 * Uses ToastRootProps as base and overrides title for ReactNode support
 */
export interface ToastProps extends Omit<ToastRootProps, 'title'> {
  /** Toast title - supports ReactNode for flexibility */
  title?: ReactNode;
  /** Toast description/content */
  description?: ReactNode;
  /** Toast status/type - restricted to common statuses */
  status?: ToastStatus;
  /** Custom close handler */
  onClose?: () => void;
}

/**
 * Options for useToast hook
 * Extends Chakra's ToastOptions with custom properties
 */
export interface UseToastOptions extends ToastOptions {
  /** Toast status - restricted to common statuses */
  status?: ToastStatus;
  /** Custom styles to apply to the toast */
  styles?: BoxProps;
}

/**
 * Extended toast options for toaster.create()
 * Extends Chakra's ToastOptions with custom metadata
 */
export interface ToasterCreateOptions extends ToastOptions {
  /** Additional metadata for custom data passed to toast renderer */
  meta?: {
    /** Custom close handler for the toast */
    onClose?: () => void;
    /** Custom styles to merge with default toast styles */
    styles?: BoxProps;
    /** Allow additional custom metadata */
    [key: string]: any;
  };
}

/**
 * Re-export Chakra UI and Zag.js toast types for convenience
 */
export type { ToastOptions, ToastRootProps, ToastStatusChangeDetails };
