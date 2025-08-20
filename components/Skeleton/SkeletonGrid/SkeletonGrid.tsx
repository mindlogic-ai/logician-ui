import { Fragment, useEffect } from 'react';
import { Grid } from '@chakra-ui/react';

import { useLoadingContext } from '@/components/LoadingManager/LoadingContext';

import { Skeleton } from '../Skeleton';
import { SkeletonGridProps } from './SkeletonGrid.types';

export const SkeletonGrid = ({
  isLoaded: isLoadedProp,
  children,
  rows = 3,
  columns = 3,
  gridItemHeight = '150px',
  gridItem,
  onResolve,
  ...rest
}: SkeletonGridProps) => {
  const { isLoading } = useLoadingContext();

  useEffect(() => {
    if (!isLoading) {
      onResolve?.();
    }
  }, [isLoading]);

  if (!isLoading) return children;

  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4} {...rest}>
      {Array.from({ length: rows * columns }).map((_, index) =>
        gridItem ? (
          <Fragment key={`skeleton-grid-item-${index}`}>{gridItem}</Fragment>
        ) : (
          <Skeleton
            key={`skeleton-grid-item-${index}`}
            isLoaded={isLoadedProp ?? !isLoading}
            height={gridItemHeight}
            borderRadius="md"
          />
        ),
      )}
    </Grid>
  );
};
