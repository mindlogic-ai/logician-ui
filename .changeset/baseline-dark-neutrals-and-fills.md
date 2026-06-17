---
'@mindlogic-ai/logician-ui': minor
---

feat(theme): desaturated dark neutrals, `slate.*` ramp, `bg.sunken`, and `primary.fill*`

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
