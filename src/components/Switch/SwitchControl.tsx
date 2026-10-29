import { forwardRef } from 'react';
import { Switch as ChakraSwitch, SwitchControlProps } from '@chakra-ui/react';

import { disabledControl } from '@/utils/disabledControl';
import { FOCUS_RING_SHADOW, focusRing } from '@/utils/focusRing';

// Drawn as an inset shadow, not a border, so the thumb's travel and the
// track's size stay exactly what Chakra's recipe computes.
const OFF_OUTLINE = 'inset 0 0 0 1px var(--chakra-colors-border-control)';

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>(
  (props, ref) => (
    <ChakraSwitch.Control
      ref={ref}
      // Off is drawn the way an unchecked Checkbox is: a bg.surface track with a
      // border.control outline and a border.control thumb, each at least 3:1
      // against what it sits on (WCAG 1.4.11). The previous off state, a
      // bg.track fill with a bg.surface thumb, measured 1.3:1 (light) and
      // 1.4:1 (dark) between thumb and track, so the thumb's position, the only
      // thing that tells off from on, could not be seen.
      // On stays the self-defining primary.main fill with an fg.onPrimary
      // thumb; no hue is added (the BAZE colour guide keeps controls black).
      bg="bg.surface"
      boxShadow={OFF_OUTLINE}
      _checked={{ bg: 'success.solid', boxShadow: 'none' }}
      animationStyle="feedback"
      transitionProperty="background-color, box-shadow"
      _disabled={{ ...disabledControl, cursor: 'not-allowed' }}
      {...focusRing}
      // focusRing's shadow would replace the outline; keep both while off.
      _focusVisible={{
        ...focusRing._focusVisible,
        boxShadow: `${OFF_OUTLINE}, ${FOCUS_RING_SHADOW}`,
        _checked: { boxShadow: FOCUS_RING_SHADOW },
      }}
      {...props}
    >
      <ChakraSwitch.Thumb
        // A toggle is the metaphor of a physical switch, so the thumb settles
        // slightly past its stop rather than easing to a halt. Chakra's default
        // is `translate` over `fast` on a plain curve; `overshoot` is the one
        // curve that stays legible over the thumb's ~16px of travel, because it
        // reverses direction — `standard` vs `emphasized` would not.
        animationStyle="spring"
        transitionProperty="translate"
        // Off: border.control, the same 3:1 control token as the outline.
        // On: fg.onPrimary (cream in light, ink in dark) to match
        // Checkbox/Radio.
        bg="border.control"
        _checked={{ bg: 'success.onSolid' }}
      />
    </ChakraSwitch.Control>
  )
);
SwitchControl.displayName = 'Switch.Control';
