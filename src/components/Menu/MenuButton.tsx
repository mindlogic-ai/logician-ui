import React, { ReactNode } from 'react';
import { Menu } from '@chakra-ui/react';

import { CustomMenuButtonProps } from './MenuButton.types';

// Extended type for Chakra v3 Menu.Trigger
type MenuTriggerProps = React.ComponentProps<typeof Menu.Trigger> & {
  children?: ReactNode;
  asChild?: boolean;
};

const MenuTrigger = Menu.Trigger as React.FC<MenuTriggerProps>;

export const MenuButton = ({ as: Component, children, ...rest }: CustomMenuButtonProps) => {
  return (
    <MenuTrigger asChild>
      <Component {...rest}>{children}</Component>
    </MenuTrigger>
  );
};
