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
