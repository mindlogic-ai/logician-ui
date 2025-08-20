import { BoxProps } from '@chakra-ui/react';

export interface Segment {
  /** Color value - supports hex colors, CSS color names, and Chakra UI color tokens (e.g., 'primary.500', 'red.400') */
  color: string;
  value: number;
}

export interface RadialProgressProps extends BoxProps {
  size?: number;
  total?: number;
  unit?: string;
  segments?: Segment[];
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
