import { Menu } from '@chakra-ui/react';

import { ItemVariant, MenuItemProps } from './MenuItem.types';

export const MenuItem = ({
  variant = ItemVariant.Default,
  children,
  icon,
  ...rest
}: MenuItemProps) => {
  const isDangerVariant = variant === ItemVariant.Danger;

  return (
    // @ts-expect-error - Menu.Item accepts children but types are incomplete
    <Menu.Item
      color={isDangerVariant ? 'danger.main' : 'gray.1000'}
      fontSize="p"
      borderRadius="sm"
      py={2}
      minW="fit-content"
      fontWeight="semibold"
      gap={3}
      _hover={{
        color: isDangerVariant ? 'danger.main' : 'gray.1500',
        backgroundColor: 'gray.50',
      }}
      {...rest}
    >
      {icon && icon}
      {children}
    </Menu.Item>
  );
};
