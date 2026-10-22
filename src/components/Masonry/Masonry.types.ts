import { GridProps } from '@chakra-ui/react';

export interface MasonryProps extends Omit<GridProps, 'gap'> {
  /**
   * Number of columns. A plain number, not a responsive object: for a
   * responsive count, pass the result of `useBreakpointValue`.
   */
  numCols: number;
  /**
   * Gap between items (applied to both columns and rows)
   * @default 4
   */
  gap?: number | string;
  /**
   * `false` (default): each item goes into the currently shortest column, so
   * the column heights stay balanced. `true`: items are dealt round-robin
   * across the columns (item 1 → column 1, item 2 → column 2, …), so the
   * first row reads left to right. Either way the DOM order is column by
   * column, which is the order keyboard and screen-reader users get.
   * @default false
   */
  horizontalArrangement?: boolean;
}
