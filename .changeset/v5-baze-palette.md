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
