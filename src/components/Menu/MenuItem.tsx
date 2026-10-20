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
      // `_highlighted`, not `_hover`: Zag keeps DOM focus on the menu content
      // and marks the active row with `data-highlighted` (aria-activedescendant),
      // setting it on pointer move as well as on arrow keys. A `_hover`-only
      // block left keyboard navigation on Chakra's recipe `bg.emphasized/60`,
      // and the danger row never showed `danger.bg`.
      _highlighted={{
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
