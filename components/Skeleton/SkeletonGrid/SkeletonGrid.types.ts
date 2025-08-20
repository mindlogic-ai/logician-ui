import { GridProps } from '@chakra-ui/react';

import { SkeletonProps } from '../Skeleton.types';

export type SkeletonGridProps = Pick<
  SkeletonProps,
  'isLoaded' | 'children' | 'onResolve'
> &
  GridProps & {
    rows?: number;
    columns?: number;
    gridItemHeight?: string;
    gridItem?: React.ReactNode;
  };
