'use client';
import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react';

import useContainerSize from './useContainerSize';

export const Container = ({
  style,
  disableResponsive,
  ...rest
}: ContainerProps & { disableResponsive?: boolean }) => {
  const containerSize = useContainerSize();
  return (
    <ChakraContainer
      style={{
        ...style,
        ...(disableResponsive ? {} : { minWidth: `${containerSize}px` }),
      }}
      {...rest}
    />
  );
};
