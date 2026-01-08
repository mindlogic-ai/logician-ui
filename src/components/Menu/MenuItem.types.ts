import { MenuItemProps as ChakraMenuItemProps } from '@chakra-ui/react';

export const ItemVariant = {
  Default: 'default',
  Danger: 'danger',
} as const;

export type ItemVariant = (typeof ItemVariant)[keyof typeof ItemVariant];

export interface MenuItemProps extends ChakraMenuItemProps {
  value: string; // Required in Chakra v3 for menu item identification
  variant?: ItemVariant | null;
  onClick?: () => void;
  icon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}
