import { forwardRef, useCallback } from 'react';
import { Table } from '@chakra-ui/react';

import { TableContainerProps } from './Table.types';
import { TableProvider, useTableContext } from './TableContext';

// 실제 테이블 컨테이너 컴포넌트
const TableContainerInner = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ children, ...rest }, ref) => {
    const { setContainerRef } = useTableContext();

    // ref 설정 콜백 - 외부 ref와 내부 ref 결합
    const handleRef = useCallback(
      (node: HTMLDivElement | null) => {
        // 외부 ref 설정
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }

        // 내부 컨텍스트 ref 설정
        setContainerRef(node);
      },
      [ref, setContainerRef]
    );

    return (
      <Table.ScrollArea
        border="1px solid"
        borderRadius="md"
        borderColor="gray.200"
        ref={handleRef}
        {...rest}
      >
        {children}
      </Table.ScrollArea>
    );
  }
);

TableContainerInner.displayName = 'TableContainerInner';

// 외부 노출용 컴포넌트
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  (props, ref) => {
    return (
      <TableProvider>
        <TableContainerInner {...props} ref={ref} />
      </TableProvider>
    );
  }
);

TableContainer.displayName = 'TableContainer';
