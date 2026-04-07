import { forwardRef } from 'react';
import {
  Popover as ChakraPopover,
  PopoverContentProps,
} from '@chakra-ui/react';

import { ScaledContext } from '../ScaledContext';
import { usePopoverContext } from './Popover.types';

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, ...props }, ref) => {
    const { baseFontSize } = usePopoverContext();

    return (
      <ChakraPopover.Positioner>
        <ChakraPopover.Content
          ref={ref}
          borderWidth="1px"
          borderColor="gray.200"
          css={{ '--popover-border-color': 'var(--chakra-colors-gray-200)' }}
          {...props}
        >
          <ScaledContext fontSize={baseFontSize}>{children}</ScaledContext>
        </ChakraPopover.Content>
      </ChakraPopover.Positioner>
    );
  }
);
PopoverContent.displayName = 'Popover.Content';
