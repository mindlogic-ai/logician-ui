import { Menu, Spacer } from '@chakra-ui/react';

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
      color={isDangerVariant ? 'danger.main' : 'gray.1000'}
      py={2}
      minW="fit-content"
      fontWeight="semibold"
      gap={3}
      cursor="pointer"
      _hover={{
        color: isDangerVariant ? 'danger.main' : 'gray.1500',
        backgroundColor: isDangerVariant ? 'danger.lightest' : 'gray.50',
      }}
      {...rest}
    >
      {icon && icon}
      {children}
      {rightIcon && <Spacer />}
      {rightIcon && rightIcon}
    </Menu.Item>
  );
};
