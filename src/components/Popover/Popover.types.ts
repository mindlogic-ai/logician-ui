import React from 'react';
import { Popover as ChakraPopover } from '@chakra-ui/react';

export interface PopoverContextValue {
  baseFontSize: string | number;
}

export const PopoverContext = React.createContext<PopoverContextValue>({
  baseFontSize: '14px',
});

export const usePopoverContext = () => React.useContext(PopoverContext);

export type PopoverProps = React.ComponentPropsWithoutRef<
  typeof ChakraPopover.Root
> & {
  baseFontSize?: string | number;
};
