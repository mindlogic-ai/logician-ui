import { Table } from '@chakra-ui/react';

import { TableHeaderProps } from './Table.types';

export const Thead = ({ sticky, ...rest }: TableHeaderProps) => {
  return <Table.Header data-sticky={sticky ? '' : undefined} {...rest} />;
};
