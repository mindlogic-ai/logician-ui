import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * The "you have not done this yet" lean.
 *
 * Kept apart from `Shake` and `Pulse` on the axis each of them already uses.
 * `Shake` travels sideways and refuses; `Pulse` scales and says something good
 * landed; this rotates and asks. Three transforms, three meanings — a nudge
 * built from either of the others would carry that one's meaning instead.
 *
 * `motion.slower` (700ms), slower than the refusal's `motion.base`. A refusal
 * has to be over before the reader looks away; an invitation is competing with
 * nothing and reads as impatient when it is quick.
 *
 * `standard` rather than `overshoot` for the same reason `Shake` avoids it: the
 * decay lives in the keyframe, which settles *to* centre rather than through
 * it, and a nudge that bounces past reads as a toy.
 *
 * Replays by alternating two byte-identical keyframes, the way `Pulse` and
 * `Shake` do, because a CSS animation restarts when its name changes. The
 * earlier `key`-driven approach remounts the subtree and drops focus, which is
 * the wrong thing to do to someone who has not acted yet.
 *
 * Removed under reduced motion. A nudge is an invitation with no content, and
 * whatever it points at has to stand on its own copy anyway.
 */
export const nudgeWiggle = (play: number): SystemStyleObject => ({
  animationName: play % 2 === 0 ? 'nudge-wiggle-alt' : 'nudge-wiggle',
  animationDuration: 'motion.slower',
  animationTimingFunction: 'standard',
  animationFillMode: 'both',
  transformOrigin: 'center',
  _motionReduce: { animationName: 'none' },
});
