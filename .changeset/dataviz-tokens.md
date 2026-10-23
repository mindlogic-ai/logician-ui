---
'@mindlogic-ai/logician-ui': minor
---

Theme: data-visualisation colour tokens. `data.1`–`data.4` is the
single-measure blue ramp that the docs only listed as hex, mode-aware.
**The numbering is reversed from the old docs table**: that table called
#48607A "step 1 (largest)"; the token for it is `data.4` — the higher number
is the larger value. Map by colour, not by the old step number. `diverging.pos.1–3` (blue, above the baseline),
`diverging.neg.1–3` (orange, below) and `diverging.mid` (neutral step 3, at
the baseline) are a new ramp for charts against a real baseline (vs plan, vs
average). New raw group `dataviz.*` carries the values no system-hue step
covers. In-cell labels are audited in `contrast.test.ts`; `diverging.neg.2`
takes no in-cell label. Docs: SemanticTokens.mdx, Brand & colour usage, and a
`Setup/Theme/BAZE Palette → Data Viz` story. No component changes.
