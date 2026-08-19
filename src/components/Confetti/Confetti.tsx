import { ForwardedRef, forwardRef, useMemo } from 'react';
import { Box } from '@chakra-ui/react';

import { MOTION_DURATION_MS, MOTION_STAGGER_MAX } from '../../theme/motion';
import { confettiPiece } from './Confetti.styles';
import { ConfettiProps } from './Confetti.types';

/** Palette-token names, so a burst re-themes with everything else. */
const DEFAULT_COLORS = [
  'primary.main',
  'success.main',
  'warning.main',
  'danger.main',
  'primary.light',
];

/**
 * A seeded generator, so one burst is stable across re-renders.
 *
 * `Math.random()` per render would re-scatter every piece whenever the parent
 * updated — and a parent that is showing a celebration is usually updating,
 * because something just finished.
 */
const scatter = (seed: number) => {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

/**
 * A one-shot celebratory burst — the thing that plays when a reward lands or a
 * purchase completes.
 *
 * Pure CSS, one class, one keyframe. Fifty pieces share `confetti-fall` and
 * differ only in the three custom properties it reads, so the burst costs one
 * style rule rather than fifty.
 *
 * **Randomness is in placement, never in time.** Where a piece starts, how far
 * it drifts, how it tumbles and what colour it is are all random, because that
 * is what makes fifty pieces read as fifty things. The *clock* is
 * `motion.celebrate` for every piece, and the only spread is a stagger of
 * `motion.stagger.step` per piece up to the usual cap. FactChat's purchase
 * confetti randomises the duration instead (2–3s each), which means the burst
 * is a different length every time it plays and nothing can be sequenced after
 * it — including the count-up it is supposed to be celebrating.
 *
 * Under reduced motion the pieces mount and stay invisible rather than being
 * branched away in JS — a burst carries no information, so removing it removes
 * nothing, and doing it in CSS keeps the decision on the same media query as
 * every other preset instead of on a hook that has to guess before hydration.
 *
 * ```tsx
 * {justPurchased && <Confetti />}
 * ```
 */
export const Confetti = forwardRef(
  (
    {
      pieceCount = 50,
      colors = DEFAULT_COLORS,
      seed = 1,
      ...rest
    }: ConfettiProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const pieces = useMemo(() => {
      const next = scatter(seed);
      return Array.from({ length: pieceCount }, (_, i) => ({
        id: i,
        left: `${next() * 100}%`,
        color: colors[Math.floor(next() * colors.length)],
        // ± half a container width of lateral travel.
        drift: `${Math.round(next() * 100 - 50)}px`,
        spin: `${Math.round(next() * 720 - 360)}deg`,
        width: `${6 + Math.round(next() * 4)}px`,
        height: `${8 + Math.round(next() * 6)}px`,
        // Capped the same way a staggered list is, and for the same reason: past
        // the cap a delay stops reading as scatter and starts reading as
        // stragglers.
        delay: `${Math.min(i, MOTION_STAGGER_MAX * 3) * MOTION_DURATION_MS.staggerStep}ms`,
      }));
    }, [pieceCount, colors, seed]);

    return (
      <Box
        ref={ref}
        position="absolute"
        inset="0"
        overflow="hidden"
        pointerEvents="none"
        aria-hidden
        {...rest}
      >
        {pieces.map((p) => (
          <Box
            key={p.id}
            css={confettiPiece}
            bg={p.color}
            left={p.left}
            w={p.width}
            h={p.height}
            style={
              {
                '--confetti-drift': p.drift,
                '--confetti-spin': p.spin,
                animationDelay: p.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </Box>
    );
  }
);

Confetti.displayName = 'Confetti';
