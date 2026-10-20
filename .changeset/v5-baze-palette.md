---
'@mindlogic-ai/logician-ui': major
---

**5.0 — BAZE palette.** The golden-ratio palette (blue primary, violet
secondary, cool slate gray) is replaced by the BAZE colour system, and the
token layer and component variants are redesigned with it. Guide:
`MIGRATION-5.0.md`; codemod: `codemods/5.0` (`npx jscodeshift -t
node_modules/@mindlogic-ai/logician-ui/codemods/5.0/index.js --parser=tsx src/`).

Tokens

- Raw scales `ink` / `sand` / `slate` (12 steps, light + dark), `coral`, and 12
  system hues; semantic steps `neutral.1–12` / `secondary.1–12`; new roles
  `layer.*`, `border.control`, `fg.icon` / `placeholder` / `onPrimary` / `link`,
  `primary.{hover,active,wash,washActive,selected}`, `secondary.{surface,…}`,
  `action.*`, `send.*`, `count.*`, `disabled.*`, `focus.ring`, `info.*`, status
  `{bg,border,fg,solid,onSolid}`, `tooltip.*`, `category.{hue}.*`.
- High contrast via `prefers-contrast: more`; contrast audit in CI
  (`src/theme/contrast.test.ts`, 4 modes, fails on unregistered tokens).
- `createLogicianTheme({ neutral: 'ink' | 'slate', secondary: 'sand' })` and
  `LogicianProvider theme`.
- **Breaking:** raw `blue` / `violet` / `rose` / `gold` / `green` / `gray` /
  `grayDark` (and legacy `purple` / `red` / `yellow` steps) removed. 4.x
  semantic names (`primary.lightest`, `danger.main`, `slate.800`, …) remain as
  deprecated aliases until 6.0; new `no-deprecated-tokens` ESLint rule
  (`@mindlogic-ai/logician-ui/eslint`).

Components

- **Breaking:** Button `variant` = `primary · action · secondary · subtle
(default) · ghost · danger` + `isDestructive`; `colorPalette` removed.
  IconButton `variant` = `ghost (default) · secondary · primary · danger ·
action` (coral send). Badge = `neutral (default) · success · warning · danger
· info`. Tag = `tone` + `selected` + `category`; Chip is a deprecated Tag
  alias. Card `gradient` removed. Toast default status is now `neutral`.
- New: CountBadge; Banner/Toast `neutral`; Modal `headerTone="brand"`;
  PageLoader/SectionLoader `variant="thinking"`; Avatar category-tinted
  fallback (`colorHue`).
- Disabled controls use fixed `disabled.*` colours instead of opacity; the
  focus ring's inner band follows `bg.canvas`; Link is underlined `fg.link`;
  info states use `info.*` instead of primary.
- Sand tint (`secondary.surface` / `surfaceStrong`) is an accent, never a
  component background: neutral Badge/Tag, Card `wash`, Banner `neutral`, the
  Modal brand header band, the RangeDatePicker range and the nameless Avatar
  now use neutral surfaces (`bg.muted`, `bg.subtle`, `layer.3`,
  `primary.selected`).
- LineGraph default series start with `primary.main`, then decorative hues;
  status hues (red/yellow/green/blue) are never defaults. Confetti defaults
  drop the same hues.
- Loaders expose `role="status"` with translated hidden text only while
  loading (new `label` prop). ModalHeader wires `Dialog.Title` /
  `Dialog.Description` (new `subtitle`). Menu items style `_highlighted`, so
  the keyboard highlight uses role tokens. `toast.update(id, { status })`
  changes the rendered status.
- Chakra's own colour names (`bg.emphasized`, `border.muted`, `fg.error`,
  `*.inverted`, status `bg/fg/border.*`) resolve to BAZE roles.
- New `normalizeSemanticOverrides(config)`: roles are `{ _light, _dark }`, so a
  4.x-style `{ base, _dark }` override would lose its light value;
  `LogicianProvider config` applies it automatically.

Removed exports and changed signatures

- **Removed:** `tagColorPalettes`, `tagColorPaletteStyles`, `tagColorSchemes`,
  `tagColorSchemeStyles`, `tagVariants`; Chip `colorSchemes`,
  `colorSchemeStyles`, `getChipStyles`, `variants`.
- **Changed:** `getButtonStyles(variant, isDestructive)`,
  `getIconButtonStyles(variant, isDestructive)`,
  `getTagStyles({ tone, selected, category, interactive })`; `LINK_RAMP`
  entries are plain token strings (no `{ base, _dark }`).
- Untyped callers passing 4.x Button/IconButton/Badge/Tag/Chip props still
  render (mapped at runtime, one dev warning per combination; lossy
  combinations say so).
