import { FlexProps } from '@chakra-ui/react';

// Omit 'direction' as it conflicts with Grid's direction prop (ltr/rtl vs flex-direction)
export interface MasonryProps extends Omit<FlexProps, 'gap' | 'direction'> {
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
