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
import { flushSync } from 'react-dom';
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
    [children]
  );

  const [itemHeights, setItemHeights] = useState<Record<string, number>>({});
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isInitialRender = useRef(true);

  // Clear refs for items that no longer exist
  const cleanupItemRefs = useCallback(() => {
    const currentKeys = childrenArray.map(
      (_, index) => `masonry-item-${index}`
    );
    Object.keys(itemRefs.current).forEach((key) => {
      if (!currentKeys.includes(key)) {
        delete itemRefs.current[key];
      }
    });
  }, [childrenArray]);

  // Measure item heights and store them only when one changed.
  //
  // The comparison runs inside the state updater so this callback does not
  // depend on `itemHeights`. When it did, every stored height gave the layout
  // effect below a new callback and ran it again. An item whose height depends
  // on the column it lands in then re-measured without end, and React threw
  // "Maximum update depth exceeded".
  const measureItemHeights = useCallback(() => {
    const measured: Record<string, number> = {};

    Object.entries(itemRefs.current).forEach(([key, ref]) => {
      // An item under `display: none` has no offsetParent and reads 0. Keep
      // its last measured height instead: storing 0 re-laid out the whole
      // Masonry every time its container was hidden and again when shown.
      if (ref && ref.offsetParent !== null) {
        measured[key] = Math.round(ref.offsetHeight);
      }
    });

    setItemHeights((prev) => {
      const hasChanges = Object.entries(measured).some(
        ([key, height]) => prev[key] !== height
      );
      return hasChanges ? { ...prev, ...measured } : prev;
    });
  }, []);

  // Setup measurements on initial render and when children change
  useLayoutEffect(() => {
    cleanupItemRefs();

    if (isInitialRender.current) {
      isInitialRender.current = false;
    }

    // Measure in the layout effect itself. A state update made here is
    // rendered before the browser paints, so the first paint already has the
    // measured layout. Deferring it (setTimeout) painted the unmeasured
    // round-robin layout first.
    measureItemHeights();
  }, [childrenArray.length, cleanupItemRefs, measureItemHeights]);

  // Set up resize observer
  useEffect(() => {
    // Clear previous observer
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    // ResizeObserver callbacks run after layout and before paint. Measuring
    // and re-rendering right here keeps the corrected layout in the same
    // frame. Deferring to the next frame painted the stale layout once, which
    // showed as items jumping columns when a hidden Masonry became visible.
    const handleResize = () => {
      flushSync(measureItemHeights);
    };

    resizeObserverRef.current = new ResizeObserver(handleResize);

    // Observe all current refs
    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) {
        resizeObserverRef.current?.observe(ref);
      }
    });

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [measureItemHeights, childrenArray.length]);

  // Create column layout with optimized distribution
  const columns = useMemo(() => {
    const colElements: ReactNode[][] = Array.from(
      { length: numCols },
      () => []
    );

    if (horizontalArrangement) {
      // Horizontal arrangement (row by row)
      childrenArray.forEach((child, index) => {
        const columnIndex = index % numCols;
        const itemKey = `masonry-item-${index}`;

        colElements[columnIndex].push(
          <Box
            key={itemKey}
            ref={(el) => {
              itemRefs.current[itemKey] = el;
            }}
            mb={gap}
            w="100%"
          >
            {cloneElement(child, { key: itemKey })}
          </Box>
        );
      });
    } else {
      // Height-balanced arrangement
      const columnHeights = Array(numCols).fill(0);

      childrenArray.forEach((child, index) => {
        // Find column with the shortest height
        const shortestColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights)
        );
        const itemKey = `masonry-item-${index}`;

        colElements[shortestColumnIndex].push(
          <Box
            key={itemKey}
            ref={(el) => {
              itemRefs.current[itemKey] = el;
            }}
            _notLast={{
              mb: gap,
            }}
            w="100%"
          >
            {cloneElement(child, { key: itemKey })}
          </Box>
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
