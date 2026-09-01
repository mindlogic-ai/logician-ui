---
'@mindlogic-ai/logician-ui': minor
---

Add the motion layer: a timing scale, a seven-preset vocabulary, and eight
primitives.

There was no timing layer, so every animated surface invented its own numbers —
`Button` over `0.25s`, `ProgressBar` over `0.3s`, `Tree` over `0.15s`, with
nothing tying them together. Nothing here changes an API a consumer types
against except where noted, so the thing to check after upgrading is **feel**.
`Theme/Motion` in Storybook is the reference.

## The scale

Durations are prefixed (`motion.instant` / `motion.press` / `motion.base` /
`motion.slow` / `motion.slower` / `motion.celebrate.*` / `motion.loop.*`) rather
than merged into Chakra's. Chakra already defines `fast` (150ms), `slow` (300ms)
and `slower` (400ms), and our `slow`/`slower` mean 500ms/700ms — redefining them
would silently retime every Chakra component that reads them (`dialog`, `drawer`
and `progress` all do), so a Modal backdrop would start fading over 500ms
because a reward flight wanted that duration. **A shared library must not change
the meaning of a token it did not define.** For 150ms and 200ms there are
deliberately no `motion.*` tokens: Chakra's `fast` and `moderate` already cover
them exactly, and two names for one number is worse than remembering which scale
to reach into.

Easings (`standard` / `emphasized` / `overshoot`) need no prefix — Chakra's are
`ease-in` / `ease-out` / `ease-in-out` / `ease-in-smooth`, so nothing collides.

Raw values are exported too (`MOTION_DURATION_MS`, `MOTION_DURATION_S`,
`MOTION_EASE`, `MOTION_EASE_CSS`) for animation tech that cannot read a CSS
variable, plus `cubicBezier(curve)` for motion JavaScript has to drive frame by
frame — without it a count-up beside a card reaches for an `easeOutCubic` off
the internet and lands on a different curve from the card.

## The vocabulary — seven presets, and seven is the policy

Components pick a preset **by intent** and the timing comes with it. They live
in `theme.animationStyles`, the same composition slot `textStyles` uses, so they
apply like a text style and a consuming app can remap one from its own config:

```tsx
<Switch.Thumb   animationStyle="spring" transitionProperty="translate" />
<Progress.Range animationStyle="travel" transitionProperty="width" />
```

`press` (contact) · `feedback` (hover and state) · `travel` (moving to a new
position) · `spring` (a physical flip, or two things crossing) · `presence`
(a part with both an open and a closed state) · `stagger` (siblings arriving in
sequence) · `composite` (the escape hatch, for an element needing two clocks).

**That is the whole list, and the count is deliberate** — twenty presets is the
same as none. Six motions that had exactly one caller moved *out* of the shared
layer and next to that caller instead: `spin` → `Spinner.styles.ts`,
`indeterminate` → `ProgressBar.styles.ts`, `checkmarkDraw` →
`Checkbox.styles.ts`, `dotPop` → `Radio.styles.ts`, the Ark indicator hatch →
`SegmentedControl.styles.ts`, and the Modal's two keyframes →
`Modal.styles.ts`. Rendered output is unchanged; every one was measured in a
browser before and after. The duration tokens they read stay global — that is
the scale, and only the *composition* was local.

Two things are baked into the preset definitions rather than left to each
component:

- **`transitionProperty` defaults to `none`.** CSS defaults it to `all`, so a
  preset without one would quietly animate every property on the element —
  which is the bug `Button` had, moving a call site's width and padding on
  hover. Forgetting the prop now means nothing moves, which is *visible*.
- **Reduced motion.** "Anything that animates must honour
  `prefers-reduced-motion`" is a policy, not a per-component decision; written
  by hand it was already spread across 13 places, and the 14th component is the
  one that forgets. Loops are the exception and do not zero out — a frozen
  spinner reads as a dead request, so it slows instead.

## presence — leaving takes half as long as arriving

