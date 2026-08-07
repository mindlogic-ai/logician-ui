---
'@mindlogic-ai/logician-ui': minor
---

Add motion tokens (durations + easings), and fix three transitions that never ran.

The design system had no timing layer: every animated surface hardcoded its own
duration and curve, so `Button` transitioned over `0.25s` while `ProgressBar`
used `0.3s` and `Tree` used `0.15s`, with nothing tying them together. This adds
that layer so the next component reaches for a token instead of inventing a
number.

**Durations** are prefixed (`motion.instant` / `motion.press` / `motion.base` /
`motion.slow` / `motion.slower`) rather than merged into Chakra's own scale.
Chakra already defines `fast` (150ms), `slow` (300ms) and `slower` (400ms), and
our `slow`/`slower` mean 500ms/700ms — redefining them would silently retime
every Chakra component that references them (`dialog`, `drawer` and `progress`
all do), so a Modal's backdrop would start fading over 500ms because a reward
flight wanted that duration. A shared library must not change the meaning of a
token it did not define.

For 150ms and 200ms there are deliberately no `motion.*` tokens — Chakra's
`fast` and `moderate` already cover them exactly, and two names for one number
is worse than remembering which scale to reach into.

**Easings** (`standard` / `emphasized` / `overshoot`) need no prefix: Chakra's
are `ease-in` / `ease-out` / `ease-in-out` / `ease-in-smooth`, so nothing
collides.

Raw values are exported too (`MOTION_DURATION_MS`, `MOTION_DURATION_S`,
`MOTION_EASE`, `MOTION_EASE_CSS`) for animation tech that cannot read a CSS
variable — framer-motion, `Element.animate`, timer-driven sequences.

**Three transitions were declared but never played**, all for the same reason —
invalid CSS is dropped silently, so the code read as if it animated:

- `Card` set `transitionDuration="normal"`, a Chakra v2 token that no longer
  exists in v3. It fell through as a literal, and `transition-duration: normal`
  is not valid CSS, so the declaration was discarded and the card's hover
  changed instantly. Now `motion.base`.
- `FileInput` set `transition="ease-in"` — a shorthand with a timing function
  but no duration resolves to `0s`, so the `_groupHover` opacity fade snapped in
  one frame. Now an explicit `opacity` / `moderate` / `ease-in` triple.
- `SectionLoader` set `transition="0.3 opacity ease"` — the missing `s` made the
  value unparseable and the whole declaration was dropped. Its sibling
  `PageLoader` has the same line written correctly. Now `0.3s`.

`Card` and `FileInput` also gain `_motionReduce`, since both now actually
animate.

No component consumes the new tokens yet, so apart from those three fixes
nothing changes visually — this release is the foundation for the motion pass
that follows.
