import React from 'react';
import { Menu } from '@chakra-ui/react';

import { CustomMenuButtonProps } from './MenuButton.types';

export const MenuButton = ({
  as: Component,
  children,
  ...rest
}: CustomMenuButtonProps) => {
  return (
    <Menu.Trigger asChild>
      <Component {...rest}>{children}</Component>
    </Menu.Trigger>
  );
};
