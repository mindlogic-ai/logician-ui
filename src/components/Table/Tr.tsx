import { Table } from '@chakra-ui/react';

type TableRowProps = React.ComponentProps<typeof Table.Row>;

export const Tr = ({ ...rest }: TableRowProps) => {
  return <Table.Row h={12} {...rest} />;
};
