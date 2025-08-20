import {
  TableCellProps as ChakraTableCellProps,
  TableContainerProps as ChakraTableContainerProps,
} from '@chakra-ui/react';

import { StickyDirection } from './Table.styles';

export interface TableContainerProps extends ChakraTableContainerProps {
  children: React.ReactNode;
}

export interface TableCellProps extends ChakraTableCellProps {
  isSticky?: boolean;
  stickyDirection?: StickyDirection;
  stickyIndex?: number;
}
