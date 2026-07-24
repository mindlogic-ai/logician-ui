import { forwardRef } from 'react';
import { Table } from '@chakra-ui/react';

import { TableCellProps } from './Table.types';

/**
 * Table header cell.
 *
 * Pass `isSticky` + `stickyDirection` to pin the column during horizontal
 * scroll. You must also give the cell a fixed width (`w`) and pinned
 * position (`left` for sticky-left, `right` for sticky-right). Use
 * `stickyOffsets()` for the cumulative-offset math when there are
 * multiple sticky columns on the same side.
 */
export const Th = forwardRef<
  HTMLTableCellElement,
  Table.ColumnHeaderProps & TableCellProps
>(({ isSticky = false, stickyDirection = 'left', ...rest }, ref) => (
  <Table.ColumnHeader
    ref={ref}
    color="inherit"
    fontWeight="inherit"
    textStyle="subtitle"
    overflow="hidden"
    textOverflow="ellipsis"
    _first={{
      '&:not(:last-child)': {
        paddingInlineStart: 4,
      },
    }}
    data-sticky={isSticky ? stickyDirection : undefined}
    {...rest}
  />
));

Th.displayName = 'Th';
