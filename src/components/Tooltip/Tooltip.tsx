import { ForwardedRef, forwardRef } from 'react';
import { Tooltip as ChakraTooltip, useTheme } from '@chakra-ui/react';

import { TooltipProps } from './Tooltip.types';

export const Tooltip = forwardRef(
  ({ ...rest }: TooltipProps, ref?: ForwardedRef<HTMLDivElement>) => {
    const theme = useTheme();
    return (
      <ChakraTooltip
        bgColor="gray.1200"
        placement="top"
        fontSize={theme.fontSizes.p}
        closeOnScroll
        {...rest}
        ref={ref}
      />
    );
  }
);

Tooltip.displayName = 'Tooltip';
