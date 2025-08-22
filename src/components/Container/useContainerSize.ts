'use client';
import { useEffect, useState } from 'react';

import theme from '@/theme/index';

// TODO: make this logic smarter or use something reusable
// ratio minimum gutter on each side as decimal (i.e. 1 == 100%)
const GUTTER_RATIO = 0.1;

// TODO: optimize this so this calculation only runs once per page
export const getContainerWidth: (screenSize: number) => number = (
  screenSize
) => {
  const largestBreakpoint = Object.values(theme.breakpoints).reduce(function (
    i: number,
    j: string
  ) {
    const breakpoint = parseInt(j, 10);
    const screenThreshold = screenSize * (1 - GUTTER_RATIO * 2);
    return breakpoint < screenThreshold ? Math.max(i, breakpoint) : i;
  }, 0) as number;

  return largestBreakpoint;
};

const useContainerSize = () => {
  const [containerSize, setContainerSize] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      setContainerSize(getContainerWidth(window.innerWidth));
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return containerSize;
};

export default useContainerSize;
