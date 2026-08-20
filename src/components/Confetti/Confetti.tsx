import { ForwardedRef, forwardRef, useMemo } from 'react';
import { Box } from '@chakra-ui/react';

import { MOTION_DURATION_MS } from '../../theme/motion';
import { confettiPiece } from './Confetti.styles';
import { ConfettiProps } from './Confetti.types';

/**
 * Literal hex, and the one place in this library that is deliberately off the
 * palette.
 *
 * The first version reached for `primary.main` / `success.main` /
 * `warning.main` / `danger.main`, which was wrong twice over. **Semantically**,
 * those colours mean things: raining the error red and the warning amber over
 * "payment complete" says something the screen does not. Confetti is the one
 * element on a page with nothing to communicate, so a colour that communicates
 * is the wrong kind of colour.
 *
 * **And optically**, the palette is built for interface legibility — text and
 * controls on a light surface — so it sits dark and desaturated: average
 * lightness 47%, nothing above 80% saturation, and three of the five in the
 * blue range. Fifty pieces of that read as a chart legend falling. These six
 * average 56% lightness, four of them are fully saturated, and they span the
 * whole wheel (9°–330°), which is what makes a burst read as a burst.
 *
 * The cost, stated rather than hidden: these do not follow a re-theme, and they
 * do not adapt to dark mode — a bright hex on a dark surface is brighter still.
 * That is acceptable for a burst that lasts two seconds and carries no
 * information, and it is why `colors` is a prop: an app that needs its own
 * festival palette passes one.
 */
const DEFAULT_COLORS = [
  '#FFD700', // gold
  '#FF69B4', // hot pink
  '#00CED1', // turquoise
  '#FF6347', // tomato
  '#9370DB', // medium purple
  '#32CD32', // lime
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
 * **The token sets the pace; each piece scales it.** Where a piece starts, how
 * far it drifts, which way it tumbles, what colour it is and *how fast it
 * falls* are all per-piece — equal fall speed is the one thing debris never
 * has, and fifty pieces at an identical rate read as one sheet. But the rate is
 * a bounded multiple of `motion.celebrate.fall` rather than an open interval,
 * so the burst still has a computable end. FactChat's version uses
 * `2 + Math.random()` seconds with no ceiling, which is the part that makes a
 * burst impossible to schedule anything after.
 *
 * The delay is random too, not indexed. An earlier pass here reused the
 * `stagger` step, which was a mistake worth naming: a list has an order the eye
 * follows, and a delay that grows with the index is a *rhythm*. Confetti has no
 * order, so the same delay reads as a wave sweeping across the container —
 * fifty pieces queueing rather than bursting.
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
        // Two full turns, and only the direction is random. A magnitude that
        // varies down to near zero gives some pieces no tumble at all, which is
        // the difference between debris and a falling rectangle.
        spin: next() < 0.5 ? '-720deg' : '720deg',
        // Square, near enough. The first version varied width 6–10 and height
        // 8–14 independently, which produced pieces 2.3× taller than wide —
        // and with `radii.xs` on top of that (4px, because this theme
        // overrides Chakra's 2px for buttons and cards) a 6px-wide piece is
        // two-thirds round. A rounded oblong tumbling end over end is not a
        // fragment of paper; the team's word for it was 애벌레, caterpillar.
        width: `${8 + Math.round(next() * 4)}px`,
        height: `${8 + Math.round(next() * 5)}px`,
        // 0.85–1.3× the token. Anchored to the scale, and with a ceiling: the
        // whole burst is over by `fall × 1.3 + base`, which is knowable without
        // running it.
        rate: (0.85 + next() * 0.45).toFixed(2),
        // Random within `motion.base`, not stepped by index — see the note
        // above about why a stagger is wrong here. 300ms is wide enough that no
        // two pieces launch together and narrow enough that the burst still
        // reads as one event.
        delay: `${Math.round(next() * MOTION_DURATION_MS.base)}ms`,
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
        // Establishes the containing block the keyframe's `cqh` resolves
        // against. Without it `110cqh` falls back to the small viewport and
        // every piece leaves the screen in the first few frames.
        containerType="size"
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
                '--confetti-rate': p.rate,
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
