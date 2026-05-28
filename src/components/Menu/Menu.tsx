import { Menu as ChakraMenu } from '@chakra-ui/react';

import { MenuBase } from './MenuBase';
import { MenuItem } from './MenuItem';
import { MenuList } from './MenuList';

export const Menu = Object.assign(MenuBase, {
  Trigger: ChakraMenu.Trigger,
  TriggerItem: ChakraMenu.TriggerItem,
  ContextTrigger: ChakraMenu.ContextTrigger,
  List: MenuList,
  Item: MenuItem,
  ItemGroup: ChakraMenu.ItemGroup,
  ItemGroupLabel: ChakraMenu.ItemGroupLabel,
  ItemCommand: ChakraMenu.ItemCommand,
  CheckboxItem: ChakraMenu.CheckboxItem,
  RadioItem: ChakraMenu.RadioItem,
  RadioItemGroup: ChakraMenu.RadioItemGroup,
  Separator: ChakraMenu.Separator,
  Arrow: ChakraMenu.Arrow,
  ArrowTip: ChakraMenu.ArrowTip,
});
