---
'@mindlogic-ai/logician-ui': minor
---

feat: dark mode — semantic token layer, color-mode runtime, and full component adoption

Adds first-class light/dark support to the design system.

**Semantic tokens (`semanticTokens.colors`)**

- New neutral tokens with `_dark`, mapped onto the existing `gray.0–1500` scale:
  `bg.{canvas,surface,subtle,muted,inverse}`, `fg.{default,muted,subtle,inverse}`,
  `border.{default,subtle,strong}`. Consume with zero app setup:
  `color="fg.default"`, `bg="bg.surface"`, `borderColor="border.default"`.
- `_dark` variants added to the five brand semantics
  (`primary/secondary/danger/success/warning`); interactive/text steps lighten
  ~2 stops for AA on dark surfaces (`secondary.main` lifts to `violet.200` so
  secondary text/outline clears AA on the dark canvas).
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

Every component now flips through the semantic tokens — verified by rendering all
64 component stories in both modes.

- *Surfaces & overlays*: Card, Input, Textarea, Select/Combobox, Section/Page
  loaders, Table, RadialProgress, ErrorFallback card, SegmentedControl track,
  RangeDatePicker popover; overlays (Menu/Modal/Popover/Toast) realign onto the
  slate scale via a `bg.panel` `_dark` override. The Menu uses a dark drop
  shadow in dark mode (was a near-white glow).
- *Text & icons*: foreground colors migrated to `fg.*` across Typography
  (Text/Subtitle/Subtext/H3), Button/Chip/Tag/Badge neutral variants, FormLabel,
  MaxLengthIndicator, Table head/body, IconButton, Tabs, SegmentedControl,
  FileItem, FileList, MonthPicker, Code, CodeTabs, SeeMoreButton, ErrorFallback,
  DatePickers, Markdown/MDXEditor content, and Menu items.
- *Borders & dividers*: migrated to `border.*` across FileInput, Popover
  (content + arrow), TabList, Avatar, MenuList, ModalFooter, FileList, FileItem,
  Collapsible, TableContainer, SeeMoreButton, SliderThumb, Checkbox.
- *Neutral soft fills* (Button/Chip/Tag) flip their surface + border instead of
  leaving light-on-light text on dark.
- *LineGraph* feeds recharts CSS-var strings (`var(--chakra-colors-*)`) for axis
  labels and grid, since recharts does not resolve Chakra tokens.

**Contrast / accessibility (also affects light mode)**

A WCAG pass on the dark-mode pairs drove a few brand adjustments that, by
design, also apply in light:

- Solid `Button`/`IconButton`/`Chip`/`Tag` fills are pinned to their saturated
  primitive steps so they are mode-invariant (they no longer lighten to the
  bright `*.300` step in dark, which had dropped white-on-fill contrast to
  ~1.8–4.5:1). White labels keep their light-mode contrast in both modes.
- Solid **warning** uses a dark label (`gold.900`) in both light and dark —
  white-on-gold was 2.39:1 (failing AA in *both* modes); it is now 6.7:1.
- Checkbox unchecked-border and disabled-fill tuned to flip and clear the 3:1
  non-text-contrast bar on dark.

**Light-mode safety**

- Additive only: no primitive (`gray.0–1500`, brand palettes) or existing
  semantic token was renamed or removed.
- Light rendering is preserved except for small, deliberate changes:
  - solid **warning** buttons/chips/tags now use a dark label instead of white
    (the AA fix above);
  - a handful of text/border values shift by ~1 tonal step where no exact
    semantic token matched the previous primitive.
- `globalCss` gains a `.dark` body-variable block (no effect in light) and the
  body text color references `fg.default` (resolves to the same `gray.1300` in
  light).
