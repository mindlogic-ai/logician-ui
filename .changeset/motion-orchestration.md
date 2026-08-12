---
'@mindlogic-ai/logician-ui': minor
---

Motion orchestration: enter/exit as an enforced policy, a vocabulary for
continuous motion, and a CSS-only stagger. Adds one component (`Skeleton`) and
one exported utility (`staggerProps`).

Every timing here is a token or a preset. The rule the three parts share is that
a decision about motion belongs in `theme/motion.ts`, where a test can reach it —
not in the component that happened to need it first.

## presence — leaving takes half as long as arriving

An enter has to be *read*: something appeared and the reader has to find it. An
exit has already been decided — the reader dismissed the thing and is looking at
what is behind it — so every millisecond the leaving element still owns the
screen is a millisecond of waiting. 300ms in on `emphasized`, 150ms out on
`standard`.

`Modal` already had that ratio; it is now a `presence` preset the Modal consumes
rather than a number written once. Applied to **Menu**, **Popover**, **Tooltip**,
**Select**, **Combobox** and **Collapsible**, all of which were on Chakra's
defaults: near-symmetric (`Tooltip` was 150/150) or so short on the way out that
the surface reads as cut off rather than dismissed (`Select` exits over 50ms,
`Combobox` over `0s`). Enters lengthen from 150ms to 300ms — the visible half of
this change, and the one worth judging in Storybook.

The preset declares **only the clock, never `animation-name`**. That is what lets
one preset sit on six unrelated parts: the menu keeps sliding from its trigger,
the popover keeps scaling from its origin, and the collapsible keeps
interpolating the height Ark measures. A preset that also named an animation
would have flattened the third into a fade.

A test walks the whole vocabulary: any preset declaring `_open` must declare
`_closed`, and the closed duration must *resolve* to strictly fewer milliseconds
than the open one. The policy is now enforced rather than remembered.

**Not applied to `Toast`** — Chakra moves it with a `transition` shorthand rather
than a keyframe animation, so an `animation-*` clock lands on it and does nothing
at all. Retiming it means rewriting the shorthand, which is a `composite` job and
a separate decision; shipping the prop would have looked applied and changed
nothing.

## loop — `spin`, `pulse`, `shimmer`, `indeterminate`

Presets carrying `animationIterationCount: infinite`, plus the `shimmer`,
`indeterminate` and `stagger-in` keyframes. `spin` and `pulse` name **Chakra's**
existing keyframes rather than redefining them: re-declaring a keyframe under a
name we did not author replaces it for every Chakra component that reads it — the
trap the `motion.` duration prefix exists to avoid, one layer down.

`spin` and `indeterminate` are `linear`, and that is not taste. Both return to
their own start, so an eased cycle decelerates into the last frame and
accelerates out of the first — the same position — and the eye catches a stutter
once per revolution.

**Reduced motion for a loop is not `duration: 0`.** Zeroing a finite transition
keeps its end state; zeroing a loop parks the element at an arbitrary frame. So
each preset decides for itself, and the four answers differ: the spinner keeps
turning at a slower rate (it is the only thing on screen asserting the request is
alive — freezing it says the opposite), while pulse, shimmer and the indeterminate
bar go still, because what they signal is carried by their shape. WCAG 2.2.2
(Pause, Stop, Hide) covers motion that auto-starts, runs past five seconds and
shares the screen with other content — a skeleton during a slow request is
exactly that, and a placeholder has nowhere to put a pause control.

- **`Skeleton`, new** — with `SkeletonText` and `SkeletonCircle`. Wraps Chakra's
  for its layout behaviour and replaces its animation: Chakra's `shine` and
  `pulse` variants bake a duration (`5s`, `1.2s`) into the same declaration as
  the paint. `SkeletonCircle` defaults to `pulse` — a sweep crossing an avatar is
  over before it reads as movement.
- **`Spinner`** — the hardcoded `animationDuration="0.65s"` is now
  `motion.loop.turn`, the same 650ms.
- **`ProgressBar`** — gains `indeterminate`, for work with no denominator.

## stagger — CSS only, enter only

`staggerProps(index)` sets one inline custom property; the preset owns the
keyframe, the duration, the curve and the cap. No JS timers, no framer-motion, no
wrapper component — a wrapper needs a DOM node, and an extra element inside
`Menu.Content` is not free, since Ark walks those children for typeahead and
roving focus.

**The `min()` cap is the point.** Uncapped, the delay is linear in the index, so
the fortieth row of a list arrives 1.4s after the first — not staggered, late.
Six steps of 35ms tops out at 210ms; everything past the sixth item arrives
together, which nobody notices.

**Enter only, or it is a bug.** It is an `animation-delay`, not a
`transition-delay`, deliberately: a transition delay applies to every *later*
property change on the element, so a hover would wait its index out and a filter
keystroke would re-deal the whole list. An animation runs once, on mount. For
parts Ark keeps mounted while closed, the closed branch parks `animation-name` at
`none` so reopening restarts it.

Wired up, all opt-in: `Menu.List stagger`, `SelectField stagger`,
`FileList stagger`. Deliberately not wired: **`ComboboxField`** (its options
remount on every keystroke, which is the failure mode above), **`Toast`** (toasts
arrive one at a time and Ark manages the stack offset inline), **`Tree`** (child
composition belongs to the call site, so the library cannot know the index), and
**`Masonry` / `Table`** (long, virtualizable — where "index" would mean position
in a scrolling window — and re-sorted on click).

Also generalises the Checkbox's hand-rolled 60ms tick delay into a `motion.beat`
token, which `checkmarkDraw` and `dotPop` now both read.
