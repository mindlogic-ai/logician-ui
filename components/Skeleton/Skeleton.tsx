import { ForwardedRef, forwardRef, useEffect } from 'react';
import { Skeleton as ChakraSkeleton } from '@chakra-ui/react';

import { useLoadingContext } from '../LoadingManager/LoadingContext';
import { SkeletonProps } from './Skeleton.types';

export const Skeleton = forwardRef(
  (
    { isLoaded: isLoadedProp, onResolve, ...rest }: SkeletonProps,
    ref?: ForwardedRef<HTMLDivElement>,
  ) => {
    const { isLoading } = useLoadingContext();
    useEffect(() => {
      if (!isLoading) {
        onResolve?.();
      }
    }, [isLoading]);
    return (
      <ChakraSkeleton
        isLoaded={isLoadedProp ?? !isLoading}
        {...rest}
        ref={ref}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
