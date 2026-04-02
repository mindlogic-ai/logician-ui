import { forwardRef } from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';

import { SwitchProps } from './Switch.types';
import { SwitchControl } from './SwitchControl';
import { SwitchLabel } from './SwitchLabel';

const SwitchBase = forwardRef<
  React.ComponentRef<typeof ChakraSwitch.Root>,
  SwitchProps
>(({ id, children, ...props }, ref) => (
  <ChakraSwitch.Root ref={ref} colorPalette="primary" {...props}>
    <ChakraSwitch.HiddenInput id={id} />
    {children}
  </ChakraSwitch.Root>
));
SwitchBase.displayName = 'Switch';

export const Switch = Object.assign(SwitchBase, {
  Control: SwitchControl,
  Label: SwitchLabel,
});
