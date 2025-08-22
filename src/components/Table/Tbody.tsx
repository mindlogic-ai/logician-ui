import { forwardRef } from 'react';
import { TableBodyProps, Tbody as ChakraTbody } from '@chakra-ui/react';

export const Tbody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => {
    return (
      <ChakraTbody ref={ref} color="gray.1500" fontWeight="medium" {...props} />
    );
  }
);

Tbody.displayName = 'Tbody';
