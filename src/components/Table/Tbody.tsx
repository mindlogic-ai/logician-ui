import { forwardRef } from 'react';
import { Table } from '@chakra-ui/react';

export const Tbody = forwardRef<HTMLTableSectionElement, Table.BodyProps>(
  (props, ref) => {
    return (
      <Table.Body
        ref={ref}
        color="gray.1500"
        fontWeight="medium"
        css={{
          // Remove bottom border from last row to prevent overlap with container border
          '& > tr:last-of-type > td': {
            borderBottom: 'none',
          },
        }}
        {...props}
      />
    );
  }
);

Tbody.displayName = 'Tbody';
