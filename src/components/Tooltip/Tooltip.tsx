import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

import { TooltipProps } from './Tooltip.types';

type TooltipTriggerBaseProps = React.ComponentProps<typeof ChakraTooltip.Trigger>;
type TooltipPositionerBaseProps = React.ComponentProps<typeof ChakraTooltip.Positioner>;
type TooltipContentBaseProps = React.ComponentProps<typeof ChakraTooltip.Content>;

// Cast components to include children
const TooltipTrigger = ChakraTooltip.Trigger as React.FC<TooltipTriggerBaseProps & { children?: ReactNode }>;
const TooltipPositioner = ChakraTooltip.Positioner as React.FC<TooltipPositionerBaseProps & { children?: ReactNode }>;
const TooltipContent = ChakraTooltip.Content as React.FC<TooltipContentBaseProps & { children?: ReactNode }>;

export const Tooltip = forwardRef(
  (
    { label, children, ...rest }: TooltipProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ChakraTooltip.Root closeOnScroll {...rest}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipPositioner>
          <TooltipContent ref={ref} bgColor="gray.1200" fontSize="sm">
            {label}
          </TooltipContent>
        </TooltipPositioner>
      </ChakraTooltip.Root>
    );
  }
);

Tooltip.displayName = 'Tooltip';
