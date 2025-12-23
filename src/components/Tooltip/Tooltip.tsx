import { ForwardedRef, forwardRef } from 'react';
import { Tooltip as ChakraTooltip, useTheme } from '@chakra-ui/react';

import { TooltipProps } from './Tooltip.types';

export const Tooltip = forwardRef(
  (
    { children, label, open, onOpenChange, ...rest }: TooltipProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const theme = useTheme();
    return (
      <ChakraTooltip.Root
        positioning={{ placement: 'top' } as any}
        closeOnScroll
        open={open}
        onOpenChange={onOpenChange}
        {...rest}
        {...({} as any)}
      >
        <ChakraTooltip.Trigger asChild {...({} as any)}>{children}</ChakraTooltip.Trigger>
        <ChakraTooltip.Content
          ref={ref}
          css={{
            '--tooltip-bg': 'var(--chakra-colors-gray-1200)',
            fontSize: theme.fontSizes.p,
          } as any}
          {...({} as any)}
        >
          {label}
        </ChakraTooltip.Content>
      </ChakraTooltip.Root>
    );
  }
);

Tooltip.displayName = 'Tooltip';
