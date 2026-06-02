import { ForwardedRef, forwardRef } from 'react';
import { Portal, Tooltip as ChakraTooltip } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { TooltipProps } from './Tooltip.types';

export const Tooltip = forwardRef(
  (
    {
      children,
      content,
      open,
      onOpenChange,
      placement = 'top',
      disabled,
      showArrow = false,
      triggerProps,
      contentProps,
      arrowProps,
      ...rest
    }: TooltipProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    if (disabled) {
      return <>{children}</>;
    }

    return (
      <ChakraTooltip.Root
        positioning={{ placement }}
        closeOnScroll
        open={open}
        onOpenChange={onOpenChange}
        openDelay={300}
        closeDelay={0}
        {...rest}
      >
        <ChakraTooltip.Trigger asChild {...triggerProps}>
          {children}
        </ChakraTooltip.Trigger>
        <Portal>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content
              ref={ref}
              color="white"
              fontSize="sm"
              px={2}
              py={1}
              borderRadius="md"
              maxW="320px"
              {...contentProps}
              css={mergeCss(
                { '--tooltip-bg': 'var(--chakra-colors-gray-1200)' },
                contentProps?.css
              )}
            >
              {showArrow && (
                <ChakraTooltip.Arrow {...arrowProps}>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    );
  }
);

Tooltip.displayName = 'Tooltip';
