import type { SystemStyleObject } from '@chakra-ui/react';

import type { BoopGesture } from './Boop.types';

/**
 * The three ways a boop can move, and nothing else.
 *
 * A boop is a hover that answers. It is the smallest motion in the set and the
 * only one tied to the pointer, which is why it is a transition rather than a
 * keyframe: there is a state to be in (hovered) and a state to return to, and
 * that is exactly what a transition expresses.
 *
 * `overshoot` is what makes travel this small readable. The amplitudes are
 * deliberately under what reads as a move — on `standard` the same values read
 * as a rendering hiccup rather than as a response.
 *
 * Removed under reduced motion rather than shortened. A boop carries no
 * information: it acknowledges a pointer that is already over the thing, and
 * the hover state itself (cursor, colour) says the same with no movement.
 */
const GESTURES: Record<BoopGesture, SystemStyleObject> = {
  tilt: { rotate: '18deg' },
  grow: { scale: '1.3' },
  lift: { translate: '0 -5px', rotate: '-8deg' },
};

/**
 * What "not booped" is, per property a gesture can set.
 *
 * `rotate: 'none'` is valid CSS and Chakra's `rotate` utility drops it: the
 * emitted reduced-motion rule came out carrying `scale` and `translate` and no
 * `rotate` at all, so the tilt still snapped to 18deg. `0deg` survives the
 * utility. Checked by reading the rule out of `document.styleSheets` in
 * Storybook, because the style object looked correct either way.
 */
const REST = {
  rotate: '0deg',
  scale: 'none',
  translate: 'none',
} satisfies SystemStyleObject;

export const boop = (gesture: BoopGesture): SystemStyleObject => ({
  display: 'inline-flex',
  transitionProperty: 'rotate, scale, translate',
  transitionDuration: 'motion.base',
  transitionTimingFunction: 'overshoot',
  _hover: GESTURES[gesture],
  // `_hover: {}` emits no declarations, so the base hover rule survives and
  // the gesture lands in one frame instead of being removed. Measured in
  // Storybook: with `transitionProperty: none` and an empty hover, `rotate`
  // still read 18deg on hover. An instant snap is the one outcome worse than
  // the eased one, so every property a gesture can set is reset by name.
  _motionReduce: { transitionProperty: 'none', _hover: REST },
});

/** The resting values the reduced-motion hover has to restore, for its test. */
export const BOOP_REST = REST;
