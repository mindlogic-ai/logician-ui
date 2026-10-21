import { ForwardedRef, forwardRef, useRef } from 'react';
import { Box } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { nudgeWiggle } from './Nudge.styles';
import { NudgeProps } from './Nudge.types';

/**
 * Leans once whenever `trigger` changes — the house "you have not done this
 * yet" gesture, for a call to action the reader has walked past.
 *
 * The third of the trigger-replayed set, and the three are kept apart on the
 * axis each already uses: `Shake` travels sideways and refuses, `Pulse` scales
 * and says something good landed, `Nudge` rotates and asks. Built from either
 * of the others it would carry that one's meaning instead — a scaled nudge
 * congratulates, a sideways one rejects.
 *
 * **Cap it at the call site.** This has no memory of its own: it fires every
 * time the value changes. A prompt that keeps arriving stops being a prompt and
 * becomes the reason someone leaves the page. Two is usually the whole budget,
 * and the first should be well after the reader has had a chance to act.
 *
 * **Never the only signal.** It is removed entirely under reduced motion, and
 * it says nothing even when it plays. Whatever it points at has to stand on its
 * own copy.
 *
 * **Not for something that just appeared.** A control that has been on screen
 * for two seconds has not been ignored yet, and a nudge that early reads as the
 * interface twitching.
 *
 * **Adds one `div` around `children`**, the way `Shake` does; layout props land
 * on that wrapper.
 *
 * ```tsx
 * const prompts = useIdlePrompts({ after: 20_000, max: 2 });
 *
 * <Nudge trigger={prompts}>
 *   <Button variant="primary">시작하기</Button>
 * </Nudge>
 * ```
 */
export const Nudge = forwardRef(
  (
    { trigger, tilt, children, css, ...rest }: NudgeProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    // A play counter rather than the trigger itself, so a value that returns to
    // one it held before still fires — the same reason `Shake` counts plays.
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
        css={
          plays.current === 0
            ? css
            : mergeCss(
                nudgeWiggle(plays.current),
                tilt === undefined
                  ? undefined
                  : { '--nudge-tilt': `${tilt}deg` },
                css
              )
        }
      >
        {children}
      </Box>
    );
  }
);

Nudge.displayName = 'Nudge';
