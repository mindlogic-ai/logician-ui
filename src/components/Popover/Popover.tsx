import { Popover as ChakraPopover } from '@chakra-ui/react';

import { PopoverContent } from './PopoverContent';
import { PopoverContext, PopoverProps } from './Popover.types';

const PopoverBase = ({
  baseFontSize = '14px',
  children,
  ...props
}: PopoverProps) => (
  <PopoverContext.Provider value={{ baseFontSize }}>
    <ChakraPopover.Root {...props}>{children}</ChakraPopover.Root>
  </PopoverContext.Provider>
);
PopoverBase.displayName = 'Popover';

export const Popover = Object.assign(PopoverBase, {
  Anchor: ChakraPopover.Anchor,
  Trigger: ChakraPopover.Trigger,
  Content: PopoverContent,
  Arrow: ChakraPopover.Arrow,
  ArrowTip: ChakraPopover.ArrowTip,
  CloseTrigger: ChakraPopover.CloseTrigger,
  Header: ChakraPopover.Header,
  Body: ChakraPopover.Body,
  Title: ChakraPopover.Title,
  Description: ChakraPopover.Description,
  Footer: ChakraPopover.Footer,
});
