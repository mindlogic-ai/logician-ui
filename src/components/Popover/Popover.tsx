import { Popover as ChakraPopover } from '@chakra-ui/react';

import { PopoverArrowTip } from './PopoverArrowTip';
import { PopoverBase } from './PopoverBase';
import { PopoverContent } from './PopoverContent';

export const Popover = Object.assign(PopoverBase, {
  Anchor: ChakraPopover.Anchor,
  Trigger: ChakraPopover.Trigger,
  Content: PopoverContent,
  Arrow: ChakraPopover.Arrow,
  ArrowTip: PopoverArrowTip,
  CloseTrigger: ChakraPopover.CloseTrigger,
  Header: ChakraPopover.Header,
  Body: ChakraPopover.Body,
  Title: ChakraPopover.Title,
  Description: ChakraPopover.Description,
  Footer: ChakraPopover.Footer,
});
