import { Table } from '@chakra-ui/react';

import { StickyDirection } from './Table.styles';

export interface TableContainerProps extends Table.ScrollAreaProps {
  children: React.ReactNode;
}

export interface TableCellProps extends Table.CellProps {
  isSticky?: boolean;
  stickyDirection?: StickyDirection;
  stickyIndex?: number;
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
