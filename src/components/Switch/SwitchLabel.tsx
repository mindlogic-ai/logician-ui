import { forwardRef } from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/react';

export const SwitchLabel = forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof ChakraSwitch.Label>
>((props, ref) => <ChakraSwitch.Label ref={ref} cursor="inherit" {...props} />);
SwitchLabel.displayName = 'Switch.Label';
