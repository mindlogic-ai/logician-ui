import type { ElementType } from 'react';
import { MenuItemProps as ChakraMenuItemProps } from '@chakra-ui/react';

// Relative, NOT `@/types/*`. Path aliases survive into the emitted `.d.ts` and
// resolve against the CONSUMER's tsconfig, which silently degrades the type to
// `any`. See `src/types/polymorphic.ts`.
import type { PolymorphicProps } from '../../types/polymorphic';

export const ItemVariant = {
  Default: 'default',
  Danger: 'danger',
} as const;

export type ItemVariant = (typeof ItemVariant)[keyof typeof ItemVariant];

export type MenuItemOwnProps = Omit<ChakraMenuItemProps, 'as'> & {
  value: string; // Required in Chakra v3 for menu item identification
  variant?: ItemVariant | null;
  icon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

/**
 * Props for `MenuItem`, typed for whatever element `as` renders.
 *
 * A menu item that navigates is the single most common `as` site in a menu —
 * rendering it as a real link is also the accessible choice, since it keeps
 * middle-click and "open in new tab" working. Defaults to `'div'` (what
 * Chakra's `Menu.Item` renders), so bare `MenuItemProps` is unchanged.
 *
 * ```tsx
 * <MenuItem value="admin" as={NextLink} href="/admin" target="_blank">관리자</MenuItem>
 * ```
 */
export type MenuItemProps<TElement extends ElementType = 'div'> =
  PolymorphicProps<TElement, MenuItemOwnProps>;
