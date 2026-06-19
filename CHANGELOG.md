# Changelog

## 3.2.0-alpha.1

### Minor Changes

- 7aaf7a7: Add `Tree` compound component wrapping Chakra UI v3's `TreeView` (Ark UI tree-view).

  Exposes the full part set so consumers can compose nested hierarchical UIs with built-in keyboard navigation (arrow keys, Home/End, type-ahead), `role="tree"`/`treeitem` semantics, and `aria-expanded`/`aria-selected` for free.

  **Parts**

  `Tree.Root`, `Tree.Tree`, `Tree.Branch`, `Tree.BranchControl`, `Tree.BranchTrigger`, `Tree.BranchIndicator`, `Tree.BranchText`, `Tree.BranchContent`, `Tree.BranchIndentGuide`, `Tree.Item`, `Tree.ItemText`, `Tree.ItemIndicator`, `Tree.NodeCheckbox`, `Tree.Label`.

  Also re-exports `createTreeCollection` and the relevant change-detail types (`TreeExpandedChangeDetails`, `TreeSelectionChangeDetails`, etc.) so consumers don't need to import from `@chakra-ui/react`.

  **Defaults**
  - `BranchControl` / `Item` rows: padded clickable rows with `bg.subtle` hover, `primary.lightest` selected state, semantic-token text so light/dark both work.
  - `BranchIndicator`: default chevron icon (`IoChevronForward`) that rotates 90° on open.
  - `BranchIndentGuide`: subtle vertical line for depth visualization (matches the VSCode/GitHub tree feel).
  - All interactive parts use the shared `focusRing` util.

  Single- and multiple-selection both supported via the upstream `selectionMode` prop. Controlled or uncontrolled via `(default)expandedValue` and `(default)selectedValue`.

## 3.2.0-alpha.0

### Minor Changes

- 31fa1eb: feat(workflow): add the generic Workflow editor framework

  Moves FactChat's Workflow editor into the design system as a fully reusable,
  host-configurable component so other apps can consume it. The core is
  domain-free: hosts register node kinds via `nodeTypes` (`defineNodeType`),
  pass an opaque `hostBridge` for app data, and inject a `translate` function so
  the editor localizes with the host's catalog (and resolves host-registered
  node `descriptionKey`s) — with bundled defaults when none is provided.

  Exposes `Workflow`, `WorkflowProvider`/`useWorkflow`/`useWorkflowTranslate`,
  the graph reducer + history, the node-type contract and canvas primitives
  (`NodeShell`, `IconTile`, `FloatingCard`, `FieldWrapper`, `CollapsibleSection`),
  and the supporting types. Adds `@xyflow/react` and `@dagrejs/dagre` as
  dependencies (kept external in the bundle) and registers the chrome icons the
  canvas uses (alert/grip/sticky-note/check/chevron/lock/arrows/etc.).

## 3.1.0-alpha.12

### Patch Changes

- 5c8b582: docs(theme): reposition `slate.*` as a supported foundational neutral family (un-deprecate)

  `slate.*` shipped in 3.1.0-alpha.11 marked `@deprecated` — framed as a temporary
  migration shim to be codemodded onto the `fg`/`bg`/`border` role tokens. That was
  premature: `slate` and the role tokens are **distinct ramps**, not redundant
  copies. They agree on light values but diverge in dark — `slate` is a mechanical
  halved-saturation mirror, while the role tokens carry hand-tuned dark values (AA
  bumps, the `fg` re-peg, hierarchy spacing). So a blanket `slate→role` migration
  is not value-neutral and isn't desirable.

  `slate.*` is now a **first-class, supported foundational neutral family**: a
  mode-aware tonal scale alongside the raw `gray.*` primitives. Guidance: prefer a
  role token (`fg`/`bg`/`border`) when one matches the intent; reach for `slate.N`
  when you need a specific neutral step no role names (the mode-aware equivalent of
  dropping to a raw `gray.N`).

  No value or rendering changes — only the `@deprecated` annotations on the token,
  the `SemanticColorToken` type, and the docs are removed/repositioned.

## 3.1.0-alpha.11

### Minor Changes

- 1350bbc: feat(theme): desaturated dark neutrals, `slate.*` ramp, `bg.sunken`, and `primary.fill*`

  Folds the generic dark-mode token work that factchat had been carrying as local
  `semanticTokens` overrides back into the design system, so consumers get them as
  defaults without re-declaring tokens.

  **Desaturated dark neutrals (visual change in dark mode).** The blue-tinted
  `gray` ramp reads correctly in light but turns muddy/over-chromatic as a dark
  surface. Every dark-mode neutral now resolves to a halved-saturation mirror of
  the `gray` step it referenced before (new `desaturatedGray` single-source map):
  the `_dark` of `bg.{canvas,surface,raised,subtle,muted,inverse,panel}`,
  `fg.{default,muted,inverse}`, and `border.{default,subtle,strong}`. **Light mode
  is byte-for-byte unchanged** (every `base`/`_light` still references
  `{colors.gray.*}` verbatim); only dark-mode rendering shifts, and only for
  neutrals — chromatic state tints (`bg.selected/invalid/highlighted`) are
  intentionally left alone.

  **Re-pegged `fg.*` text scale (light-mode change for all consumers).** Body text
  was anchored at `gray.1300` (~14:1 on white) — heavier than typical running copy
  and heavier than real product usage. `fg.default` is re-pegged to `gray.1000`
  (~9:1, a comfortable AAA body weight), and the old near-black step is preserved
  as a new **`fg.emphasized`** token for headings/key figures. `fg.muted`'s dark
  value drops one step to keep the `default`→`muted` hierarchy gap. `fg.subtle`
  and `fg.inverse` are unchanged. Migrate any text that needs maximum contrast
  from `fg.default` to `fg.emphasized`.

  **New `slate.*` tone ramp (`slate.0`–`slate.1500`) — deprecated migration shim.**
  A mode-aware companion to the raw `gray` primitives (each `slate.N` is `gray.N`
  in light and the desaturated counterpart of the mirrored step in dark). It is
  shipped **already `@deprecated`**: it exists only to give code that styles
  neutrals with a raw ramp a lossless landing spot and a clean codemod target onto
  the `fg`/`bg`/`border` role tokens (`slate.200`→`border.subtle`,
  `slate.900`→`fg.muted`, `slate.800`/`slate.1000`→`fg.default`, etc.). Do not use
  `slate.*` in new code; it will be removed once consumers migrate.

  **New `bg.sunken`** — sunken page wash for list/overview surfaces (gray floor in
  light so `bg.surface` cards read as raised; drops to the canvas floor in dark,
  where the `bg.*` ramp is compressed and `subtle` would otherwise invert the
  elevation).

  **New `primary.fill` / `primary.fillStrong`** — solid brand-blue fills for
  surfaces with white text/icons on top (modal headers, hero banners, brand
  badges). Unlike `primary.main`/`primary.dark` (which lighten ~2 stops in dark,
  correct for foreground but too light as a fill), these stay deep blue in dark.

  **`fg.subtle` dark a11y bump** — lifted from the straight mirror (~4.06:1 on
  `bg.muted`) to `#989DA9` (~4.6:1) so tertiary/helper text clears AA, while
  staying below `fg.muted` so the hierarchy holds. Light value unchanged.

  **Plain `bg`/`fg`/`border` DEFAULTs** — the bare Chakra globals (`html`
  background/text and `--global-color-border`) now rejoin our desaturated neutrals
  in dark instead of Chakra's off-palette black/gray. Light values repeat Chakra's
  own, so light is untouched. Kept out of the public `SemanticColorToken` contract
  (internal realignment, like `bg.panel`).

  **Global scrollbar styling** — a thin, transparent-track, rounded thumb that's
  mode-aware via the `slate` ramp, so scrollbars stop falling back to harsh raw
  browser chrome in dark.

  `SemanticColorToken` gains `fg.emphasized`, `slate.*`, `bg.sunken`, and
  `primary.fill*`. The dark body-variable fallbacks in `globalCss` are repointed to
  match `fg.default`/`bg.canvas`.

  Note: Chakra's `bg.emphasized` (used by its default `Skeleton`) still can't be
  overridden via `semanticTokens` here — `bg.raised` remains the canonical
  "strongly-raised" elevation token. A `Skeleton` recipe is the follow-up if dark
  skeletons need tuning.

## 3.1.0-alpha.10

### Minor Changes

