import type { BoxProps } from '@chakra-ui/react';

export interface FlyToProps extends BoxProps {
  /** Source rect in viewport coordinates, e.g. `el.getBoundingClientRect()`. */
  from: DOMRect;
  /** Target rect in viewport coordinates. */
  to: DOMRect;
  /**
   * How high the arc rises above the straight line between the two rects.
   * Defaults to 46px — enough to read as flight over a card-sized gap.
   */
  lift?: number;
  /** Called once the ghost lands, or immediately under reduced motion. */
  onDone?: () => void;
}
