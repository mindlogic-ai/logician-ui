import { ForwardedRef, forwardRef } from 'react';
import { Skeleton as ChakraSkeleton } from '@chakra-ui/react';

import { SkeletonProps } from './SkeletonBase.types';

export const Skeleton = forwardRef(
  ({ ...rest }: SkeletonProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraSkeleton {...rest} ref={ref} />;
  },
);

Skeleton.displayName = 'Skeleton';
