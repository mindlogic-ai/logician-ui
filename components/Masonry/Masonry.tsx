import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, Flex, Grid } from '@chakra-ui/react';

import { MasonryProps } from './Masonry.types';

export const Masonry = ({
  children,
  numCols = 3,
  gap = 4,
  horizontalArrangement = false,
  ...rest
}: PropsWithChildren<MasonryProps>) => {
  const childrenArray = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );

  const [itemHeights, setItemHeights] = useState<Record<string, number>>({});
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isInitialRender = useRef(true);

  // Clear refs for items that no longer exist
  const cleanupItemRefs = useCallback(() => {
    const currentKeys = childrenArray.map(
      (_, index) => `masonry-item-${index}`,
    );
    Object.keys(itemRefs.current).forEach(key => {
      if (!currentKeys.includes(key)) {
        delete itemRefs.current[key];
      }
    });
  }, [childrenArray]);

  // Measure item heights with optimized comparison
  const measureItemHeights = useCallback(() => {
    let hasChanges = false;
    const newHeights = { ...itemHeights };

    Object.entries(itemRefs.current).forEach(([key, ref]) => {
      if (ref) {
        const height = Math.round(ref.offsetHeight);
        if (newHeights[key] !== height) {
          newHeights[key] = height;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setItemHeights(newHeights);
    }
  }, [itemHeights]);

  // Setup measurements on initial render and when children change
  useLayoutEffect(() => {
    // Use layout effect for synchronous measurement before paint
    cleanupItemRefs();

    // Measure after DOM update but before browser paint
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }

    const timer = setTimeout(measureItemHeights, 0);
    return () => clearTimeout(timer);
  }, [childrenArray.length, cleanupItemRefs, measureItemHeights]);

  // Set up resize observer
  useEffect(() => {
    // Clear previous observer
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    // Create new observer that uses throttled measurement
    let rafId: number;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureItemHeights);
    };

    resizeObserverRef.current = new ResizeObserver(handleResize);

    // Observe all current refs
    Object.values(itemRefs.current).forEach(ref => {
      if (ref) {
        resizeObserverRef.current?.observe(ref);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserverRef.current?.disconnect();
    };
  }, [measureItemHeights, childrenArray.length]);

  // Create column layout with optimized distribution
  const columns = useMemo(() => {
    const colElements: ReactNode[][] = Array.from(
      { length: numCols },
      () => [],
    );

    if (horizontalArrangement) {
      // Horizontal arrangement (row by row)
      childrenArray.forEach((child, index) => {
        const columnIndex = index % numCols;
        const itemKey = `masonry-item-${index}`;

        colElements[columnIndex].push(
          <Box
            key={itemKey}
            ref={el => {
              itemRefs.current[itemKey] = el;
            }}
            mb={gap}
            w="100%"
          >
            {cloneElement(child, { key: itemKey })}
          </Box>,
        );
      });
    } else {
      // Height-balanced arrangement
      const columnHeights = Array(numCols).fill(0);

      childrenArray.forEach((child, index) => {
        // Find column with the shortest height
        const shortestColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights),
        );
        const itemKey = `masonry-item-${index}`;

        colElements[shortestColumnIndex].push(
          <Box
            key={itemKey}
            ref={el => {
              itemRefs.current[itemKey] = el;
            }}
            _notLast={{
              mb: gap,
            }}
            w="100%"
          >
            {cloneElement(child, { key: itemKey })}
          </Box>,
        );

        // Update column height
        const itemHeight = itemHeights[itemKey] || 0;
        columnHeights[shortestColumnIndex] +=
          itemHeight + (typeof gap === 'number' ? gap : 0);
      });
    }

    return colElements;
  }, [childrenArray, numCols, horizontalArrangement, gap, itemHeights]);

  // Use Chakra UI's Grid for perfectly equal column widths
  return (
    <Grid
      width="full"
      templateColumns={`repeat(${numCols}, 1fr)`}
      gap={gap}
      {...rest}
    >
      {columns.map((colItems, i) => (
        <Flex key={`masonry-column-${i}`} direction="column" width="100%">
          {colItems}
        </Flex>
      ))}
    </Grid>
  );
};
