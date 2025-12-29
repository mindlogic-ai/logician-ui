import { ReactNode } from 'react';
import { Menu, Portal, useToken } from '@chakra-ui/react';

type MenuContentBaseProps = React.ComponentProps<typeof Menu.Content>;
type MenuPositionerBaseProps = React.ComponentProps<typeof Menu.Positioner>;

// Extended types for Chakra v3 Menu components
type MenuContentProps = MenuContentBaseProps & {
  children?: ReactNode;
  css?: Record<string, any>;
};

type MenuPositionerProps = MenuPositionerBaseProps & {
  children?: ReactNode;
};

const MenuContent = Menu.Content as React.FC<MenuContentProps>;
const MenuPositioner = Menu.Positioner as React.FC<MenuPositionerProps>;

export interface MenuListProps extends MenuContentBaseProps {
  children?: ReactNode;
}

export const MenuList = ({ children, ...rest }: MenuListProps) => {
  const shadowColor = useToken('colors', 'gray.50');

  return (
    <Portal>
      <MenuPositioner>
        <MenuContent
          css={{
            border: '1px solid',
            borderColor: 'var(--chakra-colors-gray-200)',
            borderRadius: 'var(--chakra-radii-md)',
            boxShadow: `0 5px 20px 1px ${shadowColor}`,
            padding: 'var(--chakra-space-1-5)',
          }}
          {...rest}
        >
          {children}
        </MenuContent>
      </MenuPositioner>
    </Portal>
  );
};
