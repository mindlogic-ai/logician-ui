import {
  Children,
  type ComponentProps,
  forwardRef,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
} from 'react';
import {
  AvatarContext,
  AvatarFallback,
  AvatarGroup as ChakraAvatarGroup,
  AvatarGroupProps as ChakraAvatarGroupProps,
  AvatarIcon,
  AvatarImage,
  AvatarRoot as ChakraAvatarRoot,
  AvatarRootProps as ChakraAvatarRootProps,
  AvatarRootProvider as ChakraAvatarRootProvider,
  type ConditionalValue,
} from '@chakra-ui/react';

import { SYSTEM_HUE_NAMES, SystemHue } from '@/theme/colors';

export type {
  AvatarFallbackProps,
  AvatarIconProps,
  AvatarImageProps,
} from '@chakra-ui/react';

/**
 * Chakra's variants plus Logician's `logo`. Chakra types `variant` from its
 * own recipe, so the theme-level `logo` variant needs widening here.
 */
export type AvatarVariant = 'subtle' | 'solid' | 'outline' | 'logo';

/** `P` with `variant` widened to {@link AvatarVariant}. */
type WithAvatarVariant<P> = Omit<P, 'variant'> & {
  /**
   * `subtle` (default): the `colorPalette` fill — a person's category hue, or
   * the neutral pair. `logo`: the light `bg.logo` tile for model, chatbot and
   * brand marks, the same in both modes.
   */
  variant?: ConditionalValue<AvatarVariant>;
};

export type AvatarRootProps = WithAvatarVariant<ChakraAvatarRootProps>;
export type AvatarRootProviderProps = WithAvatarVariant<
  ComponentProps<typeof ChakraAvatarRootProvider>
>;

// Chakra's parts, typed for the `logo` variant.
const AvatarRoot = ChakraAvatarRoot as ForwardRefExoticComponent<
  AvatarRootProps & RefAttributes<HTMLDivElement>
>;
const AvatarRootProvider =
  ChakraAvatarRootProvider as ForwardRefExoticComponent<
    AvatarRootProviderProps & RefAttributes<HTMLDivElement>
  >;
const ChakraAvatarGroupTyped = ChakraAvatarGroup as ForwardRefExoticComponent<
  WithAvatarVariant<ChakraAvatarGroupProps> & RefAttributes<HTMLDivElement>
>;

export type AvatarProps = AvatarRootProps & {
  src?: string;
  name?: string;
  /**
   * Overrides the hue the fallback initials are tinted — by default a stable
   * hash of `name` picks one of the 12 `category.*` hues (see
   * {@link hueForName}), so the same person reads as the same colour
   * everywhere without a colour being stored anywhere. With no `name` and no
   * `colorHue` the fallback is the neutral pair
   * (`bg.muted` / `secondary.fgStrong`), not a hue.
   */
  colorHue?: SystemHue;
};

export interface AvatarGroupProps extends Omit<
  WithAvatarVariant<ChakraAvatarGroupProps>,
  'children'
> {
  children?: ReactNode;
  /**
   * Show at most this many avatars; the rest collapse into a trailing "+N"
   * counter in the neutral pair. Omit to show all. Chakra 3 dropped 2.x's
   * `max`; this restores it.
   */
  max?: number;
}

/**
 * A stable hash of `name` into one of `SYSTEM_HUE_NAMES`, so a given name
 * always lands on the same hue (no lookup table, nothing to keep in sync) and
 * different names spread across the 12-hue wheel instead of clustering on
 * one. Decorative only — `category.*` carries no status meaning — so a
 * collision between two people's initials is a cosmetic coincidence, not a
 * data bug.
 */
export function hueForName(name: string): SystemHue;
export function hueForName(name: string | undefined): SystemHue | undefined;
export function hueForName(name: string | undefined): SystemHue | undefined {
  // No name, no identity to colour: `undefined` so the caller falls back to
  // the neutral pair. `SYSTEM_HUE_NAMES[0]` is red, and a red placeholder
  // avatar reads as an error state.
  if (!name) return undefined;
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    // `| 0` keeps the running hash a 32-bit int so it can't grow unbounded
    // over a long name before the modulo at the end.
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % SYSTEM_HUE_NAMES.length;
  return SYSTEM_HUE_NAMES[index];
}

/**
 * The `colorPalette` an avatar paints with: `category.<hue>` for a person
 * (`colorHue`, else {@link hueForName}), `category.neutral` with no name. The
 * avatar recipe maps `colorPalette.surface` / `colorPalette.fg` onto it.
 */
export function avatarColorPalette(
  name: string | undefined,
  colorHue?: SystemHue
): `category.${SystemHue | 'neutral'}` {
  const hue = colorHue ?? hueForName(name);
  return hue ? `category.${hue}` : 'category.neutral';
}

/**
 * Fallback (initials / icon) colours: the person's hue when there is one,
 * otherwise the neutral pair Badge `neutral` uses.
 *
 * @deprecated The avatar recipe now paints the root from `colorPalette` (see
 * {@link avatarColorPalette}); `Avatar` no longer calls this. Kept for
 * callers that colour a non-avatar element to match a person. Removed in 6.0.
 */
export function avatarFallbackColors(
  name: string | undefined,
  colorHue?: SystemHue
): { bg: string; color: string } {
  const hue = colorHue ?? hueForName(name);
  if (!hue) return { bg: 'bg.muted', color: 'secondary.fgStrong' };
  return { bg: `category.${hue}.surface`, color: `category.${hue}.fg` };
}

/**
 * Chakra's `AvatarGroup` (overlapping avatars; `size` / `variant` reach every
 * child through the recipe props context) with the `max` overflow cap. The
 * counter is always the neutral `subtle` pair, whatever the group's variant:
 * it is a count, not a person or a logo.
 */
const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max, children, ...rest }, ref) => {
    const items = Children.toArray(children);
    const visible =
      typeof max === 'number' ? items.slice(0, Math.max(0, max)) : items;
    const overflow = items.length - visible.length;
    return (
      <ChakraAvatarGroupTyped ref={ref} {...rest}>
        {visible}
        {overflow > 0 && (
          // Spans so a group inside a button (a popover trigger) stays phrasing
          // content; the recipe sets the display, so nothing else changes.
          <AvatarRoot
            as="span"
            colorPalette="category.neutral"
            variant="subtle"
          >
            <AvatarFallback as="span">+{overflow}</AvatarFallback>
          </AvatarRoot>
        )}
      </ChakraAvatarGroupTyped>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

const AvatarComponent = forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    const { src, name, colorHue, ...rest } = props;
    // Fill, text colour, border and the full-circle fallback all come from
    // the avatar recipe (src/theme/recipes/avatar.ts); only the palette is
    // chosen here. A caller's own `colorPalette` still wins.
    return (
      <AvatarRoot
        ref={ref}
        colorPalette={avatarColorPalette(name, colorHue)}
        {...rest}
      >
        <AvatarFallback name={name} />
        <AvatarImage src={src} />
      </AvatarRoot>
    );
  }
);

AvatarComponent.displayName = 'Avatar';

export const Avatar = Object.assign(AvatarComponent, {
  Root: AvatarRoot,
  RootProvider: AvatarRootProvider,
  Fallback: AvatarFallback,
  Image: AvatarImage,
  Icon: AvatarIcon,
  Group: AvatarGroup,
  Context: AvatarContext,
});
