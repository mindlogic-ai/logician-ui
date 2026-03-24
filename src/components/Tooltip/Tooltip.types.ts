import { ReactNode } from 'react';
import {
  TooltipArrowProps as ChakraTooltipArrowProps,
  TooltipContentProps as ChakraTooltipContentProps,
  TooltipRootProps as ChakraTooltipRootProps,
  TooltipTriggerProps as ChakraTooltipTriggerProps,
} from '@chakra-ui/react';

export interface TooltipProps extends ChakraTooltipRootProps {
  /** Tooltip content */
  content?: ReactNode;
  /** Props to pass to the tooltip trigger element */
  triggerProps?: ChakraTooltipTriggerProps;
  /** Props to pass to the tooltip content element */
  contentProps?: ChakraTooltipContentProps;
  /** Props to pass to the tooltip arrow element */
  arrowProps?: ChakraTooltipArrowProps;
  /** Disable the tooltip */
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
  /** Show arrow indicator */
  showArrow?: boolean;
}