- b38a504: feat(theme): add `bg.raised` token; fix SegmentedControl dark-mode selection

  **New semantic token `bg.raised`** — a strongly-raised neutral surface one level
  above `bg.surface` (`white` in light, `gray.1100` in dark). It exists because
  the `bg.*` dark ramp is compressed such that `bg.surface` (`gray.1400`) is
  _darker_ than `bg.subtle` (`gray.1300`), so there was no token for a neutral
  element that reads as lifted above a subtle fill in dark. Added to the exported
  `SemanticColorToken` contract. (Named `raised` rather than Chakra's `emphasized`
  because that default token name can't be overridden via `semanticTokens` in this
  setup — it keeps resolving to Chakra's own `gray.200`.)

  **SegmentedControl dark-mode selection.** Previously the selected indicator used
  `bg.surface`, which in dark resolves _darker_ than the track, so the active
  segment looked recessed and was barely distinguishable — and the `md` drop
  shadow is invisible on a dark canvas. The indicator now rides on `bg.raised`, so
  the selected thumb reads as lifted above the `bg.subtle` track in both modes.
  Dark mode additionally gains a soft ambient shadow + translucent-white hairline
  edge on the thumb (a drop shadow alone doesn't register on dark), and a
  translucent-white hairline ring on the track so its bounds stay visible on any
  dark surface — without it the track vanishes on a same-or-lighter dark surface
  (e.g. a `bg.surface` card) and the control looks like floating text. Both rings
  are box-shadows, not borders, so the matched item-height math is preserved.

  Light mode is unchanged (verified pixel-identical; the dark-only treatment is
  scoped to `.dark`, and `bg.raised` resolves to the same `white` the indicator
  already used in light).

## 3.1.0-alpha.9

### Patch Changes

- c1afdc6: fix(InfoSprinkle): open on tap on touch devices

  `InfoSprinkle` is built on Chakra's `HoverCard`, whose underlying machine opens
  on mouse hover and on focus but ignores touch pointers. Browsers that focus the
  trigger on tap (e.g. Android Chrome) opened it anyway, but those that don't focus
  buttons on tap (e.g. iOS Safari) never did. The trigger now opens the card on tap
  on non-hover devices, while keeping the existing hover-to-open behaviour on
  desktop; dismissal continues to use the HoverCard's own tap-outside / blur
  handling. `open` / `defaultOpen` / `onOpenChange` continue to work for controlled
  usage, and any `iconButtonProps.onClick` you pass is still called.

  Also exports a new `useHasHover` hook used to detect hover-capable pointers.

## 3.1.0-alpha.8

### Patch Changes

- 73b3713: fix(dark-mode): make MDXEditor toolbar icons follow the color mode

  mdxeditor colors its toolbar icons with its own `--baseTextContrast` (its
  internal slate scale), which doesn't track our color mode. In dark mode every
  toolbar icon stayed near-black (`#1c2024`) and all but vanished against the dark
  toolbar — only undo/redo read at all, because their disabled state used a
  different (lighter) token.

  Flip the toolbar svgs onto the semantic `fg.default` token (and disabled
  buttons onto `fg.subtle`) so they resolve per color mode like the editor body
  text. The hover / pressed / toggled-on button backgrounds had the same problem
  (mdxeditor's `--baseBgActive` went light-grey in dark mode, hiding the icons on
  hover); those now use the semantic `bg.muted` hover token. Light mode is
  unchanged.

## 3.1.0-alpha.7

### Minor Changes

- f4911e5: feat(table): move the table baseline into the theme's `table` slot recipe

  A no-prop `<Table>` now renders the correct header/border/text/hover in both
  light and dark mode — consumers should only override for genuine per-row
  state or layout, instead of hand-rolling header bg, row borders, hover and
  row tints at every call site.
  - **Recipe base owns the defaults** (`theme.slotRecipes.table`, merged over
    Chakra's default recipe): `columnHeader` → `fg.muted` + medium weight +
    `bg.subtle` header surface + `border.subtle` bottom hairline; `row` →
    `border.subtle` bottom border; body text inherits `fg.default`. Chakra's
    `line` variant row bg (raw `bg` token — pure black in dark mode) is
    overridden to transparent so the surface behind the table shows through.
  - **Hover follows interactivity automatically**: `<Tr>` sets
    `data-interactive` when it receives `onClick` / `role="button"` /
    `tabIndex`, and the recipe keys cursor, `bg.muted` hover and a
    focus-visible outline off `&[data-interactive]`. Static tables never
    highlight.
  - **Row-state prop**: `<Tr state="selected" | "invalid" | "highlighted">`
    maps to new mode-aware semantic tokens `bg.selected` (← primary.lightest),
    `bg.invalid.subtle` (← danger.lightest) and `bg.highlighted`
    (← warning.lightest) — replaces hand-picked `primary.*`/`danger.*` tints.
  - **Sticky header**: `<Thead sticky>` pins the header
    (`position: sticky; top: 0`, opaque surface bg, hairline shadow so the
    collapsed border doesn't vanish on scroll).
  - **`Tr` forwards its ref**, so dnd-kit rows no longer need to drop to the
    raw Chakra `Table.Row`.
  - Sticky-column header cells now use the `bg.subtle` header surface instead
    of `bg.surface`, matching the rest of the header row.

  Audit note: the brand tint ramps (`*.lightest`/`*.extralight`/…) already
  carry `_dark` values (e.g. `primary.lightest` → `blue.900`), so the new
  state tokens inherit correct dark-mode tints.

## 3.1.0-alpha.6

### Patch Changes

- e0d64fe: fix(dark-mode): make Card edge visible + soften danger solid saturation
  - **Card border** `border.subtle` → `border.default`. `border.subtle`'s `_dark`
    step (`gray.1300` `#1E2433`) is nearly invisible on `bg.surface` in dark, so
    cards blended into the canvas (the card has no shadow — the border is its only
    boundary). `border.default` gives the card a discernible edge in both modes
    (light `gray.200` → `gray.300`; dark `gray.1300` → `gray.1100`). The `gradient`
    Card variant keeps its `primary.light` border.
  - **Danger solid saturation** lowered one notch: `rose.500` `#D01721` → `#C1232C`
    and `rose.600` `#A6121A` → `#9C1C23` (the solid destructive button's rest/hover
    fills, and `danger.main`). Luminance-preserving desaturation, so contrast with
    white labels is essentially unchanged (~5.5:1, AA). The deprecated `red.*`
    alias is kept in sync. Text/active steps (`rose.700+`) and light tints are
    untouched.

## 3.1.0-alpha.5

### Patch Changes

- 9d7094e: fix(dark-mode): brighten `fg.muted` in dark from `gray.400` to `gray.300`

  Secondary text (`fg.muted`) read as too dim on the dark canvas, sitting too far
  below `fg.default` (`gray.200`). Lifting its `_dark` step to `gray.300` restores
  the one-step hierarchy gap that light mode has (default → muted) while keeping
  well clear of AA (~12.8:1 on `bg.canvas`, ~11.7:1 on `bg.surface`). Light value
  (`gray.900`) is unchanged, so light mode is unaffected.

## 3.1.0-alpha.4

### Patch Changes

- fbf170f: fix(dark-mode): flip FileInput upload panel + LineGraph tooltip label

  Two non-flipping colors the earlier scan missed:
  - `FileInput` inner upload panel was hardcoded `rgba(255, 255, 255, 0.85)` — a white
    block on the image/video pages that never flipped in dark mode (consumers were
    patching it with a scoped `_dark` CSS override on `containerStyle`). It now uses
    `color-mix(in srgb, var(--chakra-colors-bg-surface) 85%, transparent)`, so it flips
    with the mode while keeping the 85% translucency that lets `bgImage` peek through on
    hover. Light mode is unchanged.
  - `LineGraph` tooltip label was `color: 'gray.1500'`, an invalid CSS value recharts
    can't resolve (it doesn't resolve Chakra tokens — the axes already use CSS vars for
    this reason). Switched to `var(--chakra-colors-gray-1500)`.

  Docs: `src/theme/claude.md` and `src/components/claude.md` now document the neutral
  `bg.*`/`fg.*`/`border.*` semantic tokens and direct contributors to use them (instead
  of raw `gray.*`/`white`) so new components flip in dark mode by default.

## 3.1.0-alpha.3

### Patch Changes

- fdd7b3f: fix(Textarea): allow callers to override the resting `borderColor`

  `Textarea` hardcoded its resting border (`danger.main` when invalid, otherwise the
  `{ base: 'gray.400', _dark: 'gray.1100' }` mode-aware default), mirroring `Input`.
  The `borderColor` prop is now destructured and used as
  `borderColor ?? (invalid ? 'danger.main' : <default>)`, so an explicit value wins
  while the invalid and light/dark fallbacks are preserved. This matches the
  behavior added to `Input`.

## 3.1.0-alpha.2

### Patch Changes

- 04db3be: fix(Input): allow callers to override the resting `borderColor`

  `Input` hardcoded its resting border (`danger.main` when invalid, otherwise the
  `{ base: 'gray.400', _dark: 'gray.1100' }` mode-aware default), so a `borderColor`
  prop passed by a caller could not reliably set the default border. The prop is now
  destructured and used as `borderColor ?? (invalid ? 'danger.main' : <default>)`,
  so an explicit value wins while the invalid and light/dark fallbacks are
  preserved.

## 3.1.0-alpha.1

### Patch Changes

- 88b9e82: fix(dark-mode): flip remaining light-only cosmetic spots

  A few non-flipping bits stayed light on the dark canvas; map them to semantic
  tokens so they follow the mode:
  - `InlineCode` chip background `gray.50` → `bg.subtle`.
  - `CopyableCode`'s sticky copy-button fade gradient ended in `#fff` → now the
    `bg.surface` CSS var, so it fades into the card instead of flashing white.
  - `MDXEditor` block-type select: the toolbar trigger and its portaled dropdown
    popup/items now resolve onto `bg.surface`/`fg.default` (with a `bg.muted`
    highlight) instead of mdxeditor's default white.

  Light mode is unchanged (all values resolve to their previous light colors).

- 233077f: fix(dark-mode): migrate remaining non-flipping primitives to semantic tokens

  A full-repo scan surfaced color values that stayed fixed across modes; map them
  to semantic tokens so they flip. Two were dark-mode bugs:
  - `SegmentedControl` selected-segment label was `gray.1500` (near-black) on the
    dark indicator → now `fg.default`, legible in both modes.
  - `Card` `gradient` variant was a hardcoded light gradient (`#F5F8FD→#FFF`) → now
    `bg.subtle → bg.surface` with a `primary.light` border, so it flips.

  Plus: CollapsibleTrigger hover, FileInput upload area, InfoSprinkle icon,
  Pagination nav arrows, DatePicker calendar icons, PinInput border, and the
  neutral progress/slider/switch/spinner/radial-progress **tracks** (`gray.200`
  family → `bg.muted`). White slider knobs and brand/solid fills are intentionally
  left as-is (they must stay visible / are mode-invariant by design). Light mode
  is preserved aside from ~1-step token-mapping shifts.

- 01fa8b4: fix(dark-mode): soften default text color (gray.50 → gray.200)

  Primary text on the dark canvas resolved to `gray.50` (~18.3:1) — brighter than
  the light-mode baseline (~15.3:1) and close to pure white, which reads as harsh
  and causes glare/halation on longer text. `fg.default`'s `_dark` value now
  resolves to `gray.200` (~15.4:1 on the canvas), matching the light-mode contrast
  while staying AAA. The `.dark` body-text fallback in `globalCss` is aligned to
  match. Light mode is unchanged, and `fg.muted`/`fg.subtle` are untouched so the
  text hierarchy is preserved.

## 3.1.0-alpha.0

### Minor Changes

- 57c14b9: feat: dark mode — semantic token layer, color-mode runtime, and full component adoption

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
  - _Surfaces & overlays_: Card, Input, Textarea, Select/Combobox, Section/Page
    loaders, Table, RadialProgress, ErrorFallback card, SegmentedControl track,
    RangeDatePicker popover; overlays (Menu/Modal/Popover/Toast) realign onto the
    slate scale via a `bg.panel` `_dark` override. The Menu uses a dark drop
    shadow in dark mode (was a near-white glow).
  - _Text & icons_: foreground colors migrated to `fg.*` across Typography
    (Text/Subtitle/Subtext/H3), Button/Chip/Tag/Badge neutral variants, FormLabel,
    MaxLengthIndicator, Table head/body, IconButton, Tabs, SegmentedControl,
    FileItem, FileList, MonthPicker, Code, CodeTabs, SeeMoreButton, ErrorFallback,
    DatePickers, Markdown/MDXEditor content, and Menu items.
  - _Borders & dividers_: migrated to `border.*` across FileInput, Popover
    (content + arrow), TabList, Avatar, MenuList, ModalFooter, FileList, FileItem,
    Collapsible, TableContainer, SeeMoreButton, SliderThumb, Checkbox.
  - _Neutral soft fills_ (Button/Chip/Tag) flip their surface + border instead of
    leaving light-on-light text on dark.
  - _LineGraph_ feeds recharts CSS-var strings (`var(--chakra-colors-*)`) for axis
    labels and grid, since recharts does not resolve Chakra tokens.

  **Contrast / accessibility (also affects light mode)**

  A WCAG pass on the dark-mode pairs drove a few brand adjustments that, by
  design, also apply in light:
  - Solid `Button`/`IconButton`/`Chip`/`Tag` fills are pinned to their saturated
    primitive steps so they are mode-invariant (they no longer lighten to the
    bright `*.300` step in dark, which had dropped white-on-fill contrast to
    ~1.8–4.5:1). White labels keep their light-mode contrast in both modes.
  - Solid **warning** uses a dark label (`gold.900`) in both light and dark —
    white-on-gold was 2.39:1 (failing AA in _both_ modes); it is now 6.7:1.
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

## 3.0.2

### Patch Changes

- ae69640: fix(Textarea): allow callers to override the resting `borderColor`

  `Textarea` hardcoded its resting border to `gray.400` (or `danger.main` when
  invalid), mirroring `Input`. The `borderColor` prop is now destructured and used
  as `borderColor ?? (invalid ? 'danger.main' : 'gray.400')`, so an explicit value
  wins while the invalid and default fallbacks are preserved. This matches the
  behavior added to `Input`.

## 3.0.1

### Patch Changes

- b968351: fix(Input): allow callers to override the resting `borderColor`

  `Input` hardcoded its resting border to `gray.400` (or `danger.main` when
  invalid), so a `borderColor` prop passed by a caller could not reliably set the
  default border. The prop is now destructured and used as `borderColor ?? (invalid
? 'danger.main' : 'gray.400')`, so an explicit value wins while the invalid and
  default fallbacks are preserved.

## 3.0.0

### Major Changes

- a827f0f: feat!: Chakra UI v3 migration with Golden Ratio Color System

  Complete migration to Chakra UI v3 with comprehensive design system overhaul and component architecture improvements.

  ## Breaking Changes

  ### Dependencies
  - **Chakra UI**: v2.8 → v3.3 (major upgrade)
  - **Removed peer dependencies**: `@emotion/styled`, `framer-motion` (no longer required in Chakra v3)
  - **Next.js**: Now supports Next.js 16 (peer dependency range extended to `^13.0.0 || ^14.0.0 || ^15.0.0 || ^16.0.0`)
    - All Next.js navigation APIs (`useRouter`, `usePathname`, `useSearchParams`) and `next/link` remain fully compatible
    - No breaking changes to Next.js integration in logician-ui components
  - **chakra-dayzed-datepicker**: upgraded to v3.0.0 for Chakra v3 compatibility

  ### Removed Components

  The following components have been removed:
  - **Alert** - Use Chakra UI's native Alert component instead
  - **AutowidthInput** - Functionality can be achieved with regular Input
  - **Carousel** & **CarouselModal** - Use external carousel libraries
  - **Chip** - Replaced by enhanced Tag component with variants
  - **DataField** - Use Field component from Chakra v3
  - **GuideCue** - Use Tooltip or Popover components
  - **UrlInput** - Use regular Input component

  ### Component API Changes

  All components have been migrated to Chakra UI v3 APIs:
  - **Button & IconButton**: `colorScheme` → `colorPalette`, new two-dimensional variant system (solid/outline/soft/ghost × primary/secondary/danger/success/warning)
  - **Tag**: Enhanced with `colorPalette` prop and comprehensive variant support, replacing Chip functionality
  - **Accordion**: New composition pattern with AccordionPanel component
  - **Checkbox**: Updated to v3 composition API, `children` prop removed (use explicit label patterns instead)
  - **Radio**: Updated to v3 composition API
  - **Switch**: Updated to v3 composition API, `children` prop removed (use explicit label patterns instead)
  - **Slider**: Updated to v3 composition API with SliderControl and SliderThumbs components
  - **Tabs**: Updated to v3 composition API and context management
  - **Toast**: New v3 API with backward compatibility wrapper
  - **Tooltip**: Updated to v3 Popover-based implementation
  - **Modal**: Migrated to Dialog component (v3)
  - **Menu**: Updated to v3 composition pattern
  - **Select**: Updated styling for v3 compatibility
  - **PasswordInput**: Enhanced stories and v3 compatibility

  ### Removed Deprecated v2 Props

  All deprecated Chakra UI v2 props have been removed. TypeScript will now error for any usage of old prop names, forcing migration to v3 syntax:
  - **Button**: Removed `colorScheme`, `isLoading`, `isDisabled`, `leftIcon`, `rightIcon`
  - **IconButton**: Removed `colorScheme`, `isLoading`, `isDisabled`, `icon`
  - **Input**: Removed `isDisabled`, `isInvalid`, `isReadOnly`
  - **Checkbox**: Removed `isChecked`, `isDisabled`, `isInvalid`
  - **Switch**: Removed `isChecked`, `isDisabled`
  - **Textarea**: Removed `isDisabled`, `isInvalid`, `isReadOnly`
  - **Tooltip**: Removed `label`, `hasArrow`, `isDisabled`, `isOpen`
  - **Modal**: Removed `isOpen`, `onClose`
  - **Toast**: Removed `position`, `isClosable`
  - **Accordion**: Removed `allowToggle`, `allowMultiple`
  - **Tag**: Removed `TagColorScheme` type alias
  - **Slider**: Removed `onChange`, `focusThumbOnChange`; changed `value`/`defaultValue` types to `number[]` only

  ## New Features

  ### Chakra UI v3 Primitives

  Added `primitives.ts` for advanced composition patterns:

  ```tsx
  import {
    V3Checkbox,
    V3RadioGroup,
    V3Switch,
    V3Slider,
  } from '@mindlogic-ai/logician-ui';

  // Use raw Chakra v3 components for maximum flexibility
  <V3Checkbox.Root>
    <V3Checkbox.HiddenInput />
    <V3Checkbox.Control>
      <V3Checkbox.Indicator />
    </V3Checkbox.Control>
    <V3Checkbox.Label>Label</V3Checkbox.Label>
  </V3Checkbox.Root>;
  ```

  Available primitives: `V3Checkbox`, `V3RadioGroup`, `V3Switch`, `V3Slider`, `V3Field`, `V3PinInput`, `V3NumberInput`, `V3Dialog`, `V3Menu`, `V3Popover`, `V3Tooltip`, `V3Accordion`, `V3Collapsible`, `V3Tabs`, `V3Avatar`, `V3Badge`, `V3Card`, `V3Table`, `V3Tag`, `V3Progress`, `V3Breadcrumb`, `V3List`

  ### Golden Ratio Color System

  Complete redesign of the color palette using mathematically harmonious color relationships based on the golden ratio (φ ≈ 1.618).

  #### New Color Primitives
  - **Blue** (`blue.50` - `blue.900`): Primary brand color palette
  - **Rose** (`rose.50` - `rose.900`): Danger/error states (replaces `red`)
  - **Green** (`green.50` - `green.900`): Success states
  - **Violet** (`violet.50` - `violet.900`): Secondary/accent color (replaces `purple`)
  - **Gold** (`gold.50` - `gold.900`): Warning states (replaces `yellow`)
  - **Gray** (`gray.0` - `gray.1500`): Extended 16-shade slate-based gray scale with cool blue undertone

  #### Semantic Token Updates

  All semantic tokens now reference the new primitive palettes:
  - `primary.*` → Blue palette (#1751D0 main)
  - `secondary.*` → Violet palette (#9117D0 main)
  - `danger.*` → Rose palette (#D01721 main)
  - `success.*` → Green palette (#1AA612 main)
  - `warning.*` → Gold palette (#D0A117 main)

  Each semantic category includes `lightest` and `darker` variants:

  ```tsx
  primary.lightest; // #E8EEFB
  primary.darker; // #04102A
  ```

  #### Gray Scale Changes
  - Added `gray.0` (#FDFDFF) for pure background
  - All gray values updated with blue undertone
  - Default body text changed from `gray.1500` to `gray.1300` (#1E2433)

  #### WCAG Accessibility

  All semantic color combinations meet WCAG 2.1 AA standards (4.5:1 minimum contrast).

  #### Color Breaking Changes
  - Gray palette values have changed significantly (now slate-based with blue undertone)
  - `primary.light` now maps to `blue.200` (#7DA0E8) instead of `blue.300`
  - `primary.main` now maps to `blue.500` (#1751D0) instead of `blue.900`
  - Default body text color changed to `gray.1300` (#1E2433)
  - Button hover states updated to use new palette shades

  #### Legacy Aliases (Deprecated)

  For backwards compatibility:
  - `purple.*` → maps to `violet.*`
  - `red.*` → maps to `rose.*`
  - `yellow.*` → maps to `gold.*`

  ### Component Enhancements
  - **Button/IconButton**: New soft variant, two-dimensional variant system, updated hover states
  - **Tag**: Full variant system replacing Chip component
  - **Badge**: Enhanced with new color palette
  - **Banner**: Updated styles for new color system
  - **Typography**: All components updated with new color tokens
  - **Breadcrumb**: v3 composition pattern support
  - **PasswordInput**: New comprehensive stories

  ## Migration Guide

  ### Dependency Updates

  ```bash
  # Update package.json
  npm install @chakra-ui/react@^3.3.0

  # Remove old peer dependencies (no longer needed)
  npm uninstall @emotion/styled framer-motion
  ```

  ### Replacing Removed Components

  ```tsx
  // Alert: Use Chakra's native Alert
  import { Alert } from '@chakra-ui/react';

  // Chip: Use Tag component
  import { Tag } from '@mindlogic-ai/logician-ui';
  <Tag colorPalette="primary" variant="solid">
    Chip content
  </Tag>;

  // DataField: Use Field component
  import { V3Field } from '@mindlogic-ai/logician-ui';

  // GuideCue: Use Tooltip
  import { Tooltip } from '@mindlogic-ai/logician-ui';
  ```

  ### Component API Updates

  ```tsx
  // Button/IconButton: colorScheme → colorPalette
  <Button colorPalette="primary" variant="solid">Submit</Button>
  <IconButton colorPalette="danger" variant="outline" aria-label="Delete" />

  // Tag: New enhanced API
  <Tag colorPalette="success" variant="soft">Active</Tag>

  // Checkbox/Switch: children prop removed
  // Before: <Checkbox>Accept terms</Checkbox>
  // After: Use Chakra v3 primitives for labels
  import { V3Checkbox } from '@mindlogic-ai/logician-ui';
  <V3Checkbox.Root>
    <V3Checkbox.HiddenInput />
    <V3Checkbox.Control>
      <V3Checkbox.Indicator />
    </V3Checkbox.Control>
    <V3Checkbox.Label>Accept terms</V3Checkbox.Label>
  </V3Checkbox.Root>

  // Slider: New composition pattern
  <Slider defaultValue={[50]}>
    <SliderControl>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
  ```

  ### Color Token Updates

  ```tsx
  // Update semantic token references
  color: 'primary.main'; // #1751D0 (was different in v2)
  color: 'danger.main'; // #D01721 (rose-based)
  color: 'gray.1300'; // #1E2433 (default text)
  bg: 'gray.0'; // #FDFDFF (pure background)
  ```

  ## Documentation
  - Component migration patterns: See updated Storybook stories
  - Color system: `src/theme/Palette.stories.tsx`
  - Theme documentation: `src/theme/claude.md`
  - Chakra v3 primitives: `src/primitives.ts`

- 11ea169: feat(Code)!: migrate Code component to Chakra UI v3's `CodeBlock` with its built-in Shiki formatter, replacing the `react-syntax-highlighter` implementation. The `Code` component keeps the `children`, `language`, `onCopy`, `hideHeader`, and `containerProps` props. Removes the `react-syntax-highlighter` and `@types/react-syntax-highlighter` dependencies and adds `shiki` (loaded on demand). The copy button is now rendered by `CodeBlock.CopyTrigger`; the user-supplied `onCopy` callback still fires with the copied text after the trigger copies to the clipboard.

  BREAKING: the raw/preview Markdown toggle that `Code` showed when `language === 'markdown'` has been removed. `Code` now always renders a syntax-highlighted block. Along with it, the `code_markdown_raw` and `code_markdown_preview` translation keys are removed.

- 61646cf: **Breaking: Checkbox, Switch, and Radio are now compound components**

  `Checkbox`, `Switch`, and `Radio` no longer render their internal controls automatically. You must now compose them explicitly using sub-components.

  **Checkbox**
  - `Checkbox` is now the root element (replaces `Checkbox.Root`)
  - `Checkbox.Control` renders the styled checkbox box
  - `Checkbox.Label` renders the label text

  **Switch**
  - `Switch` is now the root element
  - `Switch.Control` renders the styled toggle (includes thumb)
  - `Switch.Label` renders the label text

  **Radio**
  - `Radio` is now the root element (replaces the internal `RadioGroup.Item` wrapper)
  - `Radio.Indicator` renders the styled radio circle
  - `Radio.Text` renders the label text
  - `rootRef` and `inputProps` props removed

- 3a2a951: **Breaking: Menu refactored to compound component pattern**

  `Menu` is now the root element (wraps `ChakraMenu.Root`) with a `baseFontSize` prop (default `'14px'`). Menu content is automatically wrapped in `ScaledContext`. `MenuButton` is removed — use `Menu.Trigger asChild` instead.

  **Migration**

  ```tsx
  // Before
  <Menu.Root>
    <MenuButton as={Button}>Open</MenuButton>
    <MenuList><MenuItem value="x">Item</MenuItem></MenuList>
  </Menu.Root>

  // After
  <Menu>
    <Menu.Trigger asChild><Button>Open</Button></Menu.Trigger>
    <Menu.List><Menu.Item value="x">Item</Menu.Item></Menu.List>
  </Menu>
  ```

  Exposes: `Menu.Trigger`, `Menu.TriggerItem`, `Menu.ContextTrigger`, `Menu.List`, `Menu.Item`, `Menu.ItemGroup`, `Menu.ItemGroupLabel`, `Menu.ItemCommand`, `Menu.CheckboxItem`, `Menu.RadioItem`, `Menu.RadioItemGroup`, `Menu.Separator`, `Menu.Arrow`, `Menu.ArrowTip`

### Minor Changes

- 7e15535: Add `Collapsible` compound component (`Root`, `Trigger`, `Content`, `Indicator`) wrapping Chakra UI v3 Collapsible with Accordion-style defaults (bordered rounded container, bold trigger with chevron, padded content). Also fixes Avatar background, IconButton color precedence, Tooltip cloneElement removal, ModalFooter unused import, rollup CSS SSR injection, and removes unused `react-textarea-autosize` dependency.
- b180dcb: feat(Avatar): add Chakra v3 namespace pattern subcomponent exports

  Avatar now exposes subcomponents as namespace properties following the Chakra UI v3 pattern:
  - `Avatar.Root`
  - `Avatar.RootProvider`
  - `Avatar.Fallback`
  - `Avatar.Image`
  - `Avatar.Icon`
  - `Avatar.Group`
  - `Avatar.Context`

  fix(Popover): match arrow tip border color to content border color

  `Popover.Content` now renders with an explicit `1px gray.200` border and sets a `--popover-border-color` CSS variable. `Popover.ArrowTip` reads that variable so the arrow border stays in sync with the content border.

- c5eb2f7: Add `showLineNumbers` prop to `Code`. When enabled, the underlying Chakra `CodeBlock` renders a line-number gutter via its shiki adapter.
- e47db64: Color palette expansion, responsive typography, and component improvements

  ## Color Palette Expansion

  **New Color Levels:**
  - Added 25 shade to all primitive color palettes (blue, rose, green, violet, gold)
  - New lightest backgrounds: #F4F7FD (blue), #FDF5F5 (rose), #F4FDF4 (green), #FAF4FD (violet), #FDFBF4 (gold)

  **Semantic Token Changes (BREAKING):**
  - **NEW**: `lightest` → 25 shade (lightest backgrounds, ghost states)
  - **RENAMED**: Previous `lightest` → `extralight` (50 shade, extra-light backgrounds)
  - `lighter`, `light`, `main`, `dark`, `darker` remain unchanged

  **Migration Guide:**
  Replace all instances of `.lightest` with `.extralight`:

  ```tsx
  // Before
  <Badge bgColor="primary.lightest" />

  // After
  <Badge bgColor="primary.extralight" />
  ```

  Or use the new `lightest` for even lighter backgrounds:

  ```tsx
  <Badge bgColor="primary.lightest" /> // Now uses 25 shade
  ```

  **Component Updates:**
  - Badge, Chip, Tag: Updated to use `extralight`
  - Toast, Banner: Updated to use `extralight`
  - Button soft variant: Updated to use `extralight`

  ## Responsive Typography System

  **Typography Updates:**
  - Override Chakra v3 default textStyles (2xs-7xl) with responsive scaling
  - Mobile: base size, Desktop (md+): one size up for better readability
  - Update custom Logician textStyles (h1-h5, p, subtitle, subtext) with consistent scaling
  - Update Palette storybook to reflect actual theme values

  ## Modal Component API Changes (BREAKING)

  **API Changes:**
  - Remove auto-rendered `<ModalOverlay />` from Modal component
  - Remove Portal wrapper from ModalContent for simpler composition
  - Users must now explicitly add `<ModalOverlay />` when using Modal

  **Migration:**

  ```tsx
  // Before
  <Modal open={isOpen}>
    <ModalContent>...</ModalContent>
  </Modal>

  // After
  <Modal open={isOpen}>
    <ModalOverlay />
    <ModalContent>...</ModalContent>
  </Modal>
  ```

  ## Component Improvements

  **Bug Fixes:**
  - Button: Remove fontSize override for xs size (now handled by theme)
  - InfoSprinkle: Add optional chaining for iconButtonProps.size
  - Markdown: Reduce gap from 1.2em to 1em for better spacing
  - Pagination: Add whiteSpace="nowrap" to items per page label

  ## Documentation Updates
  - Updated theme/CLAUDE.md with new color tables and semantic token mappings
  - Updated all inline comments in colors.ts
  - Palette Storybook automatically displays new lightest shade

  ## WCAG Compliance

  All existing WCAG AA compliance maintained - no changes to `main`, `dark`, or `darker` mappings

- 4b689ee: feat(Code): bundle the Stata grammar

  Adds `stata` to `shikiAdapter`'s preloaded `langs`. Several consumers
  (notably FactChat / academic users) pass `language="stata"` to `<Code>`
  and were hitting `ShikiError: Language not found`. Surfaces in the
  Storybook language dropdown automatically via `BUNDLED_LANGUAGES`.

- a6a7811: feat(Code): bundle 11 additional Shiki language grammars

  Expand `shikiAdapter`'s preloaded `langs` from 17 to 28 by adding `c`, `csharp`, `dart`, `dockerfile`, `kotlin`, `lua`, `matlab`, `mermaid`, `r`, `ruby`, `toml`. Selected based on consumer Sentry signals (FactChat hit `ShikiError: Language not found` for `r`, `c`, `cpp`, `stata` between 2026-04-30 and 2026-05-07) and prevalence in academic / programming-student use cases.

  Bundle delta: ~376 KB raw / ~75 KB gzipped (+30% on the grammar bundle alone). Heavyweights deliberately excluded — `cpp` (464 KB), `swift` (104 KB), `php` (116 KB), `objective-c` (112 KB) — consumers can map these to syntactically-similar bundled grammars (e.g. `cpp → java`) for best-effort highlighting.

- e144f01: feat(Code): extract `shikiAdapter` into its own module and refine default surface
  - Move the inline `createShikiAdapter` call out of `Code.tsx` into `src/components/Code/shikiAdapter.ts`, so the adapter can be reused across code-rendering components (e.g. `CodeTabs`) and is easier to type and swap.
  - Type the adapter against `HighlighterGeneric<BundledLanguage, BundledTheme>` imported from `shiki` instead of `any, any`.
  - Simplify the default Code header: drop the `primary.light` bottom border, drop the `textStyle="xs"` title override, and drop the `borderRadius="none"` override on the root so the component respects the token default.
  - Switch the root `textStyle` default from `"p"` to `"Body"` and set `borderColor="gray.300"` so the component matches surrounding surfaces.
  - Show a `FaCheck` success indicator in the copy trigger when copying succeeds.

- de10bd4: feat: add consistent keyboard focus ring across interactive components

  Introduces a shared `focusRing` utility (`src/utils/focusRing.ts`) and applies the standard double-ring focus style (white inner + primary blue outer) to all keyboard-navigable components: Button, IconButton, Checkbox, Radio, Switch, SliderThumb, AccordionButton, MenuItem, BreadcrumbLink, and Chip.

  Focus ring now only shows on keyboard navigation (`_focusVisible`) rather than on mouse click (`_focus`), following the CSS `:focus-visible` standard used by GitHub, Radix, and Material Design.

- 63fa11b: Add FormIntegration component and improve Chakra UI v3 compatibility
  - Add new FormIntegration component with comprehensive documentation
  - Enhance LogicianProvider with Chakra UI v3 patterns and better theme integration
  - Update form components (Select, Input, Textarea) for v3 compatibility
  - Add comprehensive Storybook stories for Avatar, IconButton, and InfoSprinkle
  - Refine theme configuration and global styles for better consistency
  - Improve component exports in main index file

- 541a14b: Add `baseFontSize` prop to `InfoSprinkle` (default `14px`), matching `Popover`'s scaling behavior via `ScaledContext`. Optimize `ScaledContext` so token-to-em conversion is computed once per Chakra system via a module-level `WeakMap` cache (shared across all instances) and memoize the merged inline style. Move `Popover`'s runtime context (`PopoverContext`, `usePopoverContext`) out of `Popover.types.ts` into a dedicated `Popover.context.ts`. Fix `Code` to merge `meta` from `containerProps` and root props instead of overwriting it, and restore `ModalHeader`'s `borderTopRadius="l3"` default.
- a1d012f: feat: FormLabel RequiredIndicator, Select styles fix, Badge sizes, FileItem tooltips/download loading, Input bg, MonthPicker showClearButton rename
  - FormLabel: show Field.RequiredIndicator when FormControl has required prop (via Chakra v3 Field context)
  - Select: pass Logician-merged styles as base to consumer style callbacks (fixes Pagination border color)
  - Select: fix option flicker on mouse leave by removing isFocused from background condition
  - Badge: add size prop (sm/md/lg) with textStyle presets (subtext/subtitle)
  - FileItem: add tooltips on download/delete icons, add isDownloading prop with spinner
  - Input: set default background to white
  - MonthPicker: rename showResetButton to showClearButton

- 1656cbc: Add `Popover` compound component

  Wraps Chakra's Popover with a `baseFontSize` prop (default `'14px'`) passed via context to `Popover.Content`, which wraps its children in `ScaledContext`. `Positioner` is hidden inside `Popover.Content`.

  Exposes: `Popover.Anchor`, `Popover.Trigger`, `Popover.Content`, `Popover.Arrow`, `Popover.ArrowTip`, `Popover.CloseTrigger`, `Popover.Header`, `Popover.Body`, `Popover.Title`, `Popover.Description`, `Popover.Footer`.

- e45787d: feat(Modal): add `fullScreenOnMobile` prop and scope base font to 14px
  - Add `fullScreenOnMobile` prop to `Modal` (default: `true`). When true, the modal becomes fullscreen (100vw × 100dvh, no border-radius) on mobile viewports. When false, horizontal margin (`mx: 4`) is applied instead — suitable for confirm dialogs and small modals.
  - Wrap `ModalContent` children in `ScaledContext fontSize="14px"` so all modal typography and spacing scales to a 14px base without affecting the global font size.
  - Expose `useModalContext` hook for consuming `fullScreenOnMobile` in custom modal content components.

- 73d2e60: feat(Select): replace react-select with Chakra-based Select and Combobox

  The `Select` component is no longer a `react-select` wrapper. It is now a
  compound-component namespace built on Chakra v3's Select primitives and
  styled to match `Input` (border, hover, focus, invalid and disabled
  states share the same tokens). A matching `Combobox` namespace is added
  for searchable selects.

  Two convenience components cover the common single-select case:
  - `SelectField` — single-select dropdown (`options` / `value` / `onChange`)
  - `ComboboxField` — searchable single-select with text filtering

  ### Breaking change

  The previous `react-select` API is removed. Consumers of `<Select />`
  should migrate to `<SelectField />`:

  ```tsx
  // Before
  <Select options={options} value={selectedOption} onChange={handleChange} />

  // After
  <SelectField options={options} value={value} onChange={handleChange} />
  ```

  `value` / `onChange` now work with the option's `value` (`T`) directly
  rather than the whole option object. The `react-select`-specific props
  (`styles`, `isMulti`, `isSearchable`, `menuPlacement`, …) no longer
  exist — use the `Select` / `Combobox` namespaces for multi-select,
  grouped options and custom layouts.

  The `react-select` and `@tanstack/react-virtual` dependencies have been
  dropped.

- 9c8ef73: Add `ScaledContext` component

  Wraps a `Box` with a given `fontSize` and re-maps spacing/sizes tokens from `rem` to `em`, so all spacing inside scales proportionally with the local font size. Useful for embedding UI at different densities without duplicating theme tokens.

### Patch Changes

- 04b32cf: chore(Card): remove unused `.card-image` CSS hook

  The `.card-image` selector was a consumer-facing CSS hook intended to be
  applied to image children of `<Card>` for hover-scale and smooth-transition
  effects, but no consumers ended up adopting it. Removing the dead styles
  (and the now-unused `mergeCss` indirection in `Card.tsx`).

- 0641e41: feat(Checkbox): add inputRef prop to forward ref to the hidden input element
- f52deaa: fix(Code): render copy button as floating overlay when `hideHeader` is true

  Previously, setting `hideHeader` removed the entire header — including the copy
  button — even when `onCopy` was provided. The copy trigger now renders as a
  top-right overlay (`IconButton` ghost variant with a tooltip, matching the
  `CodeTabs` copy button) whenever the header is hidden but `onCopy` is set.
  Positioned at `top={2} right={3}` so the icon sits in the upper-right corner
  without overlapping the first line of code. Exposes `.ml-code-copy` className
  hook for consumer overrides.

- 1595e85: fix: override Chakra spacing scale with em units

  Numeric spacing tokens (p: 4, gap: 2, etc.) now resolve to em values
  instead of rem, so spacing cascades from the nearest ancestor font-size
  alongside text — enabling consistent contextual scaling.

- 5edf7a7: fix: switch theme textStyles font sizes from rem to em for contextual scaling

  em units inherit from the nearest ancestor font-size, enabling components inside
  containers like Popover to scale from a local base (e.g. 14px) rather than
  always deferring to the html root.

- e7627c9: fix: replace compounding em lineHeight on 6xl textStyle with unitless ratio

  `lineHeight: '5.75em'` resolved against the element's own font-size (60px),
  producing 345px instead of the intended 92px. Replaced with unitless `1.533`
  (92 ÷ 60) to preserve the original rendered output.

- cc60a0d: fix: remove borders from soft button variants; improve Toast close button contrast and description styling; fix ghost button text color to use gray.1200
- daebe15: fix(Card, Chip, Button, Checkbox): style consistency and runtime error fixes
  - Card: move `transition` into `css` prop to prevent Chakra v3 runtime error when `clickable` is combined with `_hover`; deep-merge `_hover` so user-passed hover styles don't clobber clickable hover styles
  - Chip: align neutral `solid`/`soft`/`outline` border colors with Tag (add missing `borderColor` on solid/soft, fix outline from `gray.700` → `gray.500`)
  - Button: add `transform: scale(0.97)` to all `_active` states; fix primary/secondary soft active color (`*.light` → `*.lighter` to match hover)
  - Checkbox: add `bgColor: gray.300` to `_disabled` state on root

- 867370b: fix(Card): hoist `.card-image` transition and merge consumer `css`
  - Move the `.card-image` transition onto the element itself so it animates on both enter and exit, not only while hovered
  - Replace the hardcoded `transition: '0.3s all'` string (which the Chakra v3 style walker can't traverse as a value inside `_hover`) with token-backed `transitionProperty`/`transitionDuration`/`transitionTimingFunction` on the root and style-object form on `.card-image`
  - Use `mergeCss` so consumer `css` composes with the library base styles instead of being overwritten by the trailing rest spread

- c4fb34e: fix(Checkbox): move disabled fill styling to CheckboxControl for correct visual targeting
- e144f01: fix(CodeTabs): stabilize panel width and split `CopyButton`
  - Stack all language panels inside a single CSS grid cell so the container sizes to the widest panel. Non-selected panels use `visibility: hidden` + `aria-hidden` so they still contribute to intrinsic width without being interactive or announced to assistive tech. This eliminates the width jitter that occurred when switching between tabs whose code samples have different maximum line lengths.
  - Extract `CopyButton` into its own module (`CodeTabs/CopyButton.tsx`) and drop the inner `TabPanels`/`TabPanel` wiring in favor of rendering `Code` panels directly.

- fe346a9: fix: preserve library `css` prop against consumer overwrite across components

  Several components defined a library `css` prop (typically CSS custom properties or nested selector blocks) but applied it BEFORE `{...rest}`, letting a consumer's `css` silently clobber it. Switched every site to destructure `css` from props and compose via `mergeCss(libraryCss, css)` applied AFTER `{...rest}`, so consumer styles merge with library styles instead of replacing them.

  Also replaces the hardcoded `css={{ transition: 'all 0.25s ease-in-out' }}` on `Button` with `transitionProperty`/`transitionDuration`/`transitionTimingFunction` props to avoid the Chakra v3 style walker choking on the shorthand transition string when combined with state pseudos.

  Components fixed:
  - Button: swap hardcoded transition string for token-backed transition props
  - Input, RadioGroup, SegmentedControl, Spinner, Tab, TabList, Tbody, Tooltip: merge consumer `css` with library `css` instead of letting `{...rest}` overwrite it

- 7f3d81d: fix: load Pretendard Variable and Inter fonts from CDN in LogicianProvider

  Previously no fonts were loaded by the library, causing browsers to fall back to system fonts (Arial/Helvetica) which rendered English text noticeably thicker than intended. LogicianProvider now automatically injects stylesheet links for Pretendard Variable (jsDelivr, dynamic subset) and Inter (Bunny Fonts) on mount. A `loadFonts` prop (default `true`) allows consumers to opt out if they manage fonts themselves. Also adds `-webkit-font-smoothing: antialiased` to global styles for consistent rendering across OS.

- dda5b3d: fix(MenuItem): remove narrowed onClick override, inherit correct type from ChakraMenuItemProps
- 272e59f: fix(ModalHeader): restore default textStyle="h4" on ModalHeader
- 1630c8e: fix(ModalHeader): remove hardcoded textStyle from ModalHeader to allow consumers to control typography
- 9a9c8e7: fix: PR #55 review feedback - Tabs v3 migration, createIcon optimization, SegmentedControl theme tokens, LogicianProvider Toaster removal
- 7ca7b1d: Fix RadialProgress useToken hooks rule violation
  - Resolve "Rendered fewer hooks" error by calling useToken at component top level instead of inside map callbacks

- e144f01: fix(RadialProgress): hide segments with zero value

  Previously, zero-value segments were still rendered at the minimum arc size (and still consumed gap budget), producing visible slivers for categories that should not appear at all. Zero-value segments are now filtered out before layout, so only segments with `value > 0` contribute to the visible count, the gap calculation, and the arc layout.

- a4ce2dc: Fix release workflow alternating alpha bump failure

  Remove `changeset pre exit` step from release workflow — it was committing `pre.json` with `mode: "exit"` back to dev, causing the next run's `pre enter alpha` to no-op and `changeset version` to exit pre-release instead of bumping alpha. Also resets `pre.json` to `mode: "pre"`.

- 69c85f5: Fix TagCloseButton missing cursor pointer on hover

  Fix Tag size prop type error by using TagRootProps instead of BoxProps

- 2eec3f8: Fix vertical Tab indicator: use Chakra-native left-side indicator; suppress horizontal \_after

  Vertical selected tab now shows a left-side 2px indicator using Chakra's built-in `--indicator-offset-x`, `--indicator-offset-y`, and `--indicator-thickness` CSS variables. Adds `_after: { content: 'none' }` to `verticalSelectedStyles` so the horizontal bottom-bar pseudo-element (from `_selected`) does not bleed through on vertical tabs.

- 070588f: Fix Icon color to use currentColor, add default color/colorPalette to IconButton, update global fontWeight to 500
- 5361a87: Set default icon color to `gray.600`
- 515d7ea: fix: improve locale type safety and fix date format issues
  - Add `SupportedLocale` union type derived from LOCALE_MAP keys, applied to LogicianProvider, useLocale, and all date helper functions
  - Export `useLocale`, `LocaleContext`, and `LocaleContextValue` from package entry point
  - Fix 2-digit year format (yy → yyyy) in getDefaultFullDateFormat
  - Fix RangeDatePicker showing raw format string as end-date placeholder

- d971f4c: feat(Modal): bake in Dialog.Backdrop overlay by default

  Modal now renders the backdrop overlay internally, matching the Chakra v2 behavior where the overlay was included automatically. Users no longer need to render `<ModalOverlay />` manually inside `<Modal>`.

- aa5e009: Various component fixes
  - SegmentedControl: fix sizing, layout shift on selection, and font size scaling with size prop
  - FileInput: use Text instead of Subtext for upload label
  - MenuItem: apply danger.lightest hover background for danger variant
  - ModalCloseButton: simplify using IconButton

- 14528d9: style(Select, Textarea): align default look with Input

  The `Select` and `Textarea` components now mirror `Input` so the three
  form controls feel like one set. Concretely:

  ### Select
  - `borderColor` `gray.400` (was `gray.300`)
  - `_hover` border `primary.lighter` (was `gray.400`)
  - `_focus` border `primary.main` + 1px `outline` of the same color
    (matches Chakra v3 `Input` recipe's `focusVisibleRing: "inside"`,
    so the focused control reads as roughly 2px thick — was just 1px
    border with no outline)
  - `_invalid` border `danger.main` — unchanged
  - font size `1em` (was hardcoded `14px`) so it inherits the same
    responsive size as Chakra v3's `Input` `md` recipe
  - font weight `500` (was `600`)
  - selected value color `gray.1300` (was `gray.1200`) — matches the body
    text color used by `Input`
  - left padding `12px` (was `4px`) — matches Chakra v3 `Input` `md`
  - disabled state: `bg gray.50`, `color gray.1000`, `fontWeight 600`,
    `cursor not-allowed` — matches `Input`'s `_disabled`

  ### Textarea
  - `_hover` border `primary.lighter` (was `gray.600`)
  - `bg white` so the field doesn't pick up surrounding colors
  - focus ring color forced to `primary.main` (was `gray.400`). Chakra v3
    `Input` outline recipe sets `focusRingColor: var(--focus-color)`, but
    the matching `Textarea` recipe omits it — so the focus outline
    defaulted to `colorPalette.focusRing` (gray.400). The component now
    declares `focusRingColor` and the `--focus-color`/`--error-color`
    css variables exactly the way `Input.tsx` does.
  - `_readOnly`: `bg gray.50`, `color gray.600`, `borderColor gray.200`,
    `cursor not-allowed` — matches `Input`'s `_readOnly`
  - `_disabled`: `bg gray.50`, `color gray.1000`, `fontWeight semibold`,
    `cursor not-allowed` — matches `Input`'s `_disabled`

  `Input` itself is unchanged. No public API breaks; the `Select`
  `styles` callback contract is preserved and consumer overrides keep
  working as before. Size variants (`sm` / `lg` / `xl`) are out of scope
  for this change — Select still renders at the Chakra `Input` `md`
  geometry; a dedicated size-progression pass will follow in a separate
  PR.

- 676b42e: fix: DatePicker 스타일 수정

## 3.0.0-alpha.36

### Minor Changes

- 57c14b9: feat: dark mode — semantic token layer, color-mode runtime, and full component adoption

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
  - _Surfaces & overlays_: Card, Input, Textarea, Select/Combobox, Section/Page
    loaders, Table, RadialProgress, ErrorFallback card, SegmentedControl track,
    RangeDatePicker popover; overlays (Menu/Modal/Popover/Toast) realign onto the
    slate scale via a `bg.panel` `_dark` override. The Menu uses a dark drop
    shadow in dark mode (was a near-white glow).
  - _Text & icons_: foreground colors migrated to `fg.*` across Typography
    (Text/Subtitle/Subtext/H3), Button/Chip/Tag/Badge neutral variants, FormLabel,
    MaxLengthIndicator, Table head/body, IconButton, Tabs, SegmentedControl,
    FileItem, FileList, MonthPicker, Code, CodeTabs, SeeMoreButton, ErrorFallback,
    DatePickers, Markdown/MDXEditor content, and Menu items.
  - _Borders & dividers_: migrated to `border.*` across FileInput, Popover
    (content + arrow), TabList, Avatar, MenuList, ModalFooter, FileList, FileItem,
    Collapsible, TableContainer, SeeMoreButton, SliderThumb, Checkbox.
  - _Neutral soft fills_ (Button/Chip/Tag) flip their surface + border instead of
    leaving light-on-light text on dark.
  - _LineGraph_ feeds recharts CSS-var strings (`var(--chakra-colors-*)`) for axis
    labels and grid, since recharts does not resolve Chakra tokens.

  **Contrast / accessibility (also affects light mode)**

  A WCAG pass on the dark-mode pairs drove a few brand adjustments that, by
  design, also apply in light:
  - Solid `Button`/`IconButton`/`Chip`/`Tag` fills are pinned to their saturated
    primitive steps so they are mode-invariant (they no longer lighten to the
    bright `*.300` step in dark, which had dropped white-on-fill contrast to
    ~1.8–4.5:1). White labels keep their light-mode contrast in both modes.
  - Solid **warning** uses a dark label (`gold.900`) in both light and dark —
    white-on-gold was 2.39:1 (failing AA in _both_ modes); it is now 6.7:1.
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

## 3.0.0-alpha.35

### Minor Changes

- 73d2e60: feat(Select): replace react-select with Chakra-based Select and Combobox

  The `Select` component is no longer a `react-select` wrapper. It is now a
  compound-component namespace built on Chakra v3's Select primitives and
  styled to match `Input` (border, hover, focus, invalid and disabled
  states share the same tokens). A matching `Combobox` namespace is added
  for searchable selects.

  Two convenience components cover the common single-select case:
  - `SelectField` — single-select dropdown (`options` / `value` / `onChange`)
  - `ComboboxField` — searchable single-select with text filtering

  ### Breaking change

  The previous `react-select` API is removed. Consumers of `<Select />`
  should migrate to `<SelectField />`:

  ```tsx
  // Before
  <Select options={options} value={selectedOption} onChange={handleChange} />

  // After
  <SelectField options={options} value={value} onChange={handleChange} />
  ```

  `value` / `onChange` now work with the option's `value` (`T`) directly
  rather than the whole option object. The `react-select`-specific props
  (`styles`, `isMulti`, `isSearchable`, `menuPlacement`, …) no longer
  exist — use the `Select` / `Combobox` namespaces for multi-select,
  grouped options and custom layouts.

  The `react-select` and `@tanstack/react-virtual` dependencies have been
  dropped.

## 3.0.0-alpha.34

### Patch Changes

- 14528d9: style(Select, Textarea): align default look with Input

  The `Select` and `Textarea` components now mirror `Input` so the three
  form controls feel like one set. Concretely:

  ### Select
  - `borderColor` `gray.400` (was `gray.300`)
  - `_hover` border `primary.lighter` (was `gray.400`)
  - `_focus` border `primary.main` + 1px `outline` of the same color
    (matches Chakra v3 `Input` recipe's `focusVisibleRing: "inside"`,
    so the focused control reads as roughly 2px thick — was just 1px
    border with no outline)
  - `_invalid` border `danger.main` — unchanged
  - font size `1em` (was hardcoded `14px`) so it inherits the same
    responsive size as Chakra v3's `Input` `md` recipe
  - font weight `500` (was `600`)
  - selected value color `gray.1300` (was `gray.1200`) — matches the body
    text color used by `Input`
  - left padding `12px` (was `4px`) — matches Chakra v3 `Input` `md`
  - disabled state: `bg gray.50`, `color gray.1000`, `fontWeight 600`,
    `cursor not-allowed` — matches `Input`'s `_disabled`

  ### Textarea
  - `_hover` border `primary.lighter` (was `gray.600`)
  - `bg white` so the field doesn't pick up surrounding colors
  - focus ring color forced to `primary.main` (was `gray.400`). Chakra v3
    `Input` outline recipe sets `focusRingColor: var(--focus-color)`, but
    the matching `Textarea` recipe omits it — so the focus outline
    defaulted to `colorPalette.focusRing` (gray.400). The component now
    declares `focusRingColor` and the `--focus-color`/`--error-color`
    css variables exactly the way `Input.tsx` does.
  - `_readOnly`: `bg gray.50`, `color gray.600`, `borderColor gray.200`,
    `cursor not-allowed` — matches `Input`'s `_readOnly`
  - `_disabled`: `bg gray.50`, `color gray.1000`, `fontWeight semibold`,
    `cursor not-allowed` — matches `Input`'s `_disabled`

  `Input` itself is unchanged. No public API breaks; the `Select`
  `styles` callback contract is preserved and consumer overrides keep
  working as before. Size variants (`sm` / `lg` / `xl`) are out of scope
  for this change — Select still renders at the Chakra `Input` `md`
  geometry; a dedicated size-progression pass will follow in a separate
  PR.

## 3.0.0-alpha.33

### Minor Changes

- 4b689ee: feat(Code): bundle the Stata grammar

  Adds `stata` to `shikiAdapter`'s preloaded `langs`. Several consumers
  (notably FactChat / academic users) pass `language="stata"` to `<Code>`
  and were hitting `ShikiError: Language not found`. Surfaces in the
  Storybook language dropdown automatically via `BUNDLED_LANGUAGES`.

## 3.0.0-alpha.32

### Patch Changes

- 04b32cf: chore(Card): remove unused `.card-image` CSS hook

  The `.card-image` selector was a consumer-facing CSS hook intended to be
  applied to image children of `<Card>` for hover-scale and smooth-transition
  effects, but no consumers ended up adopting it. Removing the dead styles
  (and the now-unused `mergeCss` indirection in `Card.tsx`).

- f52deaa: fix(Code): render copy button as floating overlay when `hideHeader` is true

  Previously, setting `hideHeader` removed the entire header — including the copy
  button — even when `onCopy` was provided. The copy trigger now renders as a
  top-right overlay (`IconButton` ghost variant with a tooltip, matching the
  `CodeTabs` copy button) whenever the header is hidden but `onCopy` is set.
  Positioned at `top={2} right={3}` so the icon sits in the upper-right corner
  without overlapping the first line of code. Exposes `.ml-code-copy` className
  hook for consumer overrides.

## 3.0.0-alpha.31

### Minor Changes

- a6a7811: feat(Code): bundle 11 additional Shiki language grammars

  Expand `shikiAdapter`'s preloaded `langs` from 17 to 28 by adding `c`, `csharp`, `dart`, `dockerfile`, `kotlin`, `lua`, `matlab`, `mermaid`, `r`, `ruby`, `toml`. Selected based on consumer Sentry signals (FactChat hit `ShikiError: Language not found` for `r`, `c`, `cpp`, `stata` between 2026-04-30 and 2026-05-07) and prevalence in academic / programming-student use cases.

  Bundle delta: ~376 KB raw / ~75 KB gzipped (+30% on the grammar bundle alone). Heavyweights deliberately excluded — `cpp` (464 KB), `swift` (104 KB), `php` (116 KB), `objective-c` (112 KB) — consumers can map these to syntactically-similar bundled grammars (e.g. `cpp → java`) for best-effort highlighting.

## 3.0.0-alpha.30

### Patch Changes

- 676b42e: fix: DatePicker 스타일 수정

## 3.0.0-alpha.29

### Minor Changes

- 541a14b: Add `baseFontSize` prop to `InfoSprinkle` (default `14px`), matching `Popover`'s scaling behavior via `ScaledContext`. Optimize `ScaledContext` so token-to-em conversion is computed once per Chakra system via a module-level `WeakMap` cache (shared across all instances) and memoize the merged inline style. Move `Popover`'s runtime context (`PopoverContext`, `usePopoverContext`) out of `Popover.types.ts` into a dedicated `Popover.context.ts`. Fix `Code` to merge `meta` from `containerProps` and root props instead of overwriting it, and restore `ModalHeader`'s `borderTopRadius="l3"` default.

## 3.0.0-alpha.28

### Minor Changes

- c5eb2f7: Add `showLineNumbers` prop to `Code`. When enabled, the underlying Chakra `CodeBlock` renders a line-number gutter via its shiki adapter.

## 3.0.0-alpha.27

### Minor Changes

- e144f01: feat(Code): extract `shikiAdapter` into its own module and refine default surface
  - Move the inline `createShikiAdapter` call out of `Code.tsx` into `src/components/Code/shikiAdapter.ts`, so the adapter can be reused across code-rendering components (e.g. `CodeTabs`) and is easier to type and swap.
  - Type the adapter against `HighlighterGeneric<BundledLanguage, BundledTheme>` imported from `shiki` instead of `any, any`.
  - Simplify the default Code header: drop the `primary.light` bottom border, drop the `textStyle="xs"` title override, and drop the `borderRadius="none"` override on the root so the component respects the token default.
  - Switch the root `textStyle` default from `"p"` to `"Body"` and set `borderColor="gray.300"` so the component matches surrounding surfaces.
  - Show a `FaCheck` success indicator in the copy trigger when copying succeeds.

- e45787d: feat(Modal): add `fullScreenOnMobile` prop and scope base font to 14px
  - Add `fullScreenOnMobile` prop to `Modal` (default: `true`). When true, the modal becomes fullscreen (100vw × 100dvh, no border-radius) on mobile viewports. When false, horizontal margin (`mx: 4`) is applied instead — suitable for confirm dialogs and small modals.
  - Wrap `ModalContent` children in `ScaledContext fontSize="14px"` so all modal typography and spacing scales to a 14px base without affecting the global font size.
  - Expose `useModalContext` hook for consuming `fullScreenOnMobile` in custom modal content components.

### Patch Changes

- 867370b: fix(Card): hoist `.card-image` transition and merge consumer `css`
  - Move the `.card-image` transition onto the element itself so it animates on both enter and exit, not only while hovered
  - Replace the hardcoded `transition: '0.3s all'` string (which the Chakra v3 style walker can't traverse as a value inside `_hover`) with token-backed `transitionProperty`/`transitionDuration`/`transitionTimingFunction` on the root and style-object form on `.card-image`
  - Use `mergeCss` so consumer `css` composes with the library base styles instead of being overwritten by the trailing rest spread

- e144f01: fix(CodeTabs): stabilize panel width and split `CopyButton`
  - Stack all language panels inside a single CSS grid cell so the container sizes to the widest panel. Non-selected panels use `visibility: hidden` + `aria-hidden` so they still contribute to intrinsic width without being interactive or announced to assistive tech. This eliminates the width jitter that occurred when switching between tabs whose code samples have different maximum line lengths.
  - Extract `CopyButton` into its own module (`CodeTabs/CopyButton.tsx`) and drop the inner `TabPanels`/`TabPanel` wiring in favor of rendering `Code` panels directly.

- fe346a9: fix: preserve library `css` prop against consumer overwrite across components

  Several components defined a library `css` prop (typically CSS custom properties or nested selector blocks) but applied it BEFORE `{...rest}`, letting a consumer's `css` silently clobber it. Switched every site to destructure `css` from props and compose via `mergeCss(libraryCss, css)` applied AFTER `{...rest}`, so consumer styles merge with library styles instead of replacing them.

  Also replaces the hardcoded `css={{ transition: 'all 0.25s ease-in-out' }}` on `Button` with `transitionProperty`/`transitionDuration`/`transitionTimingFunction` props to avoid the Chakra v3 style walker choking on the shorthand transition string when combined with state pseudos.

  Components fixed:
  - Button: swap hardcoded transition string for token-backed transition props
  - Input, RadioGroup, SegmentedControl, Spinner, Tab, TabList, Tbody, Tooltip: merge consumer `css` with library `css` instead of letting `{...rest}` overwrite it

- e144f01: fix(RadialProgress): hide segments with zero value

  Previously, zero-value segments were still rendered at the minimum arc size (and still consumed gap budget), producing visible slivers for categories that should not appear at all. Zero-value segments are now filtered out before layout, so only segments with `value > 0` contribute to the visible count, the gap calculation, and the arc layout.

## 3.0.0-alpha.26

### Major Changes

- 11ea169: feat(Code)!: migrate Code component to Chakra UI v3's `CodeBlock` with its built-in Shiki formatter, replacing the `react-syntax-highlighter` implementation. The `Code` component keeps the `children`, `language`, `onCopy`, `hideHeader`, and `containerProps` props. Removes the `react-syntax-highlighter` and `@types/react-syntax-highlighter` dependencies and adds `shiki` (loaded on demand). The copy button is now rendered by `CodeBlock.CopyTrigger`; the user-supplied `onCopy` callback still fires with the copied text after the trigger copies to the clipboard.

  BREAKING: the raw/preview Markdown toggle that `Code` showed when `language === 'markdown'` has been removed. `Code` now always renders a syntax-highlighted block. Along with it, the `code_markdown_raw` and `code_markdown_preview` translation keys are removed.

## 3.0.0-alpha.25

### Patch Changes

- dda5b3d: fix(MenuItem): remove narrowed onClick override, inherit correct type from ChakraMenuItemProps

## 3.0.0-alpha.24

### Patch Changes

- 272e59f: fix(ModalHeader): restore default textStyle="h4" on ModalHeader

## 3.0.0-alpha.23

### Patch Changes

- 1630c8e: fix(ModalHeader): remove hardcoded textStyle from ModalHeader to allow consumers to control typography

## 3.0.0-alpha.22

### Patch Changes

- 0641e41: feat(Checkbox): add inputRef prop to forward ref to the hidden input element
- c4fb34e: fix(Checkbox): move disabled fill styling to CheckboxControl for correct visual targeting

## 3.0.0-alpha.21

### Minor Changes

- b180dcb: feat(Avatar): add Chakra v3 namespace pattern subcomponent exports

  Avatar now exposes subcomponents as namespace properties following the Chakra UI v3 pattern:
  - `Avatar.Root`
  - `Avatar.RootProvider`
  - `Avatar.Fallback`
  - `Avatar.Image`
  - `Avatar.Icon`
  - `Avatar.Group`
  - `Avatar.Context`

  fix(Popover): match arrow tip border color to content border color

  `Popover.Content` now renders with an explicit `1px gray.200` border and sets a `--popover-border-color` CSS variable. `Popover.ArrowTip` reads that variable so the arrow border stays in sync with the content border.

### Patch Changes

- daebe15: fix(Card, Chip, Button, Checkbox): style consistency and runtime error fixes
  - Card: move `transition` into `css` prop to prevent Chakra v3 runtime error when `clickable` is combined with `_hover`; deep-merge `_hover` so user-passed hover styles don't clobber clickable hover styles
  - Chip: align neutral `solid`/`soft`/`outline` border colors with Tag (add missing `borderColor` on solid/soft, fix outline from `gray.700` → `gray.500`)
  - Button: add `transform: scale(0.97)` to all `_active` states; fix primary/secondary soft active color (`*.light` → `*.lighter` to match hover)
  - Checkbox: add `bgColor: gray.300` to `_disabled` state on root

## 3.0.0-alpha.20

### Patch Changes

- a4ce2dc: Fix release workflow alternating alpha bump failure

  Remove `changeset pre exit` step from release workflow — it was committing `pre.json` with `mode: "exit"` back to dev, causing the next run's `pre enter alpha` to no-op and `changeset version` to exit pre-release instead of bumping alpha. Also resets `pre.json` to `mode: "pre"`.

## 3.0.0-alpha.19

### Major Changes

- 3a2a951: **Breaking: Menu refactored to compound component pattern**

  `Menu` is now the root element (wraps `ChakraMenu.Root`) with a `baseFontSize` prop (default `'14px'`). Menu content is automatically wrapped in `ScaledContext`. `MenuButton` is removed — use `Menu.Trigger asChild` instead.

  **Migration**

  ```tsx
  // Before
  <Menu.Root>
    <MenuButton as={Button}>Open</MenuButton>
    <MenuList><MenuItem value="x">Item</MenuItem></MenuList>
  </Menu.Root>

  // After
  <Menu>
    <Menu.Trigger asChild><Button>Open</Button></Menu.Trigger>
    <Menu.List><Menu.Item value="x">Item</Menu.Item></Menu.List>
  </Menu>
  ```

  Exposes: `Menu.Trigger`, `Menu.TriggerItem`, `Menu.ContextTrigger`, `Menu.List`, `Menu.Item`, `Menu.ItemGroup`, `Menu.ItemGroupLabel`, `Menu.ItemCommand`, `Menu.CheckboxItem`, `Menu.RadioItem`, `Menu.RadioItemGroup`, `Menu.Separator`, `Menu.Arrow`, `Menu.ArrowTip`

## 3.0.0-alpha.18

### Minor Changes

- 1656cbc: Add `Popover` compound component

  Wraps Chakra's Popover with a `baseFontSize` prop (default `'14px'`) passed via context to `Popover.Content`, which wraps its children in `ScaledContext`. `Positioner` is hidden inside `Popover.Content`.

  Exposes: `Popover.Anchor`, `Popover.Trigger`, `Popover.Content`, `Popover.Arrow`, `Popover.ArrowTip`, `Popover.CloseTrigger`, `Popover.Header`, `Popover.Body`, `Popover.Title`, `Popover.Description`, `Popover.Footer`.

## 3.0.0-alpha.17

### Minor Changes

- 9c8ef73: Add `ScaledContext` component

  Wraps a `Box` with a given `fontSize` and re-maps spacing/sizes tokens from `rem` to `em`, so all spacing inside scales proportionally with the local font size. Useful for embedding UI at different densities without duplicating theme tokens.

## 3.0.0-alpha.16

### Patch Changes

- 515d7ea: fix: improve locale type safety and fix date format issues
  - Add `SupportedLocale` union type derived from LOCALE_MAP keys, applied to LogicianProvider, useLocale, and all date helper functions
  - Export `useLocale`, `LocaleContext`, and `LocaleContextValue` from package entry point
  - Fix 2-digit year format (yy → yyyy) in getDefaultFullDateFormat
  - Fix RangeDatePicker showing raw format string as end-date placeholder

## 3.0.0-alpha.15

### Major Changes

- 61646cf: **Breaking: Checkbox, Switch, and Radio are now compound components**

  `Checkbox`, `Switch`, and `Radio` no longer render their internal controls automatically. You must now compose them explicitly using sub-components.

  **Checkbox**
  - `Checkbox` is now the root element (replaces `Checkbox.Root`)
  - `Checkbox.Control` renders the styled checkbox box
  - `Checkbox.Label` renders the label text

  **Switch**
  - `Switch` is now the root element
  - `Switch.Control` renders the styled toggle (includes thumb)
  - `Switch.Label` renders the label text

  **Radio**
  - `Radio` is now the root element (replaces the internal `RadioGroup.Item` wrapper)
  - `Radio.Indicator` renders the styled radio circle
  - `Radio.Text` renders the label text
  - `rootRef` and `inputProps` props removed

## 3.0.0-alpha.14

### Patch Changes

- 2eec3f8: Fix vertical Tabs missing selected indicator and bottom border bleed

  Vertical selected tab now shows a right-side 2px primary indicator (matching horizontal's bottom indicator). TabList no longer renders a bottom border in vertical orientation.

## 3.0.0-alpha.13

### Minor Changes

- de10bd4: feat: add consistent keyboard focus ring across interactive components

  Introduces a shared `focusRing` utility (`src/utils/focusRing.ts`) and applies the standard double-ring focus style (white inner + primary blue outer) to all keyboard-navigable components: Button, IconButton, Checkbox, Radio, Switch, SliderThumb, AccordionButton, MenuItem, BreadcrumbLink, and Chip.

  Focus ring now only shows on keyboard navigation (`_focusVisible`) rather than on mouse click (`_focus`), following the CSS `:focus-visible` standard used by GitHub, Radix, and Material Design.

### Patch Changes

- 7f3d81d: fix: load Pretendard Variable and Inter fonts from CDN in LogicianProvider

  Previously no fonts were loaded by the library, causing browsers to fall back to system fonts (Arial/Helvetica) which rendered English text noticeably thicker than intended. LogicianProvider now automatically injects stylesheet links for Pretendard Variable (jsDelivr, dynamic subset) and Inter (Bunny Fonts) on mount. A `loadFonts` prop (default `true`) allows consumers to opt out if they manage fonts themselves. Also adds `-webkit-font-smoothing: antialiased` to global styles for consistent rendering across OS.

## 3.0.0-alpha.12

### Patch Changes

- 1595e85: fix: override Chakra spacing scale with em units

  Numeric spacing tokens (p: 4, gap: 2, etc.) now resolve to em values
  instead of rem, so spacing cascades from the nearest ancestor font-size
  alongside text — enabling consistent contextual scaling.

- 5edf7a7: fix: switch theme textStyles font sizes from rem to em for contextual scaling

  em units inherit from the nearest ancestor font-size, enabling components inside
  containers like Popover to scale from a local base (e.g. 14px) rather than
  always deferring to the html root.

- e7627c9: fix: replace compounding em lineHeight on 6xl textStyle with unitless ratio

  `lineHeight: '5.75em'` resolved against the element's own font-size (60px),
  producing 345px instead of the intended 92px. Replaced with unitless `1.533`
  (92 ÷ 60) to preserve the original rendered output.

## 3.0.0-alpha.11

### Minor Changes

- a1d012f: feat: FormLabel RequiredIndicator, Select styles fix, Badge sizes, FileItem tooltips/download loading, Input bg, MonthPicker showClearButton rename
  - FormLabel: show Field.RequiredIndicator when FormControl has required prop (via Chakra v3 Field context)
  - Select: pass Logician-merged styles as base to consumer style callbacks (fixes Pagination border color)
  - Select: fix option flicker on mouse leave by removing isFocused from background condition
  - Badge: add size prop (sm/md/lg) with textStyle presets (subtext/subtitle)
  - FileItem: add tooltips on download/delete icons, add isDownloading prop with spinner
  - Input: set default background to white
  - MonthPicker: rename showResetButton to showClearButton

## 3.0.0-alpha.10

### Patch Changes

- cc60a0d: fix: remove borders from soft button variants; improve Toast close button contrast and description styling

## 3.0.0-alpha.9

### Patch Changes

- aa5e009: Various component fixes
  - SegmentedControl: fix sizing, layout shift on selection, and font size scaling with size prop
  - FileInput: use Text instead of Subtext for upload label
  - MenuItem: apply danger.lightest hover background for danger variant
  - ModalCloseButton: simplify using IconButton

## 3.0.0-alpha.8

### Minor Changes

- 7e15535: Add `Collapsible` compound component (`Root`, `Trigger`, `Content`, `Indicator`) wrapping Chakra UI v3 Collapsible with Accordion-style defaults (bordered rounded container, bold trigger with chevron, padded content). Also fixes Avatar background, IconButton color precedence, Tooltip cloneElement removal, ModalFooter unused import, rollup CSS SSR injection, and removes unused `react-textarea-autosize` dependency.

### Patch Changes

- 69c85f5: Fix TagCloseButton missing cursor pointer on hover

  Fix Tag size prop type error by using TagRootProps instead of BoxProps

## 3.0.0-alpha.7

### Patch Changes

- d971f4c: feat(Modal): bake in Dialog.Backdrop overlay by default

  Modal now renders the backdrop overlay internally, matching the Chakra v2 behavior where the overlay was included automatically. Users no longer need to render `<ModalOverlay />` manually inside `<Modal>`.

## 3.0.0-alpha.6

### Patch Changes

- 7ca7b1d: Fix RadialProgress useToken hooks rule violation
  - Resolve "Rendered fewer hooks" error by calling useToken at component top level instead of inside map callbacks

## 3.0.0-alpha.5

### Patch Changes

- 070588f: Fix Icon color to use currentColor, add default color/colorPalette to IconButton, update global fontWeight to 500

## 3.0.0-alpha.4

### Patch Changes

- 5361a87: Set default icon color to `gray.600`

## 3.0.0-alpha.3

### Patch Changes

- 9a9c8e7: fix: PR #55 review feedback - Tabs v3 migration, createIcon optimization, SegmentedControl theme tokens, LogicianProvider Toaster removal

## 3.0.0-alpha.2

### Minor Changes

- e47db64: Color palette expansion, responsive typography, and component improvements

  ## Color Palette Expansion

  **New Color Levels:**
  - Added 25 shade to all primitive color palettes (blue, rose, green, violet, gold)
  - New lightest backgrounds: #F4F7FD (blue), #FDF5F5 (rose), #F4FDF4 (green), #FAF4FD (violet), #FDFBF4 (gold)

  **Semantic Token Changes (BREAKING):**
  - **NEW**: `lightest` → 25 shade (lightest backgrounds, ghost states)
  - **RENAMED**: Previous `lightest` → `extralight` (50 shade, extra-light backgrounds)
  - `lighter`, `light`, `main`, `dark`, `darker` remain unchanged

  **Migration Guide:**
  Replace all instances of `.lightest` with `.extralight`:

  ```tsx
  // Before
  <Badge bgColor="primary.lightest" />

  // After
  <Badge bgColor="primary.extralight" />
  ```

  Or use the new `lightest` for even lighter backgrounds:

  ```tsx
  <Badge bgColor="primary.lightest" /> // Now uses 25 shade
  ```

  **Component Updates:**
  - Badge, Chip, Tag: Updated to use `extralight`
  - Toast, Banner: Updated to use `extralight`
  - Button soft variant: Updated to use `extralight`

  ## Responsive Typography System

  **Typography Updates:**
  - Override Chakra v3 default textStyles (2xs-7xl) with responsive scaling
  - Mobile: base size, Desktop (md+): one size up for better readability
  - Update custom Logician textStyles (h1-h5, p, subtitle, subtext) with consistent scaling
  - Update Palette storybook to reflect actual theme values

  ## Modal Component API Changes (BREAKING)

  **API Changes:**
  - Remove auto-rendered `<ModalOverlay />` from Modal component
  - Remove Portal wrapper from ModalContent for simpler composition
  - Users must now explicitly add `<ModalOverlay />` when using Modal

  **Migration:**

  ```tsx
  // Before
  <Modal open={isOpen}>
    <ModalContent>...</ModalContent>
  </Modal>

  // After
  <Modal open={isOpen}>
    <ModalOverlay />
    <ModalContent>...</ModalContent>
  </Modal>
  ```

  ## Component Improvements

  **Bug Fixes:**
  - Button: Remove fontSize override for xs size (now handled by theme)
  - InfoSprinkle: Add optional chaining for iconButtonProps.size
  - Markdown: Reduce gap from 1.2em to 1em for better spacing
  - Pagination: Add whiteSpace="nowrap" to items per page label

  ## Documentation Updates
  - Updated theme/CLAUDE.md with new color tables and semantic token mappings
  - Updated all inline comments in colors.ts
  - Palette Storybook automatically displays new lightest shade

  ## WCAG Compliance

  All existing WCAG AA compliance maintained - no changes to `main`, `dark`, or `darker` mappings

## 3.0.0-alpha.1

### Minor Changes

- 63fa11b: Add FormIntegration component and improve Chakra UI v3 compatibility
  - Add new FormIntegration component with comprehensive documentation
  - Enhance LogicianProvider with Chakra UI v3 patterns and better theme integration
  - Update form components (Select, Input, Textarea) for v3 compatibility
  - Add comprehensive Storybook stories for Avatar, IconButton, and InfoSprinkle
  - Refine theme configuration and global styles for better consistency
  - Improve component exports in main index file

## 3.0.0-alpha.0

### Major Changes

- a827f0f: feat!: Chakra UI v3 migration with Golden Ratio Color System

  Complete migration to Chakra UI v3 with comprehensive design system overhaul and component architecture improvements.

  ## Breaking Changes

  ### Dependencies
  - **Chakra UI**: v2.8 → v3.3 (major upgrade)
  - **Removed peer dependencies**: `@emotion/styled`, `framer-motion` (no longer required in Chakra v3)
  - **Next.js**: Now supports Next.js 16 (peer dependency range extended to `^13.0.0 || ^14.0.0 || ^15.0.0 || ^16.0.0`)
    - All Next.js navigation APIs (`useRouter`, `usePathname`, `useSearchParams`) and `next/link` remain fully compatible
    - No breaking changes to Next.js integration in logician-ui components
  - **chakra-dayzed-datepicker**: upgraded to v3.0.0 for Chakra v3 compatibility

  ### Removed Components

  The following components have been removed:
  - **Alert** - Use Chakra UI's native Alert component instead
  - **AutowidthInput** - Functionality can be achieved with regular Input
  - **Carousel** & **CarouselModal** - Use external carousel libraries
  - **Chip** - Replaced by enhanced Tag component with variants
  - **DataField** - Use Field component from Chakra v3
  - **GuideCue** - Use Tooltip or Popover components
  - **UrlInput** - Use regular Input component

  ### Component API Changes

  All components have been migrated to Chakra UI v3 APIs:
  - **Button & IconButton**: `colorScheme` → `colorPalette`, new two-dimensional variant system (solid/outline/soft/ghost × primary/secondary/danger/success/warning)
  - **Tag**: Enhanced with `colorPalette` prop and comprehensive variant support, replacing Chip functionality
  - **Accordion**: New composition pattern with AccordionPanel component
  - **Checkbox**: Updated to v3 composition API, `children` prop removed (use explicit label patterns instead)
  - **Radio**: Updated to v3 composition API
  - **Switch**: Updated to v3 composition API, `children` prop removed (use explicit label patterns instead)
  - **Slider**: Updated to v3 composition API with SliderControl and SliderThumbs components
  - **Tabs**: Updated to v3 composition API and context management
  - **Toast**: New v3 API with backward compatibility wrapper
  - **Tooltip**: Updated to v3 Popover-based implementation
  - **Modal**: Migrated to Dialog component (v3)
  - **Menu**: Updated to v3 composition pattern
  - **Select**: Updated styling for v3 compatibility
  - **PasswordInput**: Enhanced stories and v3 compatibility

  ### Removed Deprecated v2 Props

  All deprecated Chakra UI v2 props have been removed. TypeScript will now error for any usage of old prop names, forcing migration to v3 syntax:
  - **Button**: Removed `colorScheme`, `isLoading`, `isDisabled`, `leftIcon`, `rightIcon`
  - **IconButton**: Removed `colorScheme`, `isLoading`, `isDisabled`, `icon`
  - **Input**: Removed `isDisabled`, `isInvalid`, `isReadOnly`
  - **Checkbox**: Removed `isChecked`, `isDisabled`, `isInvalid`
  - **Switch**: Removed `isChecked`, `isDisabled`
  - **Textarea**: Removed `isDisabled`, `isInvalid`, `isReadOnly`
  - **Tooltip**: Removed `label`, `hasArrow`, `isDisabled`, `isOpen`
  - **Modal**: Removed `isOpen`, `onClose`
  - **Toast**: Removed `position`, `isClosable`
  - **Accordion**: Removed `allowToggle`, `allowMultiple`
  - **Tag**: Removed `TagColorScheme` type alias
  - **Slider**: Removed `onChange`, `focusThumbOnChange`; changed `value`/`defaultValue` types to `number[]` only

  ## New Features

  ### Chakra UI v3 Primitives

  Added `primitives.ts` for advanced composition patterns:

  ```tsx
  import {
    V3Checkbox,
    V3RadioGroup,
    V3Switch,
    V3Slider,
  } from '@mindlogic-ai/logician-ui';

  // Use raw Chakra v3 components for maximum flexibility
  <V3Checkbox.Root>
    <V3Checkbox.HiddenInput />
    <V3Checkbox.Control>
      <V3Checkbox.Indicator />
    </V3Checkbox.Control>
    <V3Checkbox.Label>Label</V3Checkbox.Label>
  </V3Checkbox.Root>;
  ```

  Available primitives: `V3Checkbox`, `V3RadioGroup`, `V3Switch`, `V3Slider`, `V3Field`, `V3PinInput`, `V3NumberInput`, `V3Dialog`, `V3Menu`, `V3Popover`, `V3Tooltip`, `V3Accordion`, `V3Collapsible`, `V3Tabs`, `V3Avatar`, `V3Badge`, `V3Card`, `V3Table`, `V3Tag`, `V3Progress`, `V3Breadcrumb`, `V3List`

  ### Golden Ratio Color System

  Complete redesign of the color palette using mathematically harmonious color relationships based on the golden ratio (φ ≈ 1.618).

  #### New Color Primitives
  - **Blue** (`blue.50` - `blue.900`): Primary brand color palette
  - **Rose** (`rose.50` - `rose.900`): Danger/error states (replaces `red`)
  - **Green** (`green.50` - `green.900`): Success states
  - **Violet** (`violet.50` - `violet.900`): Secondary/accent color (replaces `purple`)
  - **Gold** (`gold.50` - `gold.900`): Warning states (replaces `yellow`)
  - **Gray** (`gray.0` - `gray.1500`): Extended 16-shade slate-based gray scale with cool blue undertone

  #### Semantic Token Updates

  All semantic tokens now reference the new primitive palettes:
  - `primary.*` → Blue palette (#1751D0 main)
  - `secondary.*` → Violet palette (#9117D0 main)
  - `danger.*` → Rose palette (#D01721 main)
  - `success.*` → Green palette (#1AA612 main)
  - `warning.*` → Gold palette (#D0A117 main)

  Each semantic category includes `lightest` and `darker` variants:

  ```tsx
  primary.lightest; // #E8EEFB
  primary.darker; // #04102A
  ```

  #### Gray Scale Changes
  - Added `gray.0` (#FDFDFF) for pure background
  - All gray values updated with blue undertone
  - Default body text changed from `gray.1500` to `gray.1300` (#1E2433)

  #### WCAG Accessibility

  All semantic color combinations meet WCAG 2.1 AA standards (4.5:1 minimum contrast).

  #### Color Breaking Changes
  - Gray palette values have changed significantly (now slate-based with blue undertone)
  - `primary.light` now maps to `blue.200` (#7DA0E8) instead of `blue.300`
  - `primary.main` now maps to `blue.500` (#1751D0) instead of `blue.900`
  - Default body text color changed to `gray.1300` (#1E2433)
  - Button hover states updated to use new palette shades

  #### Legacy Aliases (Deprecated)

  For backwards compatibility:
  - `purple.*` → maps to `violet.*`
  - `red.*` → maps to `rose.*`
  - `yellow.*` → maps to `gold.*`

  ### Component Enhancements
  - **Button/IconButton**: New soft variant, two-dimensional variant system, updated hover states
  - **Tag**: Full variant system replacing Chip component
  - **Badge**: Enhanced with new color palette
  - **Banner**: Updated styles for new color system
  - **Typography**: All components updated with new color tokens
  - **Breadcrumb**: v3 composition pattern support
  - **PasswordInput**: New comprehensive stories

  ## Migration Guide

  ### Dependency Updates

  ```bash
  # Update package.json
  npm install @chakra-ui/react@^3.3.0

  # Remove old peer dependencies (no longer needed)
  npm uninstall @emotion/styled framer-motion
  ```

  ### Replacing Removed Components

  ```tsx
  // Alert: Use Chakra's native Alert
  import { Alert } from '@chakra-ui/react';

  // Chip: Use Tag component
  import { Tag } from '@mindlogic-ai/logician-ui';
  <Tag colorPalette="primary" variant="solid">
    Chip content
  </Tag>;

  // DataField: Use Field component
  import { V3Field } from '@mindlogic-ai/logician-ui';

  // GuideCue: Use Tooltip
  import { Tooltip } from '@mindlogic-ai/logician-ui';
  ```

  ### Component API Updates

  ```tsx
  // Button/IconButton: colorScheme → colorPalette
  <Button colorPalette="primary" variant="solid">Submit</Button>
  <IconButton colorPalette="danger" variant="outline" aria-label="Delete" />

  // Tag: New enhanced API
  <Tag colorPalette="success" variant="soft">Active</Tag>

  // Checkbox/Switch: children prop removed
  // Before: <Checkbox>Accept terms</Checkbox>
  // After: Use Chakra v3 primitives for labels
  import { V3Checkbox } from '@mindlogic-ai/logician-ui';
  <V3Checkbox.Root>
    <V3Checkbox.HiddenInput />
    <V3Checkbox.Control>
      <V3Checkbox.Indicator />
    </V3Checkbox.Control>
    <V3Checkbox.Label>Accept terms</V3Checkbox.Label>
  </V3Checkbox.Root>

  // Slider: New composition pattern
  <Slider defaultValue={[50]}>
    <SliderControl>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
  ```

  ### Color Token Updates

  ```tsx
  // Update semantic token references
  color: 'primary.main'; // #1751D0 (was different in v2)
  color: 'danger.main'; // #D01721 (rose-based)
  color: 'gray.1300'; // #1E2433 (default text)
  bg: 'gray.0'; // #FDFDFF (pure background)
  ```

  ## Documentation
  - Component migration patterns: See updated Storybook stories
  - Color system: `src/theme/Palette.stories.tsx`
  - Theme documentation: `src/theme/claude.md`
  - Chakra v3 primitives: `src/primitives.ts`

## 2.0.0

### Major Changes

- 052ff1a: Clean up dependencies and remove unused components
  - Removed `EditableImage` and `ToggleableInput` components (Formik dependencies)
  - Removed `SelectDate` component (external form dependencies)
  - Cleaned up package.json dependencies:
    - Removed unused `react-hook-form`
    - Removed unused `formik`
    - Fixed `lottie-react` → `react-lottie-player`
    - Removed unused `react-window`
  - All remaining dependencies are actively used by components
  - Improved TypeScript configuration for better compilation

- 60c5169: Remove Link component(src/components/Link), Change InfoSprinkle props
- 876a8cc: Remove color mode functionality and simplify to light mode only
  - Removed `store/colorMode.ts` and all color mode switching functionality
  - Simplified Icon, Card, and TabList components to use light mode styles only
  - Removed ErrorBoundary component (had external dependencies)
  - Recovered MonthRangePicker component and added back `date-fns` dependency
  - Created `useLocale` hook stub for MonthRangePicker support
  - Updated tsconfig.json to remove store path references and exclude problematic components
  - Design system now only supports light mode for consistency and simplicity

### Minor Changes

- 75c0f2f: Add Storybook 8.6 for interactive component development and documentation
  - Added latest Storybook 8.6 with Vite support for fast development
  - Configured Storybook with Chakra UI provider integration
  - Added development server and build scripts
  - Created proper Storybook configuration files
  - Updated project structure documentation
  - Storybook provides interactive component playground at localhost:6006

- ffe2214: Add comprehensive SVG support and fix translation paths
  - Added vite-plugin-svgr and svgo for proper SVG handling in development and Storybook
  - Created TypeScript declarations for SVG imports
  - Updated Vite and Storybook configurations to transform SVG imports into React components
  - Added optimize-icons script for SVG optimization (reduced icon sizes by 15-78%)
  - Fixed "Failed to execute 'createElement'" error in Storybook when rendering custom SVG icons
  - Moved translations to src/translations/ for better organization
  - Updated get-lang-pack.sh script to download to correct location
  - Created formatTextForMarkdown utility for translation formatting
  - Added @/translations/\* path alias to tsconfig.json

- ea6bd90: ErrorFallback 컴포넌트 추가
- 4e6661f: icon 선언 사용 방법 수정 style props 변경 <Icon icon="IoSearch" /> -> <IoSearch /> 로 변경
- 485d869: Created the LogicianProvider component
- 339c162: DatePicker(RangeDatePicker, SingleDatePicker) UI 개선
- 96e6a29: useTheme() 사용시 제네릭 타입을 전달하지 않아도 타입 추론이 가능하도록 개선
- cb6d2c5: useToast 메소드(update,close,...) 및 warning status 추가
- ea99714: useToast에서 토스트 생성시 toastId를 반환하도록 return toastId 추가
- 9f2110d: Entry file에 export되지 않은 컴포넌트들에 대해 export 추가
- 436f57b: MDXEditor 개선
  - @mdxeditor/editor 패키지 업데이트 ^1.0.0 -> ^3.45.1
  - <Box />가 이중으로 래핑되어 있어 containerProps가 제대로 적용되지 않는 문제 해결 (nesting 단계가 줄어들어 diff가 많아 보일 수 있음)
  - forwardRef를 적용하여 디자인 시스템을 사용하는 쪽에서도 에디터의 ref에 접근할 수 있도록 추가
  - 마크다운 구문 파싱 중 에러가 발생했을 때 Source Mode로 전환할 수 있도록 추가.
    - 외부에서도 onError를 prop으로 넘겨줄 수 있어서 Toast를 띄우는 등 커스텀 가능

- 8cf348b: Remove AvatarInput component
  - Removed AvatarInput component directory from src/components/
  - Removed AvatarInput export from main index.ts
  - Simplifies component API surface area

- 104b9bd: Remove ColorPicker component
  - Removed ColorPicker component directory from src/components/
  - Removed ColorPicker export from main index.ts
  - Simplifies component API by removing color selection functionality
  - ColorPicker was dependent on react-colorful which is no longer needed

- 2e9c753: Reorganize project structure with src directory for better organization
  - Moved all source code (components, utils, hooks, theme, index.ts) into src/ directory
  - Updated package.json main and types fields to point to src/index.ts
  - Updated tsconfig.json paths and includes for new structure
  - Updated Storybook configuration to find stories in src/components
  - Updated Vite configuration aliases to point to src directory
  - Created root index.ts that re-exports from src for backwards compatibility
  - Updated documentation examples to reflect new import paths
  - Follows modern project organization standards

- e365f4f: errorLogger 제거
- d5ef0ee: ErrorFallback의 errorId, timestamp prop을 optional로 변경

### Patch Changes

- 627427d: MDXEditor의 자식 팝업을 클릭했을때 에디터에 autofocus되는 이슈를 해결했습니다.
- d51e509: Migrate build system from tsup to Rollup with preserveModules for improved tree-shaking support
- 84c2a20: Typography 내 Link를 export 하지 않는 버그 수정
- c32bd4d: Informe에서 사용하는 icon과 component를 수정하였습니다
- 1a0ea5d: Switch enabled 상태에서 primary.main 색상 적용
- 1fe38fb: icon system을 도입하여 기존의 아이콘 관리 방식을 개선합니다.
- 6e58b66: 기존에는 IconMap에 없는 키인 경우 사용하지 못했는데 JSX 형식을 받아서 직접 import 하는 방식을 추가하였습니다
- 2ade984: Add factchat task mode icon
- 0fdd011: Remove react-icons dependency.
  Icons are now included directly in the logician-ui package.
- 104b9bd: Replace @chakra-ui/icons usage with custom Icon component equivalents
  - Replaced ChevronDownIcon with IoChevronDownOutline in Menu stories
  - Replaced PhoneIcon with IoCall in Input stories
  - Replaced SearchIcon with IoSearch in Input stories
  - Added IoCall icon to REACT_ICONS_MAP for phone functionality
  - Removed dependency on @chakra-ui/icons package
  - All icon functionality now uses the unified Icon component system

- b52865f: fix: ErrorFallback bgGradient 제거
- cf07d04: createIcon 을 export를 다시 해주었습니다
- ce536e6: Add src/index.ts export lint rule, Add ExpandableText export in src/index.ts
- d05891f: MDXEditor 마크다운 테이블 클릭시 focus가 되는 현상 해결
- 6506547: Fix SVG issue with tsup
- 768f361: 2ade984 변경 사항이 alpha.14에 반영되어있지 않아 재배포

## 2.0.0-alpha.24

### Patch Changes

- d51e509: Migrate build system from tsup to Rollup with preserveModules for improved tree-shaking support

## 2.0.0-alpha.23

### Minor Changes

- 339c162: DatePicker(RangeDatePicker, SingleDatePicker) UI 개선

## 2.0.0-alpha.22

### Minor Changes

- cb6d2c5: useToast 메소드(update,close,...) 및 warning status 추가

## 2.0.0-alpha.21

### Minor Changes

- ea99714: useToast에서 토스트 생성시 toastId를 반환하도록 return toastId 추가

## 2.0.0-alpha.20

### Patch Changes

- 1a0ea5d: Switch enabled 상태에서 primary.main 색상 적용

## 2.0.0-alpha.19

### Patch Changes

- b52865f: fix: ErrorFallback bgGradient 제거

## 2.0.0-alpha.18

### Patch Changes

- 627427d: MDXEditor의 자식 팝업을 클릭했을때 에디터에 autofocus되는 이슈를 해결했습니다.

## 2.0.0-alpha.17

### Patch Changes

- cf07d04: createIcon 을 export를 다시 해주었습니다

## 2.0.0-alpha.16

### Minor Changes

- 4e6661f: icon 선언 사용 방법 수정 style props 변경 <Icon icon="IoSearch" /> -> <IoSearch /> 로 변경

### Patch Changes

- 1fe38fb: icon system을 도입하여 기존의 아이콘 관리 방식을 개선합니다.
- 6e58b66: 기존에는 IconMap에 없는 키인 경우 사용하지 못했는데 JSX 형식을 받아서 직접 import 하는 방식을 추가하였습니다

## 2.0.0-alpha.15

### Patch Changes

- 768f361: 2ade984 변경 사항이 alpha.14에 반영되어있지 않아 재배포

## 2.0.0-alpha.14

### Patch Changes

- 2ade984: Add factchat task mode icon
- ce536e6: Add src/index.ts export lint rule, Add ExpandableText export in src/index.ts

## 2.0.0-alpha.13

### Patch Changes

- 84c2a20: Typography 내 Link를 export 하지 않는 버그 수정

## 2.0.0-alpha.12

### Major Changes

- 60c5169: Remove Link component(src/components/Link), Change InfoSprinkle props

## 2.0.0-alpha.11

### Minor Changes

- d5ef0ee: ErrorFallback의 errorId, timestamp prop을 optional로 변경

## 2.0.0-alpha.10

### Minor Changes

- e365f4f: errorLogger 제거

## 2.0.0-alpha.9

### Minor Changes

- 9f2110d: Entry file에 export되지 않은 컴포넌트들에 대해 export 추가

## 2.0.0-alpha.8

### Minor Changes

- ea6bd90: ErrorFallback 컴포넌트 추가

## 2.0.0-alpha.7

### Patch Changes

- d05891f: MDXEditor 마크다운 테이블 클릭시 focus가 되는 현상 해결

## 2.0.0-alpha.6

### Minor Changes

- 436f57b: MDXEditor 개선
  - @mdxeditor/editor 패키지 업데이트 ^1.0.0 -> ^3.45.1
  - <Box />가 이중으로 래핑되어 있어 containerProps가 제대로 적용되지 않는 문제 해결 (nesting 단계가 줄어들어 diff가 많아 보일 수 있음)
  - forwardRef를 적용하여 디자인 시스템을 사용하는 쪽에서도 에디터의 ref에 접근할 수 있도록 추가
  - 마크다운 구문 파싱 중 에러가 발생했을 때 Source Mode로 전환할 수 있도록 추가.
    - 외부에서도 onError를 prop으로 넘겨줄 수 있어서 Toast를 띄우는 등 커스텀 가능

## 2.0.0-alpha.5

### Minor Changes

- 96e6a29: useTheme() 사용시 제네릭 타입을 전달하지 않아도 타입 추론이 가능하도록 개선

## 2.0.0-alpha.4

### Patch Changes

- 0fdd011: Remove react-icons dependency.
  Icons are now included directly in the logician-ui package.

## 2.0.0-alpha.3

### Minor Changes

- 485d869: Created the LogicianProvider component

## 2.0.0-alpha.2

### Patch Changes

- c32bd4d: Informe에서 사용하는 icon과 component를 수정하였습니다

## 2.0.0-alpha.1

### Patch Changes

- 6506547: Fix SVG issue with tsup

## 2.0.0-alpha.0

### Major Changes

- 052ff1a: Clean up dependencies and remove unused components
  - Removed `EditableImage` and `ToggleableInput` components (Formik dependencies)
  - Removed `SelectDate` component (external form dependencies)
  - Cleaned up package.json dependencies:
    - Removed unused `react-hook-form`
    - Removed unused `formik`
    - Fixed `lottie-react` → `react-lottie-player`
    - Removed unused `react-window`
  - All remaining dependencies are actively used by components
  - Improved TypeScript configuration for better compilation

- 876a8cc: Remove color mode functionality and simplify to light mode only
  - Removed `store/colorMode.ts` and all color mode switching functionality
  - Simplified Icon, Card, and TabList components to use light mode styles only
  - Removed ErrorBoundary component (had external dependencies)
  - Recovered MonthRangePicker component and added back `date-fns` dependency
  - Created `useLocale` hook stub for MonthRangePicker support
  - Updated tsconfig.json to remove store path references and exclude problematic components
  - Design system now only supports light mode for consistency and simplicity

### Minor Changes

- 75c0f2f: Add Storybook 8.6 for interactive component development and documentation
  - Added latest Storybook 8.6 with Vite support for fast development
  - Configured Storybook with Chakra UI provider integration
  - Added development server and build scripts
  - Created proper Storybook configuration files
  - Updated project structure documentation
  - Storybook provides interactive component playground at localhost:6006

- ffe2214: Add comprehensive SVG support and fix translation paths
  - Added vite-plugin-svgr and svgo for proper SVG handling in development and Storybook
  - Created TypeScript declarations for SVG imports
  - Updated Vite and Storybook configurations to transform SVG imports into React components
  - Added optimize-icons script for SVG optimization (reduced icon sizes by 15-78%)
  - Fixed "Failed to execute 'createElement'" error in Storybook when rendering custom SVG icons
  - Moved translations to src/translations/ for better organization
  - Updated get-lang-pack.sh script to download to correct location
  - Created formatTextForMarkdown utility for translation formatting
  - Added @/translations/\* path alias to tsconfig.json

- 8cf348b: Remove AvatarInput component
  - Removed AvatarInput component directory from src/components/
  - Removed AvatarInput export from main index.ts
  - Simplifies component API surface area

- 104b9bd: Remove ColorPicker component
  - Removed ColorPicker component directory from src/components/
  - Removed ColorPicker export from main index.ts
  - Simplifies component API by removing color selection functionality
  - ColorPicker was dependent on react-colorful which is no longer needed

- 2e9c753: Reorganize project structure with src directory for better organization
  - Moved all source code (components, utils, hooks, theme, index.ts) into src/ directory
  - Updated package.json main and types fields to point to src/index.ts
  - Updated tsconfig.json paths and includes for new structure
  - Updated Storybook configuration to find stories in src/components
  - Updated Vite configuration aliases to point to src directory
  - Created root index.ts that re-exports from src for backwards compatibility
  - Updated documentation examples to reflect new import paths
  - Follows modern project organization standards

### Patch Changes

- 104b9bd: Replace @chakra-ui/icons usage with custom Icon component equivalents
  - Replaced ChevronDownIcon with IoChevronDownOutline in Menu stories
  - Replaced PhoneIcon with IoCall in Input stories
  - Replaced SearchIcon with IoSearch in Input stories
  - Added IoCall icon to REACT_ICONS_MAP for phone functionality
  - Removed dependency on @chakra-ui/icons package
  - All icon functionality now uses the unified Icon component system

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added

- Initial release of Logician Design System
- 70+ React components built on Chakra UI
- Complete TypeScript support
- Comprehensive component library including:
  - Core components (Button, Card, Badge, Tag)
  - Form components (Input, Select, Checkbox, Radio, etc.)
  - Navigation components (Breadcrumb, Pagination, Menu, Tabs)
  - Feedback components (Alert, Toast, Modal, Tooltip)
  - Data display components (Table, Avatar, Typography, Code)
  - Media components (Icon, Logo)
- Storybook documentation for all components
- Built-in utilities and state management
- Responsive design system
- Accessibility features
- Tree-shakable exports

### Dependencies

- React 18+ support
- Chakra UI 2.8+ integration
- React Icons integration
- TypeScript support
- Emotion styling system
