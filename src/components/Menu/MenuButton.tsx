import React from 'react';
import { Menu } from '@chakra-ui/react';

import { CustomMenuButtonProps } from './MenuButton.types';

export const MenuButton = ({ as: Component, children, ...rest }: CustomMenuButtonProps) => {
  return (
    // @ts-expect-error - Menu.Trigger with asChild accepts children but types are incomplete
    <Menu.Trigger asChild>
      <Component {...rest}>{children}</Component>
    </Menu.Trigger>
  );
};
