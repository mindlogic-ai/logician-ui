import { ForwardedRef, forwardRef, useEffect } from 'react';
import { Box, Portal, useBreakpointValue } from '@chakra-ui/react';

import { flyGhost } from './FlyTo.styles';
import { FlyToProps } from './FlyTo.types';

/**
 * Sends a ghost arcing from one rect to another — "this went there". A reward
 * chip flying into a balance, a file into a folder, a row into a bin.
 *
 * Mount it to fly; it calls `onDone` on landing and the caller unmounts it. The
 * caller owns the lifecycle because only the caller knows what the flight
 * means: a reward that landed has to update a balance, and that has to happen
 * when the ghost arrives rather than when it left.
 *
 * **JavaScript measures; CSS animates.** The two rects are only knowable at
 * runtime, so the distance is computed here — but it is handed to the keyframe
 * as three custom properties, and the arc itself runs on the compositor with no
 * frame loop and no animation library. FactChat's version drives the same arc
 * through framer-motion's `animate` arrays; the flight is identical and the
 * dependency is not needed.
 *
 * Under reduced motion nothing flies and `onDone` fires on the next tick, so
 * whatever the flight was sequencing still completes.
 *
 * **Adds nothing where you write it.** Unlike the wrapping primitives here, the
 * ghost renders into a portal and is positioned against the viewport, so mounting
 * it never moves the layout it was written into — and it is free to fly across
 * ancestors that clip or scroll.
 *
 * ```tsx
 * {flight && (
 *   <FlyTo from={flight.from} to={flight.to} onDone={clearFlight}>
 *     <RewardChip credit={flight.reward} />
 *   </FlyTo>
 * )}
 * ```
 */
export const FlyTo = forwardRef(
  (
    { from, to, lift = 46, onDone, children, css, ...rest }: FlyToProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const reduced = useBreakpointValue(
      { base: false, _motionReduce: true },
      { ssr: false }
    );

    useEffect(() => {
      if (reduced) onDone?.();
      // `onDone` is intentionally absent from the deps: a caller that passes an
      // inline arrow would otherwise fire the landing again on every parent
      // render, and the landing is what advances the sequence.
    }, [reduced]);

    if (reduced) return null;

    // Centre to centre. Corner to corner would land a chip that is wider than
    // its target visibly off to one side.
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    return (
      <Portal>
        <Box
          ref={ref}
          left={`${from.left}px`}
          top={`${from.top}px`}
          {...rest}
          css={[
            flyGhost,
            {
              '--fly-dx': `${Math.round(dx)}px`,
              '--fly-dy': `${Math.round(dy)}px`,
              '--fly-lift': `${lift}px`,
            },
            css,
          ]}
          onAnimationEnd={onDone}
        >
          {children}
        </Box>
      </Portal>
    );
  }
);

FlyTo.displayName = 'FlyTo';
