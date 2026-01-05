import { ComponentProps } from 'react';
import { Menu } from '@chakra-ui/react';

export const ItemVariant = {
  Default: 'default',
  Danger: 'danger',
} as const;

export type ItemVariant = (typeof ItemVariant)[keyof typeof ItemVariant];

export interface MenuItemProps extends Omit<
  ComponentProps<typeof Menu.Item>,
  'children'
> {
  variant?: ItemVariant | null;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}
