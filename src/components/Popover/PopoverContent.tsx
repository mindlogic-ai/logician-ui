import { forwardRef } from 'react';
import {
  Popover as ChakraPopover,
  PopoverContentProps,
} from '@chakra-ui/react';

import { ScaledContext } from '../ScaledContext';
import { usePopoverContext } from './Popover.context';

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, ...props }, ref) => {
    const { baseFontSize } = usePopoverContext();

    return (
      <ChakraPopover.Positioner>
        <ChakraPopover.Content
          ref={ref}
          borderWidth="1px"
          borderColor="border.subtle"
          // Scales from its arrow's origin on the recipe's keyframes, on our
          // clock — see `presence`.
          animationStyle="presence"
          {...props}
        >
          <ScaledContext fontSize={baseFontSize}>{children}</ScaledContext>
        </ChakraPopover.Content>
      </ChakraPopover.Positioner>
    );
  }
);
PopoverContent.displayName = 'Popover.Content';
