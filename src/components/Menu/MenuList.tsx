import { ComponentProps, ReactNode } from 'react';
import { Menu, Portal, useToken } from '@chakra-ui/react';

export interface MenuListProps
  extends Omit<ComponentProps<typeof Menu.Content>, 'children'> {
  children?: ReactNode;
}

export const MenuList = ({ children, ...rest }: MenuListProps) => {
  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content
          css={{
            border: '1px solid',
            borderColor: 'var(--chakra-colors-gray-200)',
            borderRadius: 'var(--chakra-radii-md)',
            boxShadow: `0 5px 20px 1px ${useToken('colors', 'gray.50')}`,
            padding: 'var(--chakra-space-1.5)',
          }}
          {...rest}
        >
          {children}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
};
