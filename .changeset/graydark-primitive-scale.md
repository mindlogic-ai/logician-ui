---
'@mindlogic-ai/logician-ui': minor
---

Expose the dark-mode neutrals as an overridable `colors.grayDark` primitive scale.

The desaturated dark neutrals were inlined as hex literals inside the semantic tokens (the internal `desaturatedGray` table, plus the three a11y-lifted text steps on `slate.600`/`slate.700`/`fg.subtle`). Because they were literals rather than token references, a consumer merging its own config into `LogicianProvider` could retint light mode through `gray.*` but had no way to reach dark mode — dark surfaces stayed cool slate under any brand palette.

Those values now live in `colors.grayDark` (steps `0`–`1500`, plus `fg600`/`fg700`/`fgSubtle`), and every dark-mode neutral in the semantic layer — `slate.*` and the `_dark` arm of `bg.*`/`fg.*`/`border.*` — references `{colors.grayDark.N}`. A consumer can now override the dark neutral ramp exactly the way it overrides `blue.*` for the primary ramp.

Default rendering is unchanged: all 154 resolved semantic color values are byte-identical before and after.
