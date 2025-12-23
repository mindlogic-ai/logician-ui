import { ForwardedRef, forwardRef, ReactNode, useMemo } from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

import { TooltipProps } from './Tooltip.types';

type TooltipTriggerBaseProps = React.ComponentProps<
  typeof ChakraTooltip.Trigger
>;
type TooltipPositionerBaseProps = React.ComponentProps<
  typeof ChakraTooltip.Positioner
>;
type TooltipContentBaseProps = React.ComponentProps<
  typeof ChakraTooltip.Content
>;

// Cast components to include children and additional style props
const TooltipTrigger = ChakraTooltip.Trigger as React.FC<
  TooltipTriggerBaseProps & { children?: ReactNode; asChild?: boolean }
>;
const TooltipPositioner = ChakraTooltip.Positioner as React.FC<
  TooltipPositionerBaseProps & { children?: ReactNode }
>;
const TooltipContent = ChakraTooltip.Content as React.FC<
  TooltipContentBaseProps & {
    children?: ReactNode;
    bgColor?: string;
    bg?: string;
    fontSize?: string;
  }
>;

export const Tooltip = forwardRef(
  (
    {
      label,
      children,
      isOpen,
      placement,
      positioning,
      open,
      ...rest
    }: TooltipProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    // Handle deprecated props for backward compatibility
    const resolvedOpen = open ?? isOpen;
    const resolvedPositioning = useMemo(() => {
      if (positioning) return positioning;
      if (placement) return { placement };
      return undefined;
    }, [positioning, placement]);

    return (
      <ChakraTooltip.Root
        closeOnScroll
        open={resolvedOpen}
        positioning={resolvedPositioning}
        {...rest}
      >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPositioner>
          <TooltipContent ref={ref} bg="gray.1200" fontSize="sm">
            {label}
          </TooltipContent>
        </TooltipPositioner>
      </ChakraTooltip.Root>
    );
  }
);

Tooltip.displayName = 'Tooltip';
