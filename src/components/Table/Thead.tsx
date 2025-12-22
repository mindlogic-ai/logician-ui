import { Table } from '@chakra-ui/react';

type TableHeaderProps = React.ComponentProps<typeof Table.Header>;

export const Thead = ({ ...rest }: TableHeaderProps) => {
  return <Table.Header color="gray.800" fontWeight="medium" {...rest} />;
};
