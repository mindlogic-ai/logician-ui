import { Menu, Spacer } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

import { ItemVariant, MenuItemProps } from './MenuItem.types';

export const MenuItem = ({
  variant = ItemVariant.Default,
  value,
  children,
  icon,
  rightIcon,
  ...rest
}: MenuItemProps) => {
  const isDangerVariant = variant === ItemVariant.Danger;

  return (
    <Menu.Item
      value={value}
      // Map item text/hover onto semantic tokens so they flip with the mode.
      // Was gray.1000 / hover gray.1500 / hover bg gray.50 — none flipped, so
      // items rendered dim and hover went near-black on a dark menu.
      color={isDangerVariant ? 'danger.main' : 'fg.muted'}
      py={2}
      minW="fit-content"
      fontWeight="semibold"
      gap={3}
      cursor="pointer"
      _hover={{
        color: isDangerVariant ? 'danger.main' : 'fg.default',
        backgroundColor: isDangerVariant ? 'danger.lightest' : 'bg.subtle',
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
