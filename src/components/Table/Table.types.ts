import { Table } from '@chakra-ui/react';

import { StickyDirection } from './Table.styles';

type ChakraTableScrollAreaProps = React.ComponentProps<typeof Table.ScrollArea>;
type ChakraTableCellProps = React.ComponentProps<typeof Table.Cell>;

export interface TableContainerProps extends ChakraTableScrollAreaProps {
  children: React.ReactNode;
}

export interface TableCellProps extends ChakraTableCellProps {
  isSticky?: boolean;
  stickyDirection?: StickyDirection;
  stickyIndex?: number;
}
