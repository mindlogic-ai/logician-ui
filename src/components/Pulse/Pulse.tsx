import { ForwardedRef, forwardRef, useRef } from 'react';
import { Box } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { pulsePop } from './Pulse.styles';
import { PulseProps } from './Pulse.types';

/**
 * Pops once, whenever `trigger` changes — for drawing the eye to a value that
 * just updated: a balance that grew, a badge that landed, a step that filled.
 *
 * Pure CSS. The obvious implementation reaches for an animation library, since
 * "replay this on demand" is what their imperative controls are for, but CSS
 * already has the mechanism: an element whose `key` changes is a *new* element,
 * and a new element runs its animation from the top. That is the same trick the
 * `stagger` preset uses to replay on reopen, and it is why this needs no
 * dependency, no ref plumbing and no effect.
 *
 * The first render never pops. A counter that mounts already at 12 has not just
 * become 12, and an interface that celebrates its own initial paint is noise.
 *
 * Not a `Shake`. Both replay on a trigger, and the pair has to stay apart: a
 * pulse draws the eye to something *good* that landed, a shake refuses. Swapped,
 * a refusal reads as congratulation and emphasis reads as an error the reader
 * then goes looking for.
 *
 * ```tsx
 * <Pulse trigger={balance}>
 *   <Text textStyle="h2">{balance}</Text>
 * </Pulse>
 * ```
 */
export const Pulse = forwardRef(
  (
    { trigger, peak, children, css, ...rest }: PulseProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    // A render counter rather than the trigger itself, so a value that returns
    // to one it held before still pops — `0 → 1 → 0` is two events, and keying
    // on the value would swallow the second.
    const plays = useRef(0);
    const previous = useRef(trigger);
    if (previous.current !== trigger) {
      previous.current = trigger;
      plays.current += 1;
    }

    return (
      <Box
        ref={ref}
        display="inline-flex"
        {...rest}
        // Remounts on every change, which restarts the animation. `plays` is 0
        // until the first change, so the initial mount renders the branch that
        // has no animation on it at all.
        key={plays.current}
        css={
          plays.current === 0
            ? css
            : mergeCss(
                {
                  ...pulsePop,
                  ...(peak === undefined ? {} : { '--pulse-peak': peak }),
                },
                css
              )
        }
      >
        {children}
      </Box>
    );
  }
);

Pulse.displayName = 'Pulse';
