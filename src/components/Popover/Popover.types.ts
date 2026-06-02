import React from 'react';
import { Popover as ChakraPopover } from '@chakra-ui/react';

export type PopoverProps = Omit<
  React.ComponentPropsWithoutRef<typeof ChakraPopover.Root>,
  'children'
> & {
  baseFontSize?: string | number;
  children?: React.ReactNode;
};
