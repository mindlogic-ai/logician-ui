import { Table } from '@chakra-ui/react';

export const Thead = ({ ...rest }: Table.HeaderProps) => {
  return <Table.Header color="fg.muted" fontWeight="medium" {...rest} />;
};
