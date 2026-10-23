import { defineSlotRecipe } from '@chakra-ui/react';

/**
 * Logician overrides for Chakra's `avatar` slot recipe (merged over it, so
 * Chakra's `size` and `shape` variants and `--avatar-size` stay as they are).
 *
 * **The root owns the circle.** Chakra sizes only the root (`--avatar-size`)
 * and gives `fallback` no width or height, so a fill painted on the fallback
 * covers just the glyph box — a dark disc with a small light pill around the
 * initial. Here the root carries the fill, the text colour, the hairline
 * border and `overflow: hidden`, and the fallback fills the root and centres
 * its content, so `Avatar.Root` + `Avatar.Fallback` render correctly with no
 * styling at the call site.
 *
 * **Colour comes from `colorPalette`.** The default (`subtle`) variant reads
 * `colorPalette.surface` / `colorPalette.fg`, and a `category.{hue}` palette
 * resolves those to the `category.{hue}.surface` / `.fg` pair (Chakra derives
 * a palette from every token-path prefix, so `colorPalette="category.blue"`
 * is a real palette). `Avatar` passes `category.<hueForName(name)>`; with no
 * name the palette is `category.neutral` (`bg.muted` / `secondary.fgStrong`),
 * which is also this recipe's own default, so a bare `Avatar.Root` never
 * inherits an ancestor's palette and never turns red.
 *
 * `variant="logo"` is the light tile for model, chatbot and brand marks:
 * `bg.logo` in both modes, `fg.onLogo` for any initials, the fallback icon
 * centred. Chakra's `solid` / `outline` variants are left as Chakra ships
 * them; Logician does not use them.
 */
export const avatarSlotRecipe = defineSlotRecipe({
  slots: ['root', 'image', 'fallback'],
  base: {
    root: {
      // The no-name palette, as a style rather than `defaultVariants`: Chakra
      // feeds a default `colorPalette` only to the recipe function, never to
      // the element, so it would not reach `colorPalette.*` here. A caller's
      // `colorPalette` prop is a style prop and overrides this (style props
      // land outside the `recipes` layer).
      colorPalette: 'category.neutral',
      borderWidth: '1px',
      borderColor: 'border.subtle',
      overflow: 'hidden',
    },
    fallback: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'inherit',
    },
  },
  variants: {
    variant: {
      // Chakra's default variant; Chakra paints it `colorPalette.muted`, which
      // a category palette does not have.
      subtle: {
        root: { bg: 'colorPalette.surface', color: 'colorPalette.fg' },
      },
      logo: {
        root: { bg: 'bg.logo', color: 'fg.onLogo' },
      },
    },
  },
});
