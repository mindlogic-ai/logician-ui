---
'@mindlogic-ai/logician-ui': minor
---

**`SuccessCheck`** — a success mark that draws itself: the ring closes, then
the tick is written inside it.

For the end of something the reader waited through — a report finished,
onboarding completed, an import that ran. Mount it when the work is done; it
draws once and stays.

It is not for a state that can change back. Drawing one spends 600ms of the
reader's attention, which is a full stop rather than a status; a checkbox or a
saved indicator that will say `unsaved` again stays an icon, and `Checkbox`
already owns the tick-draw for that case.

`label` is required. The mark is a graphic with no text of its own, so without
one it announces nothing and the confirmation reaches sighted readers only.
Colour comes from `currentColor`, so colour the surrounding element with a
semantic token rather than this one.

Under reduced motion the drawing is removed and the finished mark is simply
there. The confirmation survives; only the ceremony goes. That is why both
shapes rest at offset 0 and animate backwards from empty — a mark that animated
*into* existence would leave those readers with nothing.

Adds two keyframes, `ring-draw` and `tick-draw`, and their dash constants
`RING_DASH` and `TICK_DASH`. `tick-draw` is separate from `checkmark-draw`
rather than shared: the paths are different lengths, and a dash longer than its
path finishes revealing it partway through the animation and then idles.
