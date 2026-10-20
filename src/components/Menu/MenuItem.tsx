import { Menu, Spacer } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { polymorphic } from '../../types/polymorphic';
import { ItemVariant, MenuItemOwnProps } from './MenuItem.types';

const MenuItemImpl = ({
  variant = ItemVariant.Default,
  value,
  children,
  icon,
  rightIcon,
  ...rest
}: MenuItemOwnProps) => {
  const isDangerVariant = variant === ItemVariant.Danger;

  return (
    <Menu.Item
      value={value}
      // Map item text/hover onto semantic tokens so they flip with the mode.
      color={isDangerVariant ? 'danger.fg' : 'fg.muted'}
      py={2}
      minW="fit-content"
      fontWeight="semibold"
      gap={3}
      cursor="pointer"
      // Same as `Button`: the style prop outranks the recipe's disabled cursor.
      _disabled={{ cursor: 'not-allowed' }}
      _hover={{
        color: isDangerVariant ? 'danger.fg' : 'fg.default',
        backgroundColor: isDangerVariant ? 'danger.bg' : 'primary.wash',
      }}
      {...focusRing}
      {...rest}
    >
      {icon}
      {children}
      {rightIcon && <Spacer />}
      {rightIcon}
    </Menu.Item>
  );
};

/** Type-level polymorphism over the same runtime — see the note on `Button`. */
MenuItemImpl.displayName = 'MenuItem';

export const MenuItem = polymorphic<MenuItemOwnProps, 'div'>(MenuItemImpl);
