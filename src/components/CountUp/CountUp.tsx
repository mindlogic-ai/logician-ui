import { ForwardedRef, forwardRef, useEffect, useReducer, useRef } from 'react';
import { chakra, useBreakpointValue } from '@chakra-ui/react';

import { cubicBezier } from '@/utils/cubicBezier';

import { MOTION_DURATION_MS } from '../../theme/motion';
import { CountUpProps } from './CountUp.types';

/** Comma-grouped, which is what a balance is read as. */
const groupDigits = (n: number) => Math.round(n).toLocaleString('en-US');

const ease = cubicBezier('emphasized');

/**
 * Counts a number up to `to` — for a balance that just grew, a total that just
 * settled, a KPI that just refreshed.
 *
 * The only thing in the motion layer that CSS cannot animate at all: a number
 * is text, and text content is not an animatable property. So this interpolates
 * in JavaScript — and then reads the *same* curve CSS would have used, through
 * {@link cubicBezier}, rather than inventing an ease-out for the occasion.
 *
 * `motion.slower` is the default and is the top of the response scale on
 * purpose. FactChat's purchase modal counts for 1500ms after a 1000ms delay,
 * which is two and a half seconds of a modal that has already told the reader
 * the answer in its heading. A count-up is a flourish on a number that is
 * already known; past ~700ms it stops reading as earned and starts reading as
 * something to wait out.
 *
 * Under reduced motion the final value renders immediately — the number is the
 * information, and the count is the decoration.
 *
 * **Renders a single `<span>` and wraps nothing.** The other primitives here put
 * a wrapper around their children; this one takes no children and *is* the
 * element, so it drops into running text or a heading with nothing in between.
 *
 * ```tsx
 * <CountUp from={previousBalance} to={balance} />
 * ```
 */
export const CountUp = forwardRef(
  (
    {
      to,
      from,
      durationMs = MOTION_DURATION_MS.slower,
      delayMs = 0,
      format = groupDigits,
      onEnd,
      ...rest
    }: CountUpProps,
    ref?: ForwardedRef<HTMLSpanElement>
  ) => {
    // Chakra resolves this from the same media query the `_motionReduce`
    // condition compiles to, so the JS branch and the CSS branch cannot drift.
    const reduced = useBreakpointValue(
      { base: false, _motionReduce: true },
      { ssr: false }
    );

    // The displayed value lives in a ref and paints through a forced render, so
    // the ~60 frames of a count do not each rebuild the subtree. Only this node
    // re-renders, and only its text changes.
    const shown = useRef(from ?? to);
    const [, repaint] = useReducer((n: number) => n + 1, 0);

    // Read inside the effect rather than listed as dependencies: a caller that
    // rebuilds `format` inline every render would otherwise restart the count
    // on every parent render.
    const latest = useRef({ format, onEnd, durationMs, delayMs });
    latest.current = { format, onEnd, durationMs, delayMs };

    useEffect(() => {
      const start = shown.current;
      if (reduced || start === to) {
        shown.current = to;
        repaint();
        latest.current.onEnd?.();
        return;
      }

      const { durationMs: ms, delayMs: delay } = latest.current;
      let frame = 0;
      let began = 0;

      const step = (now: number) => {
        if (!began) began = now;
        const elapsed = now - began - delay;

        if (elapsed < 0) {
          frame = requestAnimationFrame(step);
          return;
        }
        if (elapsed >= ms) {
          shown.current = to;
          repaint();
          latest.current.onEnd?.();
          return;
        }

        shown.current = start + (to - start) * ease(elapsed / ms);
        repaint();
        frame = requestAnimationFrame(step);
      };

      frame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frame);
      // `from` is a starting value, not a target: changing it mid-count would
      // restart from a number the reader never saw. Later counts pick up from
      // wherever the last one landed, which is what makes a second reward read
      // as adding to the first.
    }, [to, reduced]);

    return (
      <chakra.span ref={ref} fontVariantNumeric="tabular-nums" {...rest}>
        {format(shown.current)}
      </chakra.span>
    );
  }
);

CountUp.displayName = 'CountUp';
