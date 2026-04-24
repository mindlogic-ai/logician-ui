import { forwardRef } from 'react';
import { Table } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

export const Tbody = forwardRef<HTMLTableSectionElement, Table.BodyProps>(
  ({ css, ...props }, ref) => {
    return (
      <Table.Body
        ref={ref}
        color="gray.1500"
        fontWeight="medium"
        {...props}
        css={mergeCss(
          {
            // Remove bottom border from last row to prevent overlap with container border
            '& > tr:last-of-type > td': {
              borderBottom: 'none',
            },
          },
          css
        )}
      />
    );
  }
);

Tbody.displayName = 'Tbody';
