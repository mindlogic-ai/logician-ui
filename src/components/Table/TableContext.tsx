import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface TableScrollState {
  isScrollStart: boolean;
  isScrollEnd: boolean;
  isScrolling: boolean;
}

interface StickyColumnInfo {
  leftColumnWidths: Map<number, number>; // Maps index to width
  rightColumnWidths: Map<number, number>; // Maps index to width
}

interface TableContextValue extends TableScrollState {
  setContainerRef: (node: HTMLDivElement | null) => void;
  registerStickyColumn: (
    direction: 'left' | 'right',
    index: number,
    width: number
  ) => void;
  getStickyOffset: (direction: 'left' | 'right', index: number) => number;
  isLastStickyColumn: (direction: 'left' | 'right', index: number) => boolean;
}

const TableContext = createContext<TableContextValue | null>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    console.error('useTableContext must be used within a TableProvider');
  }
  return context;
};

interface TableProviderProps {
  children: ReactNode;
}

export const TableProvider: React.FC<TableProviderProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState<TableScrollState>({
    isScrollStart: true,
    isScrollEnd: false,
    isScrolling: false,
  });

  const stickyColumnsRef = useRef<StickyColumnInfo>({
    leftColumnWidths: new Map(),
    rightColumnWidths: new Map(),
  });

  // 스크롤 상태 업데이트
  const updateScrollState = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    const isScrollStart = scrollLeft <= 1;
    const isScrollEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1;

    setScrollState((prevState) => {
      // 상태가 변경된 경우에만 업데이트 (불필요한 리렌더링 방지)
      if (
        prevState.isScrollStart !== isScrollStart ||
        prevState.isScrollEnd !== isScrollEnd ||
        prevState.isScrolling !== (!isScrollStart && !isScrollEnd)
      ) {
        return {
          isScrollStart,
          isScrollEnd,
          isScrolling: !isScrollStart && !isScrollEnd,
        };
      }
      return prevState;
    });
  }, []);

  // 컨테이너 ref 설정 및 상태 업데이트
  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (node) {
        updateScrollState();
      }
    },
    [updateScrollState]
  );

  // Register a sticky column with its width
  const registerStickyColumn = useCallback(
    (direction: 'left' | 'right', index: number, width: number) => {
      if (direction === 'left') {
        stickyColumnsRef.current.leftColumnWidths.set(index, width);
      } else {
        stickyColumnsRef.current.rightColumnWidths.set(index, width);
      }
    },
    []
  );

  // Get the offset for a sticky column based on its index and direction
  const getStickyOffset = useCallback(
    (direction: 'left' | 'right', index: number) => {
      if (index === 0) return 0;

      const widthsMap =
        direction === 'left'
          ? stickyColumnsRef.current.leftColumnWidths
          : stickyColumnsRef.current.rightColumnWidths;

      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += widthsMap.get(i) || 0;
      }

      return offset;
    },
    []
  );

  // Check if a column is the last sticky column on its side
  const isLastStickyColumn = useCallback(
    (direction: 'left' | 'right', index: number) => {
      const widthsMap =
        direction === 'left'
          ? stickyColumnsRef.current.leftColumnWidths
          : stickyColumnsRef.current.rightColumnWidths;

      // Find the highest index in the map
      let maxIndex = -1;
      for (const idx of widthsMap.keys()) {
        if (idx > maxIndex) maxIndex = idx;
      }

      return index === maxIndex;
    },
    []
  );

  // 단일 useEffect에서 모든 이벤트 리스너 관리
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 스크롤 이벤트 핸들러
    const handleScroll = () => updateScrollState();

    // 리사이즈 이벤트 핸들러
    const handleResize = () => updateScrollState();

    // 이벤트 리스너 등록
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // 초기 상태 설정
    updateScrollState();

    // 클린업
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollState]);

  return (
    <TableContext.Provider
      value={{
        ...scrollState,
        setContainerRef,
        registerStickyColumn,
        getStickyOffset,
        isLastStickyColumn,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
