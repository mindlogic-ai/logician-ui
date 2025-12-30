import { cloneElement, ForwardedRef, forwardRef, isValidElement } from 'react';
import { Portal, Tooltip as ChakraTooltip } from '@chakra-ui/react';

import { TooltipProps } from './Tooltip.types';

export const Tooltip = forwardRef(
  (
    {
      children,
      label,
      content,
      open,
      onOpenChange,
      placement = 'top',
      disabled,
      showArrow = false,
      contentProps,
      arrowProps,
      // v2 backward compatibility
      isDisabled,
      isOpen,
      hasArrow,
      ...rest
    }: TooltipProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    // Support both v2 and v3 prop names
    const isTooltipDisabled = disabled ?? isDisabled;
    const isTooltipOpen = open ?? isOpen;
    const shouldShowArrow = hasArrow ?? showArrow;
    const tooltipContent = content ?? label;

    if (isTooltipDisabled) {
      return <>{children}</>;
    }

    return (
      <ChakraTooltip.Root
        positioning={{ placement }}
        closeOnScroll
        open={isTooltipOpen}
        onOpenChange={onOpenChange}
        openDelay={200}
        closeDelay={0}
        {...rest}
      >
        <ChakraTooltip.Trigger asChild>
          {isValidElement(children)
            ? cloneElement(children as React.ReactElement<any>)
            : children}
        </ChakraTooltip.Trigger>
        <Portal>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content
              ref={ref}
              bgColor="gray.1200"
              color="white"
              fontSize="sm"
              px={2}
              py={1}
              borderRadius="md"
              maxW="320px"
              {...contentProps}
            >
              {shouldShowArrow && (
                <ChakraTooltip.Arrow {...arrowProps}>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {tooltipContent}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    );
  }
);

Tooltip.displayName = 'Tooltip';
