import { forwardRef } from 'react';
import {
  Popover as ChakraPopover,
  PopoverArrowTipProps,
} from '@chakra-ui/react';

export const PopoverArrowTip = forwardRef<HTMLDivElement, PopoverArrowTipProps>(
  (props, ref) => (
    <ChakraPopover.ArrowTip ref={ref} borderColor="border.subtle" {...props} />
  )
);
PopoverArrowTip.displayName = 'Popover.ArrowTip';
