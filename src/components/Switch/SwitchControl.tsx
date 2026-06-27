import { forwardRef } from 'react';
import { Switch as ChakraSwitch, SwitchControlProps } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>(
  (props, ref) => (
    <ChakraSwitch.Control
      ref={ref}
      bg="bg.muted"
      // The off-state track (bg.muted, gray.100) is only ~1.03:1 against the
      // bg.sunken page wash (gray.50), so the control nearly vanishes on a
      // sunken page. A hairline border.subtle ring defines its bounds; the
      // checked (primary.main) fill is self-defining, so the ring drops then.
      // Box-shadow ring (not border) keeps the thumb track sizing intact, and
      // focusRing's _focusVisible box-shadow takes over on keyboard focus.
      boxShadow="0 0 0 1px var(--chakra-colors-border-subtle)"
      _checked={{ bg: 'primary.main', boxShadow: 'none' }}
      {...focusRing}
      {...props}
    >
      <ChakraSwitch.Thumb />
    </ChakraSwitch.Control>
  )
);
SwitchControl.displayName = 'Switch.Control';
