import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { Table } from '@chakra-ui/react';

import { getStickyStyles } from './Table.styles';
import { TableCellProps } from './Table.types';
import { useTableContext } from './TableContext';

type TableColumnHeaderProps = React.ComponentProps<typeof Table.ColumnHeader>;

export const Th = forwardRef<
  HTMLTableCellElement,
  TableColumnHeaderProps & TableCellProps
>(
  (
    {
      isSticky = false,
      stickyDirection = 'left',
      stickyIndex = 0,
      style,
      className,
      children,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    forwardedRef
  ) => {
    const tableContext = useTableContext();
    const measureNodeRef = useRef<HTMLTableCellElement | null>(null);
    // Use static values since useToken is removed in v3
    const fontSizeToken = '14px'; // subtitle font size
    const spacingToken = '16px'; // spacing 4 for paddingInlineStart

    // If not inside TableContext, render regular HTML th with same styles
    if (!tableContext) {
      // Extract only standard HTML props for the regular th element
      const htmlProps = {
        className,
        onClick,
        onMouseEnter,
        onMouseLeave,
        // Add other standard HTML props as needed
      };

      // Combine refs for the regular th element
      const setRefsForRegularTh = useCallback(
        (node: HTMLTableCellElement | null) => {
          // Set internal ref
          measureNodeRef.current = node;

          // Set forwarded ref
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        },
        [forwardedRef]
      );

      return (
        <th
          ref={setRefsForRegularTh}
          style={{
            color: 'inherit',
            fontWeight: 'inherit',
            fontSize: fontSizeToken,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingInlineStart: spacingToken,
            ...style,
          }}
          {...htmlProps}
        >
          {children}
        </th>
      );
    }

    const {
      registerStickyColumn,
      getStickyOffset,
      isLastStickyColumn,
      ...scrollState
    } = tableContext;

    // Update width when element is mounted and dimensions change
    useEffect(() => {
      if (isSticky && measureNodeRef.current) {
        const width = measureNodeRef.current.getBoundingClientRect().width;
        registerStickyColumn(stickyDirection, stickyIndex, width);
      }
    }, [isSticky, registerStickyColumn, stickyDirection, stickyIndex]);

    // Combine refs (forwarded ref and internal ref)
    const setRefs = useCallback(
      (node: HTMLTableCellElement | null) => {
        // Set internal ref
        measureNodeRef.current = node;

        // Set forwarded ref
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    // Get the sticky offset based on the column's position
    const stickyOffset = isSticky
      ? getStickyOffset(stickyDirection, stickyIndex)
      : 0;

    // Check if this is the last sticky column on this side
    const isLastSticky =
      isSticky && isLastStickyColumn(stickyDirection, stickyIndex);

    // Apply sticky styles with appropriate offset
    const stickyStyles = getStickyStyles(
      isSticky,
      stickyDirection,
      scrollState,
      stickyOffset,
      isLastSticky
    );

    return (
      <Table.ColumnHeader
        color="inherit"
        fontWeight="inherit"
        fontSize="subtitle"
        overflow="hidden"
        textOverflow="ellipsis"
        ref={setRefs}
        style={style}
        _first={{
          '&:not(:last-child)': {
            paddingInlineStart: 4,
          },
        }}
        {...stickyStyles}
        {...rest}
      >
        {children}
      </Table.ColumnHeader>
    );
  }
);

Th.displayName = 'Th';
