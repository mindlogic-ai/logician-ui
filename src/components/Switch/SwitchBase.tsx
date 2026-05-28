import { forwardRef } from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';

import { SwitchProps } from './Switch.types';

export const SwitchBase = forwardRef<
  React.ComponentRef<typeof ChakraSwitch.Root>,
  SwitchProps
>(({ id, children, ...props }, ref) => (
  <ChakraSwitch.Root
    ref={ref}
    colorPalette="primary"
    cursor="pointer"
    _disabled={{ cursor: 'not-allowed' }}
    {...props}
  >
    <ChakraSwitch.HiddenInput id={id} />
    {children}
  </ChakraSwitch.Root>
));
SwitchBase.displayName = 'Switch';
