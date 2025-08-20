import { FlexProps } from '@chakra-ui/react';

export interface MasonryProps extends Omit<FlexProps, 'gap'> {
  /**
   * Number of columns in the masonry layout
   */
  numCols: number;
  /**
   * Gap between items (applied to both columns and rows)
   * @default 4
   */
  gap?: number | string;
  /**
   * Whether to arrange items from left to right (true) or top to bottom (false)
   * @default false (arrange vertically)
   */
  horizontalArrangement?: boolean;
}
