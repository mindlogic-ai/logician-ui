import { forwardRef } from 'react';
import { Table } from '@chakra-ui/react';

type TableBodyProps = React.ComponentProps<typeof Table.Body>;

export const Tbody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => {
    return (
      <Table.Body ref={ref} color="gray.1500" fontWeight="medium" {...props} />
    );
  }
);

Tbody.displayName = 'Tbody';
