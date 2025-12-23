import { ReactNode } from 'react';
import { Menu } from '@chakra-ui/react';

type ChakraMenuItemProps = React.ComponentProps<typeof Menu.Item>;

export const ItemVariant = {
  Default: 'default',
  Danger: 'danger',
} as const;

export type ItemVariant = (typeof ItemVariant)[keyof typeof ItemVariant];

export interface MenuItemProps extends Omit<ChakraMenuItemProps, 'children'> {
  variant?: ItemVariant | null;
  onClick?: () => void;
  children?: ReactNode;
  icon?: ReactNode;
}
