import { Table } from '@chakra-ui/react';

export const Tr = ({ ...rest }: Table.RowProps) => {
  return <Table.Row h={12} {...rest} />;
};
