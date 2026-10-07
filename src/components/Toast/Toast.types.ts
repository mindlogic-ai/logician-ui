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
 * The single action a toast can carry.
 *
 * Rendered as a text action in the toast's status color, under the
 * description. Clicking it calls `onClick` and dismisses the toast.
 * One action per toast — dismiss is the ×, never a second action.
 * See the "Guidelines/Actions in feedback surfaces" page in Storybook.
 */
export interface ToastAction {
  /** Action label — keep it to a short verb phrase ("크레딧 구매", "Undo") */
  label: ReactNode;
  /** Called when the action is clicked; the toast is dismissed afterwards */
  onClick: () => void;
}

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
  /** One action, rendered as a text action in the status color */
  action?: ToastAction;
}

/**
 * Options for useToast hook
 * Extends Chakra's ToastOptions with custom properties
 */
export interface UseToastOptions extends Omit<ToastOptions, 'action'> {
  /** Toast status - restricted to common statuses */
  status?: ToastStatus;
  /**
   * One action, rendered as a text action in the status color.
   * Unlike Chakra's `action`, the label accepts any ReactNode.
   * When set and `duration` is not given, the toast stays for 8s instead of 5s.
   */
  action?: ToastAction;
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
    /** Toast action (ReactNode label); takes precedence over Chakra's `action` */
    action?: ToastAction;
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
