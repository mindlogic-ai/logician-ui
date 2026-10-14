---
'@mindlogic-ai/logician-ui': patch
---

`Radio` springs its dot in instead of flashing it.

The checkbox half of this shipped already; the radio half did not, because the
obvious approach does not apply to it. Chakra's radio mark is not a stroked
path — it is a `.dot` element the recipe rests at `scale: 0.4` — so there is no
line to draw on. It is also only mounted once the item is checked, which rules
out a transition: nothing precedes it to interpolate from.

So the dot grows from nothing, as a keyframe, on `overshoot` — the one curve
that stays legible across 8px, because it reverses direction. The ring fills
first and the dot follows 60ms later, the same two beats the checkbox has:
pressed, then confirmed. Measured frame by frame, it peaks at `0.439` around
240ms and settles at exactly `0.4`, which is where the recipe rests it — landing
anywhere else would make the dot jump the moment the animation hands back.

Unlike the checkmark, the reduced-motion branch only switches the animation off:
the resting scale is already declared, so nothing needs undoing. The checkmark's
dash pattern is only correct _while_ its animation runs, which is why that one
has to clean up after itself.

The ring's own fill now eases too — it had no transition at all.
