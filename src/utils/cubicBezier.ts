import { MOTION_EASE, type MotionEaseToken } from '@/theme/motion';

/**
 * Turns one of the house curves into a function of progress, for motion that
 * JavaScript has to drive frame by frame.
 *
 * Most motion never needs this: CSS reads `--chakra-easings-*` and
 * framer-motion takes the `MOTION_EASE` tuples directly. What is left is the
 * handful of things neither can animate — a *number* counting up, a canvas, a
 * scroll position — where the value is interpolated in JS and the curve has to
 * be evaluated rather than declared.
 *
 * Without this, that code reaches for `easeOutCubic` off the internet, and the
 * count-up next to a card ends up on a different curve from the card. The point
 * of a scale is that the exceptions stay on it.
 *
 * **Shared rather than local, even though `CountUp` is its only caller in this
 * library.** The rule that sends a one-caller motion down next to its component
 * (`spin` → `Spinner.styles.ts`) is about compositions the library owns; this is
 * a reader of the scale, and its real audience is app code driving motion the
 * library never sees — a framer-motion `animate`, an `Element.animate`, a rAF
 * loop. Filing it under `CountUp/` would mean reaching into a component folder
 * for a curve, which is the wrong shape for the thing it is.
 *
 * ```ts
 * const ease = cubicBezier('emphasized');
 * const value = from + (to - from) * ease(elapsed / duration);
 * ```
 */
export const cubicBezier = (
  curve: MotionEaseToken | readonly [number, number, number, number]
): ((t: number) => number) => {
  const [x1, y1, x2, y2] =
    typeof curve === 'string' ? MOTION_EASE[curve] : curve;

  // The classic 1-D cubic Bézier basis with P0 = 0 and P3 = 1, so only the two
  // control coordinates vary. Written as the Horner form the browsers use.
  const a = (c1: number, c2: number) => 1 - 3 * c2 + 3 * c1;
  const b = (c1: number, c2: number) => 3 * c2 - 6 * c1;
  const c = (c1: number) => 3 * c1;

  const at = (t: number, c1: number, c2: number) =>
    ((a(c1, c2) * t + b(c1, c2)) * t + c(c1)) * t;
  const slope = (t: number, c1: number, c2: number) =>
    3 * a(c1, c2) * t * t + 2 * b(c1, c2) * t + c(c1);

  return (progress: number) => {
    // Clamp rather than extrapolate: a caller that overshoots its own clock by
    // a frame should land on the end value, not past it.
    const t = progress <= 0 ? 0 : progress >= 1 ? 1 : progress;

    // `t` is time along the curve's *x* axis, which is not the same as the
    // parameter — solve for the parameter, then read `y`. Newton-Raphson from
    // `t` itself converges in three or four steps for every curve here; the
    // guard is for the flat-slope case, where the derivative gives no direction.
    let u = t;
    for (let i = 0; i < 6; i += 1) {
      const dx = slope(u, x1, x2);
      if (Math.abs(dx) < 1e-6) break;
      const error = at(u, x1, x2) - t;
      if (Math.abs(error) < 1e-6) break;
      u -= error / dx;
    }

    // `overshoot` deliberately leaves [0, 1] in the middle — that is the whole
    // point of it — so this is not clamped.
    return at(u, y1, y2);
  };
};
