import { forwardRef } from 'react';
import { Switch as ChakraSwitch, SwitchControlProps } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>(
  (props, ref) => (
    <ChakraSwitch.Control
      ref={ref}
      // The off-state track is a meter surface — its extent is the information —
      // so it needs a visible fill, not just an edge. bg.muted (gray.100) is
      // only ~1.03:1 against the bg.sunken page wash (gray.50) and vanishes
      // there; bg.track (gray.300) reads as a filled track on any background.
      // The checked state is the self-defining primary.main fill.
      bg="bg.track"
      _checked={{ bg: 'primary.main' }}
      {...focusRing}
      {...props}
    >
      <ChakraSwitch.Thumb />
    </ChakraSwitch.Control>
  )
);
SwitchControl.displayName = 'Switch.Control';
