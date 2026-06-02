---
'@mindlogic-ai/logician-ui': minor
---

feat: dark mode — semantic token layer + color-mode runtime

Adds first-class light/dark support to the design system.

**Semantic tokens (`semanticTokens.colors`)**

- New neutral tokens with `_dark`, mapped onto the existing `gray.0–1500` scale:
  `bg.{canvas,surface,subtle,muted,inverse}`, `fg.{default,muted,subtle,inverse}`,
  `border.{default,subtle,strong}`. Consume with zero app setup:
  `color="fg.default"`, `bg="bg.surface"`, `borderColor="border.default"`.
- `_dark` variants added to the five brand semantics
  (`primary/secondary/danger/success/warning`); interactive/text steps lighten
  ~2 stops for AA on dark surfaces.
- Exported `SemanticColorToken` union (dotted-path names) for codemods/reviewers.

**Color-mode runtime**

- `LogicianProvider` now mounts a color-mode provider by default (backed by
  `next-themes`, added as a dependency). New props: `defaultColorMode`,
  `forcedColorMode` (for staged/force-light rollouts), `enableColorMode`.
- New exports: `ColorModeProvider`, `useColorMode`, `useColorModeValue`,
  `ColorModeToggle`, and the `ColorMode` type.

**Switch contract**

- Strategy: class (`.dark` on `<html>`, the Chakra v3 default `_dark` selector).
- Storage key: `logician-color-mode`. `system` resolution enabled.
  `disableTransitionOnChange` on. Logician owns `color-scheme` via
  `enableColorScheme` — consumers should not also write it; add
  `suppressHydrationWarning` to `<html>`.

**Component dark-mode adoption**

Card, Input, Textarea, Select/Combobox, Section/Page loaders, Markdown, MDXEditor,
RangeDatePicker, Table (sticky cells) and RadialProgress now resolve their
neutral surfaces/text/borders through the semantic tokens so they flip with the
mode. Overlays (Menu/Modal/Popover/Toast) realign onto the slate scale via a
`bg.panel` `_dark` override.

**Light-mode safety**

- Additive only: no primitive (`gray.0–1500`, brand palettes) or existing
  semantic token was renamed or removed.
- All new/overridden tokens keep their previous resolved **light** values
  (`bg.panel`/`bg.subtle`/`bg.muted` light values match Chakra's defaults;
  brand/neutral `base` values are unchanged), so light rendering is preserved.
- `globalCss` gains a `.dark` body-variable block (no effect in light) and the
  body text color now references `fg.default` (resolves to the same `gray.1300`
  in light).
