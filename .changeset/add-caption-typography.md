---
'@mindlogic-ai/logician-ui': minor
---

Add `Caption` to the Typography scale.

A new semantic tier below `Subtext` for the smallest text in the body scale — de-emphasised metadata such as timestamps, counts, statuses, and helper microcopy. The scale is now `Text` (p, 14–16px) → `Subtext` (12.88–14px) → `Caption` (11–12px).

Backed by a new `textStyle="caption"` token (`0.688em`→`0.75em`, weight 500, `1.4` leading for compact single-line metadata). `Subtext`'s description is updated from "Small caption text" to "Supporting / secondary text" so a single token owns the "caption" name and the hierarchy stays unambiguous.

Authored to match the rest of the scale (`H1`–`H5`, `Text`, `Subtitle`, `Subtext`, `Overline`): renders a Chakra `Text` with `textStyle="caption"`, disables the textStyle when an explicit `fontSize` is passed, and exposes the full Chakra style-prop surface. Defaults to `color="fg.muted"` since captions are secondary by nature; a brand/status variant is a single override (e.g. `color="danger.main"`).
