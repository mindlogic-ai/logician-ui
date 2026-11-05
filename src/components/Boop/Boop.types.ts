import type { BoxProps } from '@chakra-ui/react';

/** How the boop moves. */
export type BoopGesture = 'tilt' | 'grow' | 'lift';

export interface BoopProps extends Omit<BoxProps, 'translate'> {
  /**
   * Which way it answers. `tilt` leans, `grow` swells, `lift` hops and leans.
   * Defaults to `tilt`.
   *
   * Pick one per surface and keep it. Three icons in a row that each boop
   * differently read as three unrelated things rather than as one toolbar.
   */
  gesture?: BoopGesture;
}
