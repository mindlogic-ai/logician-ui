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
  /**
   * One number per child, in the same order, saying how tall it is relative
   * to the others (a row count is enough). When given, each item goes into
   * the column with the smallest sum and nothing is measured. Pass it when
   * the Masonry can render while hidden (a closed popover, a tab panel):
   * a hidden item measures 0, so the columns reshuffle once it is shown.
   * Null, false and non-element children are dropped before the index is
   * taken, so build `children` and `itemWeights` from the same list.
   * Ignored when `horizontalArrangement` is true.
   */
  itemWeights?: readonly number[];
}
