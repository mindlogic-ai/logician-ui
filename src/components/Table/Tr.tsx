import { Table } from '@chakra-ui/react';

export const Tr = ({ ...rest }: Table.RowProps) => {
  return (
    <Table.Row
      h={12}
      _last={{
        // Remove bottom border from last row to prevent overlap with container border
        '& > td, & > th': {
          borderBottom: 'none',
        },
      }}
      {...rest}
    />
  );
};
