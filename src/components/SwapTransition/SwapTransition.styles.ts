import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * The two halves of a directional swap, run in series.
 *
 * `moderate` in and `fast` out — 200 and 150 against FactChat's 220 and 160, so
 * the ratio and the feel survive and both numbers are on the scale.
 *
 * Out is quicker than in, the same asymmetry `presence` enforces and for the
 * same reason: the outgoing content is already understood and only has to clear
 * the stage, while the incoming content is what has to be read.
 *
 * But the pair is 350ms rather than `presence`'s 450ms, because here the two
 * halves run *in series* — the reader waits out both before the new content is
 * on screen, so the sum is the latency they actually feel. That is why this is
 * its own timing rather than the presence preset.
 *
 * Under reduced motion both halves collapse to nothing. The swap still happens,
 * instantly, which is the correct answer for a change the reader asked for.
 */
export const swapIn: SystemStyleObject = {
  animationName: 'swap-in',
  animationDuration: 'moderate',
  animationTimingFunction: 'emphasized',
  animationFillMode: 'both',
  _motionReduce: { animationDuration: 'motion.instant' },
};

export const swapOut: SystemStyleObject = {
  animationName: 'swap-out',
  animationDuration: 'fast',
  animationTimingFunction: 'standard',
  animationFillMode: 'both',
  _motionReduce: { animationDuration: 'motion.instant' },
};

/** Matches `swapOut`'s duration — the JS timer and the CSS clock are one value. */
export const SWAP_OUT_MS = 150;
