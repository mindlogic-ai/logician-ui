import { ComponentProps, ReactNode } from 'react';
import { Menu, Portal } from '@chakra-ui/react';

export interface MenuListProps extends Omit<
  ComponentProps<typeof Menu.Content>,
  'children'
> {
  children?: ReactNode;
}

export const MenuList = ({ children, ...rest }: MenuListProps) => {
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
          {children}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
};
