---
'@mindlogic-ai/logician-ui': minor
---

Add `Overline` to the Typography scale.

A small, uppercase, letter-spaced label used as a section "eyebrow" or category heading (e.g. an `EXECUTION MODE` eyebrow above a panel heading, or a `RECENT` group label). It shares the `Subtext` size but bakes in the overline styling via a new `textStyle="overline"` token (uppercase, `0.05em` tracking, medium weight).

Authored to match the rest of the scale (`H1`–`H5`, `Text`, `Subtitle`, `Subtext`): renders a Chakra `Text` with `textStyle="overline"`, disables the textStyle when an explicit `fontSize` is passed, and exposes the full Chakra style-prop surface so brand/status variants are a single override (e.g. `color="primary.main"`, `fontWeight="extrabold"`).
