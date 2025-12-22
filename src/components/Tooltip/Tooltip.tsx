import { ForwardedRef, forwardRef } from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

import { TooltipProps } from './Tooltip.types';

export const Tooltip = forwardRef(
  (
    { label, children, ...rest }: TooltipProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ChakraTooltip.Root closeOnScroll {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content ref={ref} bgColor="gray.1200" fontSize="sm">
            {label}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </ChakraTooltip.Root>
    );
  }
);

Tooltip.displayName = 'Tooltip';
