---
'@mindlogic-ai/logician-ui': patch
---

fix(dark-mode): flip FileInput upload panel + LineGraph tooltip label

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
