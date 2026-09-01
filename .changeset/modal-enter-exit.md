---
'@mindlogic-ai/logician-ui': patch
---

Modal enters from below and leaves in half the time.

Chakra's default `motionPreset: "scale"` already had the ratio right — 200ms in,
100ms out — but it scales from a flat `0.95` with no vertical travel and no
named curve, so the dialog appeared in place rather than arriving.

Content now enters over `motion.base` on `emphasized`, from `scale(0.94)` and
10px below, and leaves over `fast` by shrinking to `0.97` **without** the
travel: an exit only has to get out of the way, and moving away draws the eye to
something that is leaving. The backdrop was retimed to match — it exited over
200ms while the content now leaves in 150, so the scrim outlasted the dialog it
was dimming for. This had to be set in `Modal` itself as well as `ModalOverlay`,
because `Modal` renders `Dialog.Backdrop` directly and never uses the exported
overlay component.

Under `prefers-reduced-motion` this keeps a plain fade rather than dropping to
`0ms` like the transition presets do. A modal that appears with no transition at
all reads as a page swap; what has to go is the movement, not the fact that
something changed.
