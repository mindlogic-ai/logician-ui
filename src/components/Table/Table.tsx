import React from 'react';
import { Table as ChakraTable } from '@chakra-ui/react';

export interface TableProps extends ChakraTable.RootProps {
  /**
   * Opt into the sticky-column contract: applies `table-layout: fixed`
   * and `min-width: max-content` so declared `<Th|Td isSticky w="Xem">`
   * widths are respected as hard caps. Without this, auto layout would
   * shrink pinned columns to their content width — breaking the
   * cumulative pin offsets calculated by `stickyOffsets`.
   *
   * Set when any child cell uses `isSticky`. Explicit prop instead of a
   * `:has()` selector so it doesn't depend on the CSS pipeline picking
   * up modern selectors.
   */
  stickyColumns?: boolean;
}

export const Table = ({ stickyColumns, ...rest }: TableProps) => (
  <ChakraTable.Root
    {...(stickyColumns && { tableLayout: 'fixed', minW: 'max-content' })}
    {...rest}
  />
);
