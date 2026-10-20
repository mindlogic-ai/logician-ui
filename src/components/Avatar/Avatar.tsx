import { forwardRef } from 'react';
import {
  Avatar as ChakraAvatar,
  AvatarContext,
  AvatarFallback,
  AvatarGroup,
  AvatarIcon,
  AvatarImage,
  AvatarRoot,
  AvatarRootProps as ChakraAvatarRootProps,
  AvatarRootProvider,
} from '@chakra-ui/react';

import { SYSTEM_HUE_NAMES, SystemHue } from '@/theme/colors';

export type {
  AvatarFallbackProps,
  AvatarGroupProps,
  AvatarIconProps,
  AvatarImageProps,
  AvatarRootProps,
} from '@chakra-ui/react';

export type AvatarProps = ChakraAvatarRootProps & {
  src?: string;
  name?: string;
  /**
   * Overrides the hue the fallback initials are tinted — by default a stable
   * hash of `name` picks one of the 12 `category.*` hues (see
   * {@link hueForName}), so the same person reads as the same colour
   * everywhere without a colour being stored anywhere. With no `name` and no
   * `colorHue` the fallback is the neutral beige pair
   * (`secondary.surface` / `secondary.fgStrong`), not a hue.
   */
  colorHue?: SystemHue;
};

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
 * Fallback (initials / icon) colours: the person's hue when there is one,
 * otherwise the neutral beige small-surface pair Badge `neutral` uses.
 */
export function avatarFallbackColors(
  name: string | undefined,
  colorHue?: SystemHue
): { bg: string; color: string } {
  const hue = colorHue ?? hueForName(name);
  if (!hue) return { bg: 'secondary.surface', color: 'secondary.fgStrong' };
  return { bg: `category.${hue}.surface`, color: `category.${hue}.fg` };
}

const AvatarComponent = forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    const { src, name, colorHue, ...rest } = props;
    const fallback = avatarFallbackColors(name, colorHue);
    return (
      <ChakraAvatar.Root
        ref={ref}
        borderWidth="1px"
        borderColor="border.subtle"
        overflow="hidden"
        bgColor="transparent"
        {...rest}
      >
        <ChakraAvatar.Fallback
          name={name}
          bg={fallback.bg}
          color={fallback.color}
        />
        <ChakraAvatar.Image src={src} />
      </ChakraAvatar.Root>
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
