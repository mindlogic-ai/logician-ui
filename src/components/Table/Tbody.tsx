import { forwardRef } from 'react';
import { mergeCss, Table } from '@chakra-ui/react';

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
