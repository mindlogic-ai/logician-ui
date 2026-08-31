import type { ElementType } from 'react';
import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

// Relative, NOT `@/types/polymorphic`. Path aliases survive into the emitted
// `.d.ts`, where they are resolved against the CONSUMER's tsconfig — so an app
// with its own `@/*` alias either binds this to its own file or fails to
// resolve it and silently degrades the type to `any`. Measured: with the alias,
// `<Button as="a" nonsense={1}>` stopped erroring in FactChat. See the PR body.
import type { PolymorphicProps } from '../../types/polymorphic';

/**
 * Button color palette - defines the semantic color family.
 *
 * This overrides Chakra UI's colorPalette prop with our Golden Ratio
 * color system values. Chakra's default colorPalettes are not supported.
 *
 * - `primary`: Blue - main brand actions, CTAs
 * - `secondary`: Violet - accent actions, highlights
 * - `danger`: Rose - destructive actions, errors
 * - `success`: Green - positive actions, confirmations
 * - `warning`: Gold - caution actions, alerts
 * - `neutral`: Gray - low-emphasis, tertiary actions
 */
export type ButtonColorPalette =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'neutral';

/**
 * Button variant - defines the visual appearance/fill style.
 *
 * This overrides Chakra UI's variant prop with our custom variants.
 * Chakra's default variants (solid, outline, ghost, link) are replaced
 * with our Golden Ratio-based styling system.
 *
 * - `solid`: Filled background with contrasting text (most prominent)
 * - `soft`: Light tinted background with darker text (subtle)
 * - `outline`: Transparent with colored border (medium emphasis)
 * - `ghost`: Transparent with no border (lowest emphasis)
 */
export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';

/**
 * Button props with two-dimensional variant system.
 *
 * Combines `colorPalette` (what color) with `variant` (how it looks)
 * for flexible, consistent button styling.
 *
 * @note Overrides Chakra UI's `variant` and `colorPalette` props.
 *       Chakra's default values are not supported.
 *
 * @example
 * ```tsx
 * <Button colorPalette="primary" variant="solid">Submit</Button>
 * <Button colorPalette="danger" variant="soft">Delete</Button>
 * <Button colorPalette="secondary" variant="outline">Cancel</Button>
 * ```
 */
export type ButtonOwnProps = Omit<
  ChakraButtonProps,
  'variant' | 'colorScheme' | 'colorPalette' | 'leftIcon' | 'rightIcon' | 'as'
> & {
  /**
   * The color palette of the button (semantic color family).
   * Overrides Chakra UI's colorPalette prop (Chakra v3).
   * @default 'primary'
   */
  colorPalette?: ButtonColorPalette;
  /**
   * The visual variant of the button (fill style).
   * Overrides Chakra UI's variant prop.
   * @default 'solid'
   */
  variant?: ButtonVariant;
};

/**
 * Props for `Button`, typed for whatever element `as` renders.
 *
 * Defaults to `'button'`, so `ButtonProps` on its own means exactly what it
 * meant before this became polymorphic — every existing call site and every
 * `ComponentProps<typeof Button>` keeps its type.
 *
 * `as` now carries the element's own props with it:
 *
 * ```tsx
 * <Button as="a" href="/docs" target="_blank" rel="noreferrer">문서</Button>
 * <Button as={Link} href="/admin" prefetch={false}>관리자</Button>
 * ```
 *
 * Before, `as` swapped the rendered element but not the type — `href` was not a
 * `<button>` prop, so consumers reached for `@ts-expect-error`. See
 * `src/types/polymorphic.ts` for why `asChild` does not cover this case.
 */
export type ButtonProps<TElement extends ElementType = 'button'> =
  PolymorphicProps<TElement, ButtonOwnProps>;
