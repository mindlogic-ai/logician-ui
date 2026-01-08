import { Table } from '@chakra-ui/react';

export const Thead = ({ ...rest }: Table.HeaderProps) => {
  return <Table.Header color="gray.800" fontWeight="medium" {...rest} />;
};
