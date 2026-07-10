---
'@mindlogic-ai/logician-ui': minor
---

Add `2xs` (14px) to the `Icon` `boxSize` scale.

Extends the t-shirt size mapping in `createIcon` below `xs` (16px) with a new `2xs` token that resolves to `3.5` (14px). This gives a design-token home to the many small-glyph cases — badge icons, toolbar icon-buttons, dropdown chevrons, mini play/pause controls — that previously fell through the mapping as raw numeric/px values (`boxSize={3.5}`, `boxSize="14px"`). The full scale is now `2xs, xs, sm, md, lg, xl` (14px → 40px).
