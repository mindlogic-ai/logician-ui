import { ForwardedRef, forwardRef } from 'react';
import { SkeletonText as ChakraSkeletonText } from '@chakra-ui/react';

import { SkeletonTextProps } from './SkeletonText.types';

export const SkeletonText = forwardRef(
  ({ ...rest }: SkeletonTextProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <ChakraSkeletonText {...rest} ref={ref} />;
  },
);

SkeletonText.displayName = 'SkeletonText';
