'use client';
import { Container as ChakraContainer } from '@chakra-ui/react';

import { polymorphic } from '../../types/polymorphic';
import { ContainerOwnProps } from './Container.types';
import useContainerSize from './useContainerSize';

const ContainerImpl = ({
  style,
  disableResponsive,
  ...rest
}: ContainerOwnProps) => {
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

ContainerImpl.displayName = 'Container';

/** Type-level polymorphism over the same runtime — see `polymorphic`. */
export const Container = polymorphic<ContainerOwnProps, 'div'>(ContainerImpl);
