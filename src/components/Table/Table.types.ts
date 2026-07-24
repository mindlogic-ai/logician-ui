import { Table } from '@chakra-ui/react';

export type StickyDirection = 'left' | 'right';

export interface TableContainerProps extends Table.ScrollAreaProps {
  children: React.ReactNode;
}

export interface TableCellProps extends Table.CellProps {
  /**
   * Mark this cell as a sticky column. You must also pass a fixed width
   * (`w`) and the pinned position (`left` for sticky-left, `right` for
   * sticky-right). Use `stickyOffsets()` for cumulative-offset math when
   * multiple columns are sticky on the same side.
   */
  isSticky?: boolean;
  /** Which edge the cell sticks to. Defaults to `left`. */
  stickyDirection?: StickyDirection;
}

export type TableRowState = 'selected' | 'invalid' | 'highlighted';

export interface TableRowProps extends Table.RowProps {
  /**
   * Row background tint, driven by the table recipe's semantic tokens
   * (`bg.selected` / `bg.invalid.subtle` / `bg.highlighted`) so it renders
   * correctly in both light and dark mode.
   */
  state?: TableRowState;
}

export interface TableHeaderProps extends Table.HeaderProps {
  /** Stick the header row to the top of the scroll container. */
  sticky?: boolean;
}
