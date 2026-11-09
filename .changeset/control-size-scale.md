---
'@mindlogic-ai/logician-ui': major
---

One size scale for every control (R28 3차 QA #18). **Visual change** — controls
composed in one row now line up from their `size` prop alone.

`controlSizes` (`src/theme/controlSizes.ts`, exported with `getControlSize`,
`CONTROL_SIZES`, `CORE_CONTROL_SIZES`, `CONTROL_RADIUS`, `controlHeightToken`,
`controlHeightVar`) is the single table every control reads: Button's heights
(xs `sizes.8` 28px · sm `sizes.9` 31.5px · md `sizes.10` 35px · lg `sizes.11`
38.5px at the 14px root; 28 / 36 / 40 / 44px inside a 16px `ScaledContext`),
one textStyle per size, Button's icon ramp, two inline-padding ramps (action /
field) and Button's 8px corner. Button and IconButton do not change.

What consumers will see change:

- **Tag (interactive)** — `as="button"`, `selected`, `onClick` or a link: the
  control height, type, padding and icon size of its `size` (default `md`,
  35px) instead of the badge size (`lg` was 21px; `<Tag as="button" size="lg">`
  is now 38.5px). New `size="xs"`. Static tags are unchanged. The deprecated
  `Chip` alias follows Tag (keeps its pill radius and padding).
- **SegmentedControl** — outer height equals Button at every size (was +1px at
  the root: 29 / 32.5 / 36 / 39.5 → 28 / 31.5 / 35 / 38.5px); label type is the
  control type (xs 10.5 → 12.25px, sm / md 12.25 → 14px); item padding uses
  the action ramp. The 4px root padding and the inset ring are kept.
- **Input / PasswordInput / Textarea / Select `lg` and `xl`** — type back on
  the control step (16 / 18.3px → 14 / 16px). Height unchanged at the root;
  inside a 16px `ScaledContext` Input / Select `lg` is 44px (was 50.3px).
- **Combobox `lg`** — 38.5px (was 42px).
- **Input, Textarea, Select, Combobox** — 8px corners (was 6px).
- **Switch label** — the size's type (was a fixed 12.25px).
- **SingleDatePicker / RangeDatePicker** — new `size` prop for the trigger; its
  calendar icon follows the control icon ramp (was a fixed 21px).
- **MonthPicker** — new `size` prop (was always `md`); calendar icon on the
  icon ramp.
- **Tabs** — `size` on `Tabs` resolves through the same scale (no change in
  value).

Fix: the Select slot-recipe override passed a partial `slots` list, which
Chakra merges by index — it had been overwriting Select's `label` and
`positioner` slots. Slot overrides now pass Chakra's full anatomy.

New Storybook page: **Foundations / Control sizes** (alignment per size, a
table filter bar, form rows, and the filter bar inside `ScaledContext`).
