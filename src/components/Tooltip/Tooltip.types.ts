import { ComponentProps, ReactNode } from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

export interface TooltipProps
  extends Omit<ComponentProps<typeof ChakraTooltip.Root>, 'positioning'> {
  label: ReactNode;
  children: ReactNode;
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
}
