import { useEffect, useRef } from 'react';
import { Table } from '@chakra-ui/react';

import { getStickyStyles } from './Table.styles';
import { TableCellProps } from './Table.types';
import { useTableContext } from './TableContext';

export const Td = ({
  wrap,
  isSticky = false,
  stickyDirection = 'left',
  stickyIndex = 0,
  _first,
  style,
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: TableCellProps & { wrap?: boolean }) => {
  const cellRef = useRef<HTMLTableCellElement>(null);
  const tableContext = useTableContext();

  // Use static values since useToken is removed in v3
  const grayColor = '#E2E8F0'; // gray.300
  const paddingToken = '12px'; // py={3} equivalent
  const fontSizeToken = '16px'; // p font size
  const spacingToken = '16px'; // spacing 4 for paddingInlineStart

  // If not inside TableContext, render regular HTML td with same styles
  if (!tableContext) {
    // Extract only standard HTML props for the regular td element
    const htmlProps = {
      className,
      onClick,
      onMouseEnter,
      onMouseLeave,
      // Add other standard HTML props as needed
    };

    return (
      <td
        ref={cellRef}
        style={{
          border: 0,
          borderTop: '1px solid',
          borderTopColor: grayColor,
          color: 'inherit',
          fontSize: fontSizeToken,
          paddingTop: paddingToken,
          paddingBottom: paddingToken,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingInlineStart: _first ? spacingToken : undefined,
          ...(wrap
            ? {
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
              }
            : {}),
          ...style,
        }}
        {...htmlProps}
      >
        {children}
      </td>
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
    if (isSticky && cellRef.current) {
      const width = cellRef.current.getBoundingClientRect().width;
      registerStickyColumn(stickyDirection, stickyIndex, width);
    }
  }, [isSticky, registerStickyColumn, stickyDirection, stickyIndex]);

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
    <Table.Cell
      border={0}
      borderTop="1px solid"
      borderTopColor="gray.300"
      color="inherit"
      fontSize="p"
      py={3}
      overflow="hidden"
      textOverflow="ellipsis"
      ref={cellRef}
      style={style}
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
      {...stickyStyles}
      {...rest}
    >
      {children}
    </Table.Cell>
  );
};

Td.displayName = 'Td';
