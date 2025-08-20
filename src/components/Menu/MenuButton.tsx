import React from 'react';
import { MenuButton as ChakraMenuButton } from '@chakra-ui/react';

import { CustomMenuButtonProps } from './MenuButton.types';

export const MenuButton = ({ as, ...rest }: CustomMenuButtonProps) => {
  return <ChakraMenuButton as={as} {...rest} />;
};
