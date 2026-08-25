import { ForwardedRef, forwardRef, useRef } from 'react';
import { Box } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { shakeX } from './Shake.styles';
import { ShakeProps } from './Shake.types';

/**
 * Shakes once whenever `trigger` changes — the house "no, not that" gesture,
 * for a rejected answer, an invalid field, a refused action.
 *
 * The counterpart to `Pulse`, and the pair has to be kept apart: both replay on
 * a trigger, but a pulse draws the eye to something *good* that landed, and a
 * shake refuses. A shake used as emphasis reads as an error the reader then goes
 * looking for.
 *
 * Replays the same way `Pulse` does — a changed `key` is a new element, and a
 * new element runs its animation from the top. The first render never shakes.
 *
 * **Never let this be the only signal.** It is removed entirely under reduced
 * motion, so for some readers nothing happens at all; pair it with colour, an
 * icon, or copy that says the same thing.
 *
 * **Adds one `div` around `children`**, and layout props land on that wrapper
 * rather than on the child. Usually the same result — but the child is no longer
 * a *direct* child of what surrounds it, so animate the inner element instead of
 * wrapping when the parent needs its children directly: a `<tr>` needs `<td>`s,
 * and Ark parts (`Menu.List`, `Tree`) walk their own children for focus and
 * typeahead.
 *
 * ```tsx
 * <Shake trigger={attempts}>
 *   <Input aria-invalid={invalid} />
 * </Shake>
 * ```
 */
export const Shake = forwardRef(
  (
    { trigger, distance, children, css, ...rest }: ShakeProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    // A play counter rather than the trigger itself, so a value that returns to
    // one it held before still fires — two rejections of the same answer are
    // two events, and keying on the value would swallow the second.
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
        key={plays.current}
        css={
          plays.current === 0
            ? css
            : mergeCss(
                shakeX,
                distance === undefined
                  ? undefined
                  : { '--shake-distance': `${distance}px` },
                css
              )
        }
      >
        {children}
      </Box>
    );
  }
);

Shake.displayName = 'Shake';
