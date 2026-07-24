import { forwardRef } from 'react';
import { Table } from '@chakra-ui/react';

import { TableContainerProps } from './Table.types';

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ children, ...rest }, ref) => (
    <Table.ScrollArea
      ref={ref}
      border="1px solid"
      borderRadius="md"
      borderColor="border.subtle"
      {...rest}
    >
      {children}
    </Table.ScrollArea>
  )
);

TableContainer.displayName = 'TableContainer';
