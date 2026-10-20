# Migrating to logician-ui 5.0 (BAZE palette)

5.0 replaces the golden-ratio palette (blue primary, violet secondary, cool slate
gray) with the BAZE colour system: warm black primary, beige-brown secondary, a
coral action colour, and 12 system hues for status and categories. Tokens and
component variants are redesigned together.

**Most app code keeps working.** Every 4.x _semantic_ colour name still
resolves (as a deprecated alias, removed in 6.0), so the ~5,300 semantic
references in factchat-nextjs change colour without a code change. Two things do break:
components whose variant props changed, and raw primitives (`blue.500`,
`gray.300` …) read directly.

## 1. Run the codemod

```sh
npx jscodeshift -t node_modules/@mindlogic-ai/logician-ui/codemods/5.0/index.js \
  --parser=tsx --extensions=tsx,ts src/
# or, with a summary table of what needs a human:
node node_modules/@mindlogic-ai/logician-ui/codemods/5.0/index.js --dry src/
```

It rewrites Button / IconButton / Badge / Tag / Chip / Card props (section 3) and
renames every deprecated token string (section 2), then prints the call sites
it could not migrate: dynamic props (`variant={x}`), spreads, raw `blue.N`-style
primitives, and combinations that need judgement. Details and per-transform
runs: [`codemods/5.0/README.md`](codemods/5.0/README.md). Run Prettier afterwards.

## 2. Tokens

### Lint

```js
// eslint.config.js (flat)
const logician = require('@mindlogic-ai/logician-ui/eslint');
module.exports = [logician.configs.recommended]; // logician/no-deprecated-tokens: warn
```

ESLint 8 `.eslintrc`: `eslint --rulesdir node_modules/@mindlogic-ai/logician-ui/eslint/rules …`
with `rules: { 'no-deprecated-tokens': 'warn' }`. The rule names the replacement
for each deprecated alias and flags removed raw primitives.
Rule and codemod match the dotted name (`'primary.lighter'`), Chakra's token
reference form with its `colors.` prefix (`'{colors.success.main}'`,
`token('colors.success.main')`, kept in the output), and the CSS variable in
the kebab-case form Chakra emits (`var(--chakra-colors-primary-fill-strong)` →
`var(--chakra-colors-primary-hover)`; `primary.washActive` is
`--chakra-colors-primary-wash-active`, never `…-washActive`).

### Mapping (deprecated alias → 5.0)

| 4.x                                                                                                                                | 5.0                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primary.lightest`, `primary.extralight`                                                                                           | `primary.wash` — review: a tinted surface becomes neutral gray                                                                                                                                                                                                               |
| `primary.lighter`                                                                                                                  | `primary.washActive`                                                                                                                                                                                                                                                         |
| `primary.light`                                                                                                                    | `border.strong`                                                                                                                                                                                                                                                              |
| `primary.dark`, `primary.darker`                                                                                                   | `fg.default`                                                                                                                                                                                                                                                                 |
| `primary.fill`, `primary.fillStrong`                                                                                               | `primary.main`, `primary.hover` — review: blue bands become black; move announcement bands to `Modal headerTone="brand"` / `bg.muted` + `secondary.border` by hand                                                                                                           |
| `secondary.lightest` · `extralight` · `lighter` · `light` · `main` · `dark`/`darker`                                               | `secondary.1` · `secondary.surface` · `secondary.surfaceStrong` · `secondary.border` · `secondary.fg` · `secondary.fgStrong` — review: `secondary.surface*` is tint-only, **not a background**; a `bg` of `extralight`/`lighter` → `bg.muted` (page-level band: `bg.subtle`) |
| `{danger,success,warning}.lightest`/`extralight` · `lighter`/`light` · `main` · `dark`/`darker`                                    | `.bg` · `.border` · `.solid` · `.fg`                                                                                                                                                                                                                                         |
| `warning.fill`                                                                                                                     | `warning.solid`                                                                                                                                                                                                                                                              |
| `bg.selected`                                                                                                                      | `primary.selected`                                                                                                                                                                                                                                                           |
| `fg.accent`                                                                                                                        | `primary.main` (links: `fg.link`)                                                                                                                                                                                                                                            |
| `slate.0`/`50` · `100` · `200` · `300` · `400` · `500`/`600` · `700` · `800`/`900` · `1000`/`1100` · `1200`/`1300` · `1400`/`1500` | `neutral.1` · `2` · `3` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12`                                                                                                                                                                                                   |

Unchanged names with new values: `primary.main`, `bg.*` (`canvas`, `surface`,
`subtle`, `muted`, `sunken`, `track`, `raised`, `inverse`, `panel`), `fg.default`
/ `muted` / `subtle` / `emphasized` / `inverse`, `border.subtle` / `default` /
`strong`, `bg.invalid.subtle`, `bg.highlighted`.

### Removed raw primitives

`blue`, `violet`, `rose`, `gold`, `green` (numeric steps), the golden-ratio
`gray` 0–1500 and `grayDark`, and the legacy `purple` / `red` / `yellow` steps.
A leftover `blue.500` does not error — it falls through to Chakra's default
palette — so let the lint rule find them. `gray.N` → `neutral.N` per the slate
row above; for the rest pick the role by use (`primary.*`, a status family,
`category.*`).

### New tokens

`layer.1–3` (+`.hover`/`.active`), `border.control`, `fg.icon`,
`fg.placeholder`, `fg.onPrimary`, `fg.link`/`fg.linkHover`,
`primary.{hover,active,wash,washActive,selected}`,
`secondary.{surface,surfaceStrong,border,fg,fgStrong}`, `action.*`, `send.*`,
`count.*`, `disabled.*`, `focus.ring`, `info.*`, status
`{bg,border,fg,solid,onSolid}` (+`danger.solidHover/solidActive`), `tooltip.*`,
`category.{hue}.{surface,fg}`, `neutral.1–12`, `secondary.1–12`. High-contrast
values apply under `prefers-contrast: more`.

