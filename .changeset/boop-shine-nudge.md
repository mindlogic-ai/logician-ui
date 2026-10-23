---
'@mindlogic-ai/logician-ui': minor
---

Three more motion components from the 18-item proposal set, with `SuccessCheck`
the fourth in the same release.

**`Boop`** — a hover that answers: the child leans, swells or hops while the
pointer is over it. The smallest motion in the set and the only one tied to the
pointer, so it is a transition rather than a keyframe. `gesture` picks one of
`tilt` / `grow` / `lift`; one per surface, because a toolbar whose icons each
boop differently reads as three unrelated controls. It carries no information,
which is why it is removed outright under reduced motion — the hover state
itself says the same thing without moving.

**`Shine`** — a band of light that crosses the surface, rests, and crosses
again, riding the wrapper's `::after` so nothing inside it moves. For the one
thing on a screen that should keep asking: an upgrade CTA, a trial banner. The
rest between passes is the component; without it the band reads as a loading
bar stuck on a button. `periodMs` raises the gap (the default is the house loop,
1800ms, which next to reading content is often too eager) and `colour` takes any
CSS colour, because the default white wash is invisible on a pale surface.

**`Nudge`** — leans once whenever `trigger` changes, for a call to action the
reader has walked past. It has no memory of its own, so cap the count at the
call site: two is usually the whole budget. Kept apart from the other two
trigger-replayed wrappers on the axis each already uses — `Shake` travels
sideways and refuses, `Pulse` scales and says something good landed, `Nudge`
rotates and asks.

`Shine` and `Nudge` are removed entirely under reduced motion, so whatever they
point at has to be legible in the copy, the colour and the placement on its own;
each ships a story showing exactly what those readers get.

Adds the keyframes `shine-sweep`, `nudge-wiggle` and `nudge-wiggle-alt`. The two
nudge keyframes are byte-identical and alternate by play count, the way `Pulse`
and `Shake` replay, because a CSS animation restarts when its name changes and
remounting on a `key` would drop keyboard focus.
