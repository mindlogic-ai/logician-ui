---
'@mindlogic-ai/logician-ui': minor
---

Avatar: the fill now covers the whole circle. Chakra sizes only the avatar
root, so the colour Avatar painted on `Avatar.Fallback` covered just the glyph
box (a dark disc with a small light pill around the initial wherever a call site
also set the root colour). A Logician `avatar` slot recipe now gives the root
the fill, text colour, `border.subtle` hairline and `overflow: hidden`, and the
fallback fills the root with its content centred — so `Avatar.Root` +
`Avatar.Fallback` render correctly bare.

- Colour comes from `colorPalette`: `Avatar` passes `category.<hue>` (from
  `colorHue` or `hueForName(name)`), or `category.neutral` with no name (also
  the recipe default). New tokens `category.neutral.surface` / `.fg` alias
  `bg.muted` / `secondary.fgStrong`. New helper `avatarColorPalette(name,
colorHue)`; `avatarFallbackColors` is deprecated (still exported).
- New `variant="logo"`: the light `bg.logo` tile (white, warm cream in dark) with
  `fg.onLogo` initials, for model, chatbot and brand marks. New tokens `bg.logo`
  and `fg.onLogo`.
- `Avatar.Group` gets `max`: avatars past it collapse into a "+N" counter in the
  neutral pair (Chakra 3 dropped 2.x's `max`).

Visible change: the root is now filled behind a loaded image too, so a
transparent PNG/SVG mark on a person avatar sits on the hue. Use
`variant="logo"` for those. Chakra's `solid` / `outline` variants keep working
on the category palettes (they fall back onto the same pair), and a Chakra
palette passed as `colorPalette` (e.g. `blue`) falls back to its `muted` fill.

Call sites that passed `bg` / `bgColor` / `color` (or a `css` override) to make
the initials readable can drop them.
