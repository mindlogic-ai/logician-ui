import { forwardRef } from 'react';
import { Switch as ChakraSwitch, SwitchControlProps } from '@chakra-ui/react';

import { disabledControl } from '@/utils/disabledControl';
import { FOCUS_RING_SHADOW, focusRing } from '@/utils/focusRing';

// Drawn as an inset shadow, not a border, so the thumb's travel and the
// track's size stay exactly what Chakra's recipe computes.
const OFF_OUTLINE = 'inset 0 0 0 1px var(--chakra-colors-border-control)';
// The disabled off outline, one step lighter than OFF_OUTLINE.
const DISABLED_OFF_OUTLINE = 'inset 0 0 0 1px var(--chakra-colors-disabled-fg)';

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
      // On is control.on with a control.onFg thumb: the role for binary on/off
      // state, not a status. With a black (light) or pale (dark) primary fill,
      // neither state carried colour, and dark-mode "on" read as light-mode
      // "off"; a green fill gives both modes one meaning. It is the same green
      // success.solid used to supply, under its own name, because "on" does
      // not mean "succeeded".
      bg="bg.surface"
      boxShadow={OFF_OUTLINE}
      _checked={{ bg: 'control.on', boxShadow: 'none' }}
      animationStyle="feedback"
      transitionProperty="background-color, box-shadow"
      // disabledControl drops the shadow, which here is the off outline, and
      // fills the track with disabled.bg. On a disabled.bg ground (a disabled
      // card or row) that left the track with no edge in either state, so only
      // the thumb showed. Off keeps an outline; on fills with disabled.fg, so
      // on and off still differ as outlined and filled, without the role colour.
      // The off outline (and the thumb, below) take the disabled greys rather
      // than border.control, so a disabled off switch does not read as an
      // enabled one.
      _disabled={{
        ...disabledControl,
        cursor: 'not-allowed',
        boxShadow: DISABLED_OFF_OUTLINE,
        _checked: { bg: 'disabled.fg', boxShadow: 'none' },
      }}
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
        // On: control.onFg, the colour for anything drawn on control.on
        // (white in light, ink in dark).
        bg="border.control"
        _checked={{ bg: 'control.onFg' }}
        // Disabled off: disabled.fgGhost, lighter than the enabled thumb. On
        // keeps control.onFg, which sits on the disabled.fg track.
        _disabled={{ bg: 'disabled.fgGhost', _checked: { bg: 'control.onFg' } }}
      />
    </ChakraSwitch.Control>
  )
);
SwitchControl.displayName = 'Switch.Control';
