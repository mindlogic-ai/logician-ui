import { MenuItemProps as ChakraMenuItemProps } from '@chakra-ui/react';

export const ItemVariant = {
  Default: 'default',
  Danger: 'danger',
} as const;

export type ItemVariant = (typeof ItemVariant)[keyof typeof ItemVariant];

export interface MenuItemProps extends ChakraMenuItemProps {
  variant?: ItemVariant | null;
  onClick?: () => void;
}
