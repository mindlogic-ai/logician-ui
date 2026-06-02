import { forwardRef } from 'react';
import {
  Menu,
  MenuContentProps as ChakraMenuContentProps,
  Portal,
} from '@chakra-ui/react';

import { ScaledContext } from '../ScaledContext';
import { useMenuContext } from './Menu.types';

export type MenuListProps = ChakraMenuContentProps & {
  portalled?: boolean;
};

export const MenuList = forwardRef<HTMLDivElement, MenuListProps>(
  ({ children, portalled = true, ...rest }, ref) => {
    const { baseFontSize } = useMenuContext();

    const content = (
      <Menu.Positioner>
        <Menu.Content
          ref={ref}
          border="1px solid"
          borderColor="border.subtle"
          borderRadius="md"
          boxShadow="0 5px 20px 1px {colors.gray.50}"
          p="1.5"
          {...rest}
        >
          <ScaledContext fontSize={baseFontSize}>{children}</ScaledContext>
        </Menu.Content>
      </Menu.Positioner>
    );

    return portalled ? <Portal>{content}</Portal> : content;
  }
);
MenuList.displayName = 'Menu.List';
