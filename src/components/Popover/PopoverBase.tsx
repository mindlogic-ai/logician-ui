import { Popover as ChakraPopover } from '@chakra-ui/react';

import { PopoverContext } from './Popover.context';
import { PopoverProps } from './Popover.types';

export const PopoverBase = ({
  baseFontSize = '14px',
  children,
  ...props
}: PopoverProps) => (
  <PopoverContext.Provider value={{ baseFontSize }}>
    <ChakraPopover.Root {...props}>{children}</ChakraPopover.Root>
  </PopoverContext.Provider>
);
PopoverBase.displayName = 'Popover';
