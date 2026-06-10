import { forwardRef } from 'react';
import { Table } from '@chakra-ui/react';

export const Tbody = forwardRef<HTMLTableSectionElement, Table.BodyProps>(
  (props, ref) => {
    return <Table.Body ref={ref} {...props} />;
  }
);

Tbody.displayName = 'Tbody';
