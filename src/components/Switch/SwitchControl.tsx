import { forwardRef } from 'react';
import { Switch as ChakraSwitch, SwitchControlProps } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>(
  (props, ref) => (
    <ChakraSwitch.Control
      ref={ref}
      bg="bg.muted"
      _checked={{ bg: 'primary.main' }}
      {...focusRing}
      {...props}
    >
      <ChakraSwitch.Thumb />
    </ChakraSwitch.Control>
  )
);
SwitchControl.displayName = 'Switch.Control';
