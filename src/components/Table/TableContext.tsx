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

type ColumnWidths = Record<number, number>; // Maps index to width

interface StickyColumnInfo {
  left: ColumnWidths;
  right: ColumnWidths;
}

interface TableContextValue extends TableScrollState {
  setContainerRef: (node: HTMLDivElement | null) => void;
  registerStickyColumn: (
    direction: 'left' | 'right',
    index: number,
    width: number
  ) => void;
  /**
   * Whether a width is already known for this sticky column.
   *
   * Reads a ref, not state, so a caller can ask without subscribing to width
   * changes — body cells use it to skip measuring a column the header has
   * already measured. See {@link useRegisterStickyWidth}.
   */
  hasStickyWidth: (direction: 'left' | 'right', index: number) => boolean;
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

  // Column widths live in state (not a ref) so that a width change — a font
  // swap, a window/sidebar resize, or the columns re-flowing when the table
  // goes from fitting to overflowing — triggers a re-render and the sticky
  // offsets are recomputed. Storing them in a ref (the previous approach) meant
  // the offsets were computed once at mount and then went stale, detaching the
  // sticky columns from their real positions.
  const [stickyColumns, setStickyColumns] = useState<StickyColumnInfo>({
    left: {},
    right: {},
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

  /*
   * A ref mirror of the widths above, so `hasStickyWidth` can answer without
   * making its caller a subscriber. Every body cell subscribing to width state
   * would re-render the whole table on the first measurement of any column.
   */
  const stickyColumnsRef = useRef<StickyColumnInfo>({ left: {}, right: {} });

  const hasStickyWidth = useCallback(
    (direction: 'left' | 'right', index: number) =>
      stickyColumnsRef.current[direction][index] !== undefined,
    []
  );

  // Register a sticky column with its (measured) width. Rounds to whole pixels
  // and bails when unchanged so the ResizeObserver-driven callers can't
  // ping-pong on sub-pixel differences and spin the render loop.
  const registerStickyColumn = useCallback(
    (direction: 'left' | 'right', index: number, width: number) => {
      const rounded = Math.round(width);
      // The ref is written here rather than in an effect so `hasStickyWidth` is
      // already true for the next cell that mounts in the same commit — without
      // that, every cell of a column measures before the first state update
      // lands, which is exactly the cost this is meant to avoid.
      stickyColumnsRef.current = {
        ...stickyColumnsRef.current,
        [direction]: {
          ...stickyColumnsRef.current[direction],
          [index]: rounded,
        },
      };
      setStickyColumns((prev) => {
        const side = prev[direction];
        if (side[index] === rounded) return prev;
        return { ...prev, [direction]: { ...side, [index]: rounded } };
      });
    },
    []
  );

  // Get the offset for a sticky column based on its index and direction
  const getStickyOffset = useCallback(
    (direction: 'left' | 'right', index: number) => {
      if (index === 0) return 0;

      const widths = stickyColumns[direction];

      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += widths[i] || 0;
      }

      return offset;
    },
    [stickyColumns]
  );

  // Check if a column is the last sticky column on its side
  const isLastStickyColumn = useCallback(
    (direction: 'left' | 'right', index: number) => {
      const widths = stickyColumns[direction];

      // Find the highest registered index on this side
      let maxIndex = -1;
      for (const key of Object.keys(widths)) {
        const idx = Number(key);
        if (idx > maxIndex) maxIndex = idx;
      }

      return index === maxIndex;
    },
    [stickyColumns]
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
        hasStickyWidth,
        getStickyOffset,
        isLastStickyColumn,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
