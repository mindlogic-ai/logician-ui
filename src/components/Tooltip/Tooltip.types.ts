import { ReactNode } from 'react';
import {
  TooltipArrowProps as ChakraTooltipArrowProps,
  TooltipContentProps as ChakraTooltipContentProps,
  TooltipRootProps as ChakraTooltipRootProps,
} from '@chakra-ui/react';

export interface TooltipProps extends ChakraTooltipRootProps {
  /** Tooltip content (v3 style) */
  content?: ReactNode;
  /** Props to pass to the tooltip content element */
  contentProps?: ChakraTooltipContentProps;
  /** Props to pass to the tooltip arrow element */
  arrowProps?: ChakraTooltipArrowProps;
  /** Disable the tooltip (v3) */
  disabled?: boolean;
  /** Tooltip placement */
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';
  /** Show arrow indicator (v3) */
  showArrow?: boolean;
  /** @deprecated Use `showArrow` instead. Show arrow indicator (v2 compatibility) */
  hasArrow?: boolean;
  /** @deprecated Use `content` instead. Tooltip content (v2 compatibility) */
  label?: ReactNode;
  /** @deprecated Use `disabled` instead. Disable the tooltip (v2 compatibility) */
  isDisabled?: boolean;
  /** @deprecated Use `open` instead. Control tooltip visibility (v2 compatibility) */
  isOpen?: boolean;
}
