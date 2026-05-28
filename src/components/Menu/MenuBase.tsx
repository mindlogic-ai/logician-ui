import { Menu as ChakraMenu } from '@chakra-ui/react';

import { MenuContext, MenuProps } from './Menu.types';

export const MenuBase = ({
  baseFontSize = '14px',
  children,
  ...props
}: MenuProps) => (
  <MenuContext.Provider value={{ baseFontSize }}>
    <ChakraMenu.Root {...props}>{children}</ChakraMenu.Root>
  </MenuContext.Provider>
);
MenuBase.displayName = 'Menu';
