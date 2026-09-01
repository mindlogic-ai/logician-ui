import type { SystemStyleObject } from '@chakra-ui/react';

/**
 * Opening a block out of nothing.
 *
 * Through the grid track, not through `height`. `height: auto` is not
 * interpolable, which is why the framer-motion version has to measure the
 * content and animate to a pixel value; `grid-template-rows: 0fr → 1fr`
 * interpolates and gets content-height for free. The Accordion and
 * ExpandableText already open this way, so this is the library's existing
 * answer rather than a second one.
 *
 * `emphasized` — the block is arriving at a size, and that is the curve for
 * arriving at a value.
 *
 * Still a layout property every frame. That is inherent to opening to
 * content-height and is why this is for *small* blocks: a rationale under an
 * answer, a validation message under a field. Not a long list, not a table,
 * not anything with nested scrolling.
 *
 * Under reduced motion it opens instantly. The content is the information; the
 * opening is only there so the page does not appear to break under the reader's
 * eye, and an instant open does not break anything.
 */
export const revealOpen: SystemStyleObject = {
  display: 'grid',
  // The closed state, so the first painted frame is already collapsed — without
  // it the block flashes at full height before the animation's first frame.
  gridTemplateRows: '0fr',
  animationName: 'reveal-open',
  animationDuration: 'motion.base',
  animationTimingFunction: 'emphasized',
  animationFillMode: 'forwards',
  // Not optional: the child paints at its natural height from frame one and
  // spills out of the collapsed track without it.
  '& > *': { overflow: 'hidden', minHeight: 0 },
  _motionReduce: { animationDuration: 'motion.instant' },
};