### Theme options

```tsx
<LogicianProvider />                          // BAZE: neutral ink, secondary sand
<LogicianProvider theme={{ neutral: 'slate' }} /> // cool gray (4.x temperature)
createSystem(defaultConfig, createLogicianTheme({ neutral: 'slate' }))
```

### Overriding roles from your app

Every Logician role is emitted as `{ _light, _dark }`, and Chakra's `_light`
outranks `base`. A 4.x-style override `primary.main: { value: { base: X,
_dark: Y } }` would therefore keep the library's light value. `LogicianProvider
config={…}` fixes this for you (`normalizeSemanticOverrides`); if you call
`createSystem` yourself, wrap your config: `createSystem(defaultConfig,
createLogicianTheme(), normalizeSemanticOverrides(appConfig))`.

`secondary.main` aliases `secondary.fg`, which clears 4.5:1 on `bg.canvas` but
not on `layer.1` / `bg.muted` (≈4.2:1 in light). Text on those surfaces should
use `secondary.fgStrong` or `fg.muted`.

## 3. Components

| Component                      | 4.x                                                                                                     | 5.0                                                                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Button**                     | `colorPalette` × `variant` (solid/outline/ghost/soft); default rendered `soft` while documented `solid` | `variant`: `primary` · `action` · `secondary` · `subtle` (default) · `ghost` · `danger`; `isDestructive` for danger text on secondary/subtle/ghost. `colorPalette` removed from the types |
| **IconButton**                 | same grid, default neutral ghost                                                                        | `variant`: `ghost` (default) · `secondary` · `primary` · `danger` · `action` (coral send); `isDestructive`                                                                                |
| **Badge**                      | 6 variants, default `primary`                                                                           | `neutral` (default, `bg.muted` + `secondary.fgStrong`) · `success` · `warning` · `danger` · `info`; `primary`/`secondary` removed                                                         |
| **CountBadge**                 | — (app's UnreadCountBadge)                                                                              | new: `count`, `max` (99+), `dot`, `showZero`, `label`                                                                                                                                     |
| **Tag**                        | `colorPalette` × `variant`                                                                              | `tone` (`neutral` default · `success` · `warning` · `danger` · `info`), `selected`, `category` (12 hues), `icon`                                                                          |
| **Chip**                       | separate component                                                                                      | deprecated alias of Tag (removed in 6.0) — `<Chip>` → `<Tag>`; the codemod keeps its pill shape (`borderRadius="xl" px={3} py={2} fontWeight="medium"`)                                   |
| **Card**                       | `gradient` variant                                                                                      | removed; `wash` = `bg.muted` (neutral, borderless)                                                                                                                                        |
| **Modal**                      | —                                                                                                       | `headerTone="brand"` (`layer.3` band + `secondary.border` rule), `ModalHeader subtitle`                                                                                                   |
| **Banner**                     | info/success/warning/danger                                                                             | + `neutral`; 1px border + 3px left bar; `info` uses `info.*` (was primary)                                                                                                                |
| **Toast**                      | default `success`                                                                                       | + `neutral` (now the default); `info` uses `info.*`                                                                                                                                       |
| **PageLoader / SectionLoader** | —                                                                                                       | `variant="thinking"` (coral dots); both now `role="status"`                                                                                                                               |
| **Link**                       | `primary.main`, no underline                                                                            | `fg.link` + underline (1px, hover 2px), weight 500                                                                                                                                        |
| **Avatar**                     | untinted fallback                                                                                       | fallback tinted by `category.*` from a name hash; `colorHue` override                                                                                                                     |
| **Typography**                 | some `primary.*` emphasis colours                                                                       | `fg.*` only                                                                                                                                                                               |
| **focusRing util**             | white inner band                                                                                        | `bg.canvas` inner band                                                                                                                                                                    |
| **Disabled**                   | `opacity: 0.5`                                                                                          | fixed `disabled.bg` / `disabled.fg`                                                                                                                                                       |

Untyped / `as any` callers passing the old Button/IconButton/Badge/Tag/Chip props
still render — they are mapped at runtime with a one-time development warning —
but the types no longer accept them.

Kept as `@deprecated` exports: `ButtonColorPalette`, `buttonColorPalettes`,
`buttonColorPaletteStyles`, `IconButtonColorPalette`, `iconButtonColorPalettes`,
`iconButtonColorPaletteStyles` (+ the `*ColorScheme*` aliases), `Chip`,
`ChipProps`, `ChipOwnProps`, `LegacyBadgeVariant`. Removed: `tagColorPalettes`,
`tagColorPaletteStyles`, `tagColorSchemes`, `tagColorSchemeStyles`,
`tagVariants`, Chip's `colorSchemes` / `colorSchemeStyles` / `getChipStyles` /
`variants`. Changed signatures: `getButtonStyles(variant, isDestructive)`,
`getIconButtonStyles(variant, isDestructive)`, `getTagStyles({ tone, selected,
category, interactive })`. `LINK_RAMP` entries are plain token strings now.

## 4. After the codemod — what a human checks

- Call sites the codemod reported (dynamic props, spreads, raw primitives).
- `primary.lightest`/`extralight` used as a _coloured_ surface — now gray.
- `primary.fill` bands (modal/notice headers) — now black; use
  `Modal headerTone="brand"`, or `bg.muted` with a `secondary.border` edge.
  Not `secondary.surface`/`surfaceStrong` — the sand tint is accent-only and
  reads peach as a background.
- The app theme override (`src/theme/index.ts` in factchat-nextjs): delete
  overrides that duplicate the new defaults.
