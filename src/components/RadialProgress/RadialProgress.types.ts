import { BoxProps } from '@chakra-ui/react';

export interface Segment {
  /**
   * Colour token for the arc. Categories take `category.{hue}.fg`; a status
   * colour (`danger.solid`, …) only when the segment means that status. Hex and
   * CSS colour names still render but skip the theme (no dark mode).
   */
  color: string;
  /** Amount, in the same unit as `total`. */
  value: number;
}

export interface RadialProgressProps extends BoxProps {
  /**
   * Diameter in px; stroke, gaps and the centre text scale with it.
   * @default 200
   */
  size?: number;
  /**
   * The whole the segments are parts of, also shown as the centre number.
   * Nothing renders when it is 0 or less.
   * @default 100
   */
  total?: number;
  /** Unit after the centre number, e.g. `GB`. */
  unit?: string;
  /**
   * Arcs in order, clockwise from the top. Whatever `total` leaves over is
   * drawn as a `bg.track` arc.
   */
  segments?: Segment[];
  /** Formats the centre number, e.g. thousands separators. */
  formatTotal?: (value: number) => string | number;
}

export interface ProcessedSegment extends Segment {
  rawDegrees: number;
  needsMinimum: boolean;
  actualDegrees: number;
}

export interface SegmentAngle {
  color: string;
  start: number;
  end: number;
}
