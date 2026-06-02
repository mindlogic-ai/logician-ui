import React from 'react';
import { Menu as ChakraMenu } from '@chakra-ui/react';

export interface MenuContextValue {
  baseFontSize: string | number;
}

export const MenuContext = React.createContext<MenuContextValue>({
  baseFontSize: '14px',
});

export const useMenuContext = () => React.useContext(MenuContext);

export type MenuProps = React.ComponentPropsWithoutRef<
  typeof ChakraMenu.Root
> & {
  baseFontSize?: string | number;
};
