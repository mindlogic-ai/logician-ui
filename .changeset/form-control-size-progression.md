---
'@mindlogic-ai/logician-ui': patch
---

feat(theme, Select): restore size progression for form controls

Chakra v3's default `Input` and `Textarea` recipes map size variants
through `textStyle` (`sm`/`md` → `textStyle.sm`, `lg`/`xl` →
`textStyle.md`). Our theme remaps both `textStyle.sm` and
`textStyle.md` to the same `subtitleAndP` (14-16px responsive), which
collapsed all sizes into a single visible font and left only the
height/padding deltas visible. This PR re-introduces a deliberate
font + height + padding progression for the three form controls.

### Theme — `src/theme/index.ts`

- Add a project-level recipe override for `input` and `textarea` that
  re-injects a modest `fontSize` per `size` variant only — leaving
  `fontWeight` (medium) intact. Values are responsive `{ base, md }`
  em tokens (the same shape the recipe's `textStyle` would have
  produced), which makes the merge actually win against the recipe's
  textStyle fontSize:
  - `xs` → 9.8 → **12px** (body-16)
  - `sm` → 11.27 → **14px**
  - `md` → 14 → **16px** _(unchanged from current rendering)_
  - `lg` → 16 → **18px**
  - `xl` → 18 → **20px**
- Cap `lg`/`xl` horizontal padding at `px: 3` (0.75em — same ratio as
  `md`). Chakra's defaults (`px: 4` and `px: 4.5`) cause padding to
  grow disproportionately once fontSize also scales — sm→md is +3.25px
  but md→lg would jump +6px and lg→xl +4.5px. The cap keeps the
  progression linear (~+1.5-2px per step) so lg/xl don't look
  suddenly chunky.
- Set `xs` padding to an absolute `8px` (instead of Chakra's 0.5em
  → 6px) so the smallest variant has breathing room. `xs → sm` reads
  as 8 → 8.75px without the inverted feel of 6 → 8.75.
- Export `FORM_CONTROL_FONT_SIZES` so Select (react-select-based, not
  recipe-driven) can stay aligned with the same map.

### Select — `src/components/Select`

- Introduce a `size` prop (`'xs' | 'sm' | 'md' | 'lg' | 'xl'`, default
  `'md'`) so the three form controls share the same size vocabulary.
- `Select.styles.ts`:
  - Control: consumes `FORM_CONTROL_FONT_SIZES` and uses em-based
    paddingX (0.625em / 0.75em / 0.75em / 0.75em for sm-xl, capped to
    match the Input recipe override) and an absolute 8px at xs. Right
    padding is 0.25em smaller (or 4px at xs) to leave room for the
    dropdown chevron. The resulting `fontSize` / `minHeight` /
    `paddingLeft` match Input and Textarea at every size.
  - Placeholder: strips react-select's default `margin: 0px 2px` so
    the placeholder text starts at exactly the control's paddingLeft
    — same position as Input/Textarea text.
  - Options (dropdown items): per-size `minHeight` (28/32/36/40/44 —
    control height − 4px) and `fontSize` (12/14/16/18/20) so the
    dropdown also responds to the size variant rather than rendering
    every size at the original hardcoded 36px/14px row.

### Comparison stories — `src/components/Select/Comparison.stories.tsx`

- Add a `size` argType (`xs` / `sm` / `md` / `lg` / `xl`) at meta
  level so every Comparison story responds to the toolbar control.
- New `SizeProgression` story stacks all five sizes (Input + Select +
  Textarea) with the resolved geometry labeled, so reviewers can see
  the progression at a glance without flipping through controls.

### Verification

Tested in Storybook (Components/Select/Comparison/Size Progression);
at every size Input, Select and Textarea render with identical
`fontSize`, `minHeight` and `paddingLeft`, and the placeholder/typed
text starts at exactly the same x-coordinate (0px diff).

No public API breaks. Callers that pass no `size` prop render
identically (still `md`). Callers that already use a non-md `size`
on Input/Textarea will see fonts/paddings change to match the new
progression — that's the intent.
