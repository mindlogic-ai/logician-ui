import { ForwardedRef, forwardRef } from 'react';
import { SkeletonCircle as ChakraSkeletonCircle } from '@chakra-ui/react';

import { SkeletonCircleProps } from './SkeletonCircle.types';

export const SkeletonCircle = forwardRef(
  ({ ...rest }: SkeletonCircleProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraSkeletonCircle width={6} height={6} {...rest} ref={ref} />;
  },
);

SkeletonCircle.displayName = 'SkeletonCircle';
