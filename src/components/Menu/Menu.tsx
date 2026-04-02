import { Menu as ChakraMenu } from '@chakra-ui/react';

import { MenuItem } from './MenuItem';
import { MenuContext, MenuProps } from './Menu.types';
import { MenuList } from './MenuList';

const MenuBase = ({ baseFontSize = '14px', children, ...props }: MenuProps) => (
  <MenuContext.Provider value={{ baseFontSize }}>
    <ChakraMenu.Root {...props}>{children}</ChakraMenu.Root>
  </MenuContext.Provider>
);
MenuBase.displayName = 'Menu';

export const Menu = Object.assign(MenuBase, {
  Trigger: ChakraMenu.Trigger,
  List: MenuList,
  Item: MenuItem,
  ItemGroup: ChakraMenu.ItemGroup,
  Separator: ChakraMenu.Separator,
});