An enter has to be *read*. An exit has already been decided, so every
millisecond the leaving element still owns the screen is a millisecond of
waiting. **300ms in on `emphasized`, 150ms out on `standard`**, applied to
`Menu`, `Popover`, `Tooltip`, `Select`, `Combobox` and `Collapsible`, all of
which were on Chakra's defaults: near-symmetric (`Tooltip` 150/150) or so short
leaving that the surface reads as cut off rather than dismissed (`Select` 50ms,
`Combobox` `0s`). **Enters lengthen from 150ms to 300ms — the visible half of
this change, and the one worth judging in Storybook.** `Modal` already had the
ratio and now reads the preset rather than restating the numbers.

The preset declares only the clock, never `animation-name`. That is what lets
one preset sit on seven unrelated parts: the menu keeps sliding from its
trigger, the popover keeps scaling from its origin, the collapsible keeps
interpolating the height Ark measures. A test walks the vocabulary and asserts
that any preset declaring `_open` declares `_closed`, and that the closed
duration *resolves* to strictly fewer milliseconds — the ratio is enforced, not
remembered.

Not applied to `Toast`: Chakra moves it with a `transition` shorthand rather
than a keyframe, so an `animation-*` clock lands on it and does nothing at all.
Shipping the prop would have looked applied and changed nothing.

## stagger — CSS only, enter only

`staggerProps(index)` sets one inline custom property; the preset owns the
keyframe, duration, curve and cap. No JS timers, no wrapper component — a
wrapper needs a DOM node, and an extra element inside `Menu.Content` is not
free, since Ark walks those children for typeahead and roving focus.

**The cap is the point.** Uncapped, the delay is linear in the index, so the
fortieth row arrives 1.4s after the first — not staggered, late. Six steps of
35ms tops out at 210ms and everything past the sixth item arrives together,
which nobody notices.

It is an `animation-delay`, not a `transition-delay`, deliberately: a transition
delay applies to every *later* property change on the element, so a hover would
wait its index out and a filter keystroke would re-deal the whole list.

Opt-in on `Menu.List`, `SelectField` and `FileList`. Deliberately not wired on
`ComboboxField` (options remount on every keystroke — the failure mode above),
`Toast` (they arrive one at a time), `Tree` (child composition belongs to the
call site, so the library cannot know the index), and `Masonry` / `Table` (long,
virtualizable, re-sorted on click).

## What moves differently

- **Button** splits the press out of its blanket transition — `all` at a flat
  `0.25s` put the press on the same clock as a colour change. The press is now
  the individual `scale` property rather than `transform: scale()`, which used
  to *replace* a transform the call site had set for positioning.
- **SegmentedControl** runs on house timing rather than Ark's 150ms default.
  Ark writes that part's `transition-*` **inline**, and an inline declaration
  beats any class rule — which is why `transitionDuration` as a prop never
  reached it. Retiming goes through the custom properties those inline `var()`s
  read.
- **Switch** gives the thumb `overshoot`, the only curve that survives ~16px of
  travel, because it reverses direction.
- **Checkbox** strokes its tick on rather than flashing it, 60ms after the box
  fills, so the two read as "pressed" then "confirmed".
- **ColorModeToggle**'s icons rotate through each other instead of being swapped
  by a ternary. The page-wide colour flip stays instant.
- **ProgressBar** drops `ease-in-out` for `emphasized` — easing in is a fiction
  for a value that only moves one way — and gains `indeterminate`, for work with
  no denominator.
- **Spinner**'s hardcoded `0.65s` is now `motion.loop.turn`, the same 650ms.

Folding onto the presets also normalised timings that had drifted: the same "a
colour changes on hover" was written with four different easings across four
files. `Card` hover now runs at 150ms rather than 300ms, `ColorModeToggle` at
300ms rather than 500ms, `FileInput` at 150ms rather than 200ms.

## Eight primitives

FactChat had built its own motion layer — `src/components/motion/`, seven
components on a duplicated copy of these tokens, all of them on framer-motion.
Rebuilding them here answered a question the vocabulary alone could not: what
does the scale actually hold once real motion goes through it?

**`Pulse`** pops once when `trigger` changes. **`Shake`** is its counterpart and
refuses; keep them apart, because a shake used as emphasis reads as an error.
Both replay through a changed `key` — a new element runs its animation from the
top, the same trick `stagger` uses to replay on reopen.

