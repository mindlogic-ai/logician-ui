---
'@mindlogic-ai/logician-ui': patch
---

Fix the empty gap beneath `Banner` text at the `sm` and `lg` sizes.

The banner icon was hardcoded to `boxSize="md"` (24px) regardless of the
`size` prop, so the per-size icon sizes declared in `sizeStyles` (`sm → 20px`,
`lg → 32px`) were dead config. On a `sm` banner the 24px icon was taller than
a single line of `subtext` (14px × 1.4 ≈ 19.6px). Because the icon/text row
uses `align="stretch"`, the oversized icon set the row height and the shorter,
top-aligned text left ~4px of empty space below it — the visible "gap." It
never showed in Storybook because the string stories all render at the default
`md` size, where the icon and text heights happen to match exactly.

Drive the icon from `sizeStyles[size].icon.boxSize` so the icon matches the
text line-height at each size. This resolves the gap for every `size="sm"`
Banner (the API Gateway "models_gateway_notice" banner and ~20 other admin /
dashboard call sites) and correctly enlarges the icon at `size="lg"`; `md` is
unchanged.
