import type { ElementType } from 'react';
import { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';

import type { PolymorphicProps } from '../../types/polymorphic';

// Re-export Button types for consistency
export type { ButtonVariant } from '../Button/Button.types';

/**
 * @deprecated 5.0 removed the colour axis — `colorPalette` is no longer an
 * IconButton prop. Use a `variant` role (and `isDestructive`). Kept only so
 * existing type imports get a deprecation instead of a hard error.
 */
export type IconButtonColorPalette =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * IconButton variant (5.0 BAZE palette).
 *
 * - `ghost` (default): icon in `fg.icon`, warm wash on hover
 * - `secondary`: same, with a `border.default` outline
 * - `primary`: BAZE black fill
 * - `danger`: red fill
 * - `action`: the coral SEND button (`send.*`) — chat composers
 */
export type IconButtonVariant =
  | 'ghost'
  | 'secondary'
  | 'primary'
  | 'danger'
  | 'action';

/**
 * IconButton props.
 *
 * @note Overrides Chakra UI's `variant`; Chakra's `colorPalette` /
 *       `colorScheme` are not accepted.
 *
 * @example
 * ```tsx
 * <IconButton aria-label="닫기"><XIcon /></IconButton>
 * <IconButton aria-label="삭제" isDestructive><TrashIcon /></IconButton>
 * <IconButton aria-label="보내기" variant="action"><ArrowUpIcon /></IconButton>
 * ```
 */
export type IconButtonOwnProps = Omit<
  ChakraIconButtonProps,
  'variant' | 'colorPalette' | 'colorScheme' | 'icon' | 'as'
> & {
  /**
   * The role of the icon button.
   * Overrides Chakra UI's variant prop.
   * @default 'ghost'
   */
  variant?: IconButtonVariant;
  /**
   * Danger-coloured icon (`danger.fg`) for `ghost` / `secondary` — a delete
   * icon in a row. Ignored on filled variants.
   * @default false
   */
  isDestructive?: boolean;
};

/**
 * Props for `IconButton`, typed for whatever element `as` renders.
 *
 * Defaults to `'button'`, so `IconButtonProps` on its own is unchanged. Same
 * shape and same reasoning as `ButtonProps` — see `Button.types.ts` and
 * `src/types/polymorphic.ts`.
 *
 * ```tsx
 * <IconButton as="a" href={file} download aria-label="내려받기"><Icon /></IconButton>
 * ```
 */
export type IconButtonProps<TElement extends ElementType = 'button'> =
  PolymorphicProps<TElement, IconButtonOwnProps>;