**`Appear`** brings an element in on mount. It is the third of three entrances
and the one to reach for last: if the element can close, `presence`; if siblings
arrive with it, `stagger`; otherwise this. **`Reveal`** opens a block out of
nothing through `grid-template-rows: 0fr → 1fr` rather than measuring a height.
**`FlyTo`** arcs a ghost between two measured rects. **`Confetti`** bursts.
**`CountUp`** counts. **`SwapTransition`** slides one piece of content out and
the next in, and is the only one keeping React state — the outgoing subtree has
to stay on screen long enough to leave while React has already been told to
render the new one. Fifteen lines holding one child through one exit.

**No framer-motion.** It stays a devDependency.

Each primitive's TSDoc states what it adds to the DOM, since it varies: `Pulse`,
`Shake` and `Appear` wrap children in one `div`; `Reveal` and `SwapTransition`
in two; `FlyTo` portals and adds nothing in place; `Confetti` is an overlay and
`CountUp` is itself the `<span>`.

The scale gained `motion.celebrate` — `burst` (900ms) and `fall` (1800ms) —
split for the reason `loop` splits into `turn` and `sweep`: the period is set by
how far the thing travels. Everything below it answers "how long until the
interface responded", and its ceiling was `slower` (700ms) because past that a
response reads as a wait. A celebration inverts that; it exists to be watched.
Both codebases had already written the literal.

`Confetti`'s default colours are literal hex, the one place here deliberately
off the palette. Semantic tokens mean things, and raining the error red over
"payment complete" says something the screen does not. The palette is also built
for interface legibility — average lightness 47%, three of five in the blue
range — so fifty pieces of it read as a chart legend falling. The cost is stated
rather than hidden: these do not follow a re-theme and do not adapt to dark
mode. `colors` is a prop for apps that need their own.

## Three lint rules, because types cannot do this

Chakra declares the prop as
`ConditionalValue<UtilityValues["animationStyle"] | CssVars | AnyString>`, so
`AnyString` accepts every typo and `ConditionalValue` accepts every array —
both compile, and both then do something other than what was written. A typo
does nothing at all; an array is read as **responsive breakpoints**, one motion
below `sm` and another above, which is the mistake that looks correct on the
machine that wrote it.

So `animationStyle` now rejects a name outside the vocabulary, rejects the array
and breakpoint-object forms, and rejects a transition preset with no
`transitionProperty` to scope it. All three were run across the library first to
confirm zero false positives, and `motionGuards.test.ts` lints the cases through
ESLint and asserts which report — so the rules cannot be deleted in an unrelated
cleanup without something failing.

## Three transitions that were declared but never played

All for the same reason: invalid CSS is dropped silently, so the code read as if
it animated.

- `Card` set `transitionDuration="normal"`, a Chakra v2 token that no longer
  exists in v3. It fell through as a literal, `transition-duration: normal` is
  not valid CSS, and the declaration was discarded — the card's hover changed
  instantly.
- `FileInput` set `transition="ease-in"` — a shorthand with a timing function
  but no duration resolves to `0s`, so the `_groupHover` fade snapped in one
  frame.
- `SectionLoader` set `transition="0.3 opacity ease"` — the missing `s` made the
  value unparseable and the whole declaration was dropped. Its sibling
  `PageLoader` has the same line written correctly.

`Card` and `FileInput` also gain `_motionReduce`, since both now actually
animate.

## New exports

The eight primitives, `staggerProps`, `cubicBezier`, and from the theme:
`durations`, `easings`, `animationStyles`, `MOTION_DURATION_MS`,
`MOTION_DURATION_S`, `MOTION_EASE`, `MOTION_EASE_CSS`, `MOTION_STAGGER_MAX`,
and the `MotionDurationToken` / `MotionEaseToken` / `MotionStyleToken` types.

`keyframes` is deliberately **not** exported — it is registered with the theme
and referenced by name in CSS, so a consumer never needs the object, and
exporting it would invite redefining a keyframe under a name we do not own.
