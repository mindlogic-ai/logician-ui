import { ComponentProps, ReactNode } from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

export interface TooltipProps extends Omit<
  ComponentProps<typeof ChakraTooltip.Root>,
  'positioning'
> {
  /** Tooltip content (v3 style) */
  content?: ReactNode;
  /** @deprecated Use `content` instead. Tooltip content (v2 compatibility) */
  label?: ReactNode;
  /** Trigger element */
  children: ReactNode;
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
  /** Props to pass to the tooltip content element */
  contentProps?: ComponentProps<typeof ChakraTooltip.Content>;
  /** Props to pass to the tooltip arrow element */
  arrowProps?: ComponentProps<typeof ChakraTooltip.Arrow>;
  /** Disable the tooltip (v3) */
  disabled?: boolean;
  /** @deprecated Use `disabled` instead. Disable the tooltip (v2 compatibility) */
  isDisabled?: boolean;
  /** @deprecated Use `open` instead. Control tooltip visibility (v2 compatibility) */
  isOpen?: boolean;
}
