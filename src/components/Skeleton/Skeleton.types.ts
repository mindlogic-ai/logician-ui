import { SkeletonProps as ChakraSkeletonProps } from '@chakra-ui/react';

export interface SkeletonProps extends ChakraSkeletonProps {
  onResolve?: () => void;
}
