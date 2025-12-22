import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

import { TooltipProps } from './Tooltip.types';

type TooltipTriggerProps = React.ComponentProps<typeof ChakraTooltip.Trigger> & {
  children?: ReactNode;
};
type TooltipContentProps = React.ComponentProps<typeof ChakraTooltip.Content> & {
  children?: ReactNode;
};
type TooltipPositionerProps = React.ComponentProps<typeof ChakraTooltip.Positioner> & {
  children?: ReactNode;
};

export const Tooltip = forwardRef(
  (
    { label, children, ...rest }: TooltipProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ChakraTooltip.Root closeOnScroll {...rest}>
        <ChakraTooltip.Trigger asChild {...({} as TooltipTriggerProps)}>
          {children}
        </ChakraTooltip.Trigger>
        <ChakraTooltip.Positioner {...({} as TooltipPositionerProps)}>
          <ChakraTooltip.Content
            ref={ref}
            bgColor="gray.1200"
            fontSize="sm"
            {...({} as TooltipContentProps)}
          >
            {label}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </ChakraTooltip.Root>
    );
  }
);

Tooltip.displayName = 'Tooltip';
