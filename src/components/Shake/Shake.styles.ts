import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * The refusal gesture.
 *
 * `motion.base` rather than FactChat's literal 360ms — 60ms adrift and on the
 * scale. Its own comment names the ceiling this has to stay under: past ~450ms
 * a shake stops saying "no" and starts saying "broken".
 *
 * `standard`, deliberately not `overshoot`. Overshoot passes the target and
 * comes back, which reads as bounce, and a bouncy refusal reads as playful.
 * The decay is in the keyframe instead, where it settles *to* centre rather
 * than through it.
 *
 * Removed entirely under reduced motion — and that is why a shake must never be
 * the only signal. Pair it with colour, an icon, or copy that says the same
 * thing, because for some readers this simply will not happen.
 */
/**
 * A function of the play count — see `pulsePop` for why. The stake is higher
 * here: a shake fires on a refusal, so the remount the earlier version used to
 * replay it would drop the keyboard focus of the person who just got told no.
 */
export const shakeX = (play: number): SystemStyleObject => ({
  animationName: play % 2 === 0 ? 'shake-x-alt' : 'shake-x',
  animationDuration: 'motion.base',
  animationTimingFunction: 'standard',
  animationFillMode: 'both',
  transformOrigin: 'center',
  _motionReduce: { animationName: 'none' },
});
