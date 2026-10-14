import { forwardRef } from 'react';
import { Table } from '@chakra-ui/react';

import { TableRowProps } from './Table.types';

/**
 * Table row.
 *
 * Sets `data-interactive` automatically when the row is clickable (onClick,
 * role="button", or tabIndex), which keys the hover/cursor/focus styling in
 * the table recipe — static rows never highlight. The ref is forwarded so
 * drag-and-drop rows (e.g. dnd-kit) can attach directly.
 */
export const Tr = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ state, ...rest }, ref) => {
    const isInteractive =
      rest.onClick != null || rest.role === 'button' || rest.tabIndex != null;

    return (
      <Table.Row
        ref={ref}
        h={12}
        data-interactive={isInteractive ? '' : undefined}
        data-selected={state === 'selected' ? '' : undefined}
        data-invalid={state === 'invalid' ? '' : undefined}
        data-highlighted={state === 'highlighted' ? '' : undefined}
        {...rest}
      />
    );
  }
);

Tr.displayName = 'Tr';
