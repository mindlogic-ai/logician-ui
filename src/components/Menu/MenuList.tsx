import { Menu, MenuContentProps as ChakraMenuContentProps, Portal } from '@chakra-ui/react';

import { ScaledContext } from '../ScaledContext';
import { useMenuContext } from './Menu.types';

export interface MenuListProps extends ChakraMenuContentProps {}

export const MenuList = ({ children, ...rest }: MenuListProps) => {
  const { baseFontSize } = useMenuContext();

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="0 5px 20px 1px var(--chakra-colors-gray-50)"
          p="1.5"
          {...rest}
        >
          <ScaledContext fontSize={baseFontSize}>{children}</ScaledContext>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
};
