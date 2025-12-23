import { ReactNode } from 'react';
import { Menu } from '@chakra-ui/react';

import { ItemVariant, MenuItemProps } from './MenuItem.types';

type MenuItemBaseProps = React.ComponentProps<typeof Menu.Item>;

// Extended type for Chakra v3 Menu.Item
type ExtendedMenuItemProps = MenuItemBaseProps & {
  children?: ReactNode;
  color?: string;
  iconSpacing?: number;
  fontSize?: string;
  borderRadius?: string;
  py?: number;
  minW?: string;
  fontWeight?: string;
  gap?: number;
  _hover?: Record<string, any>;
};

const ChakraMenuItem = Menu.Item as React.FC<ExtendedMenuItemProps>;

export const MenuItem = ({
  variant = ItemVariant.Default,
  children,
  ...rest
}: MenuItemProps) => {
  const isDangerVariant = variant === ItemVariant.Danger;

  return (
    <ChakraMenuItem
      color={isDangerVariant ? 'var(--chakra-colors-danger-main)' : 'gray.1000'}
      iconSpacing={0}
      fontSize="md"
      borderRadius="sm"
      py={2}
      minW="fit-content"
      fontWeight="semibold"
      gap={3}
      _hover={{
        color: isDangerVariant
          ? 'var(--chakra-colors-danger-main)'
          : 'gray.1500',
        backgroundColor: 'gray.50',
      }}
      {...rest}
    >
      {children}
    </ChakraMenuItem>
  );
};
