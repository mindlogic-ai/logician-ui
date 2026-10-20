import { ReactNode } from 'react';
import { FlexProps } from '@chakra-ui/react';

export interface FormFooterProps extends Omit<FlexProps, 'children'> {
  /**
   * Left-aligned slot — typically a destructive or back action (e.g. delete).
   * When present the footer justifies its content `space-between`; otherwise the
   * right group fills the width.
   */
  start?: ReactNode;
  /**
   * Right-aligned metadata rendered before the action — a saved-at timestamp or
   * a credit cost.
   */
  meta?: ReactNode;
  /** The primary action, right-aligned. */
  action?: ReactNode;
  /**
   * Pin the footer to the bottom of its scroll container. Defaults to true; set
   * false for a footer that flows at the end of non-scrolling content.
   */
  sticky?: boolean;
}
