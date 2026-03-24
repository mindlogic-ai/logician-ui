import { cloneElement, ForwardedRef, forwardRef, isValidElement } from 'react';
import { Portal, Tooltip as ChakraTooltip } from '@chakra-ui/react';

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
        openDelay={200}
        closeDelay={0}
        {...rest}
      >
        <ChakraTooltip.Trigger {...triggerProps}>
          {isValidElement(children)
            ? cloneElement(children as React.ReactElement<any>)
            : children}
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
              css={{
                '--tooltip-bg': 'var(--chakra-colors-gray-1200)',
              }}
              {...contentProps}
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
