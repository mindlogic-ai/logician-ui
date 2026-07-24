import { forwardRef } from 'react';
import { Table } from '@chakra-ui/react';

import { TableCellProps } from './Table.types';

/**
 * Table body cell.
 *
 * Pass `isSticky` + `stickyDirection` to pin the column during horizontal
 * scroll. You must also give the cell a fixed width (`w`) and pinned
 * position (`left` for sticky-left, `right` for sticky-right). Use
 * `stickyOffsets()` for the cumulative-offset math when there are
 * multiple sticky columns on the same side.
 *
 * `wrap` opts into word-wrap for long content instead of the default
 * single-line ellipsis truncation.
 */
export const Td = forwardRef<
  HTMLTableCellElement,
  TableCellProps & { wrap?: boolean }
>(
  (
    { wrap, isSticky = false, stickyDirection = 'left', _first, ...rest },
    ref
  ) => (
    <Table.Cell
      ref={ref}
      color="inherit"
      py={3}
      overflow="hidden"
      textOverflow="ellipsis"
      _first={{
        '&:not(:last-child)': {
          paddingInlineStart: 4,
        },
        ..._first,
      }}
      {...(wrap
        ? {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }
        : {})}
      data-sticky={isSticky ? stickyDirection : undefined}
      {...rest}
    />
  )
);

Td.displayName = 'Td';
