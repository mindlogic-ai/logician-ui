---
'@mindlogic-ai/logician-ui': minor
---

Motion pass: eight components now move on the shared timing scale, and the
timing layer gains a named vocabulary.

Nothing here changes an API surface a consumer types against — every component
change is to how it moves, so the thing to check after upgrading is feel, not
types. `Theme/Motion` in Storybook is the reference.

## The vocabulary

Components pick a **preset by intent** and the timing comes with it. The presets
live in `theme.animationStyles`, the same composition slot `textStyles` uses, so
they are applied like a text style and a consuming app can remap one from its
own config:

```tsx
<Switch.Thumb    animationStyle="spring" transitionProperty="translate" />
<Progress.Range  animationStyle="travel" transitionProperty="width" />
```

`press` (contact) · `feedback` (hover and state) · `travel` (moving to a new
position) · `spring` (a physical flip, or two things crossing). Two hatches sit
below them for cases a single preset cannot express: `composite` (an element
needing two clocks, like Button) and `arkTravel` (parts whose `transition-*` Ark
writes inline, where a class rule cannot reach). `checkmarkDraw` is there too,
because an animation does not turn off like a transition — killing it alone would
park `stroke-dashoffset` at its start and leave the tick invisible.

`transitionProperty` stays at the call site because it genuinely varies per
element. Each preset defaults it to `none` rather than omitting it: CSS defaults
`transition-property` to `all`, so a preset without one would quietly animate
every property on the element. Forgetting the prop now means nothing moves,
which is visible.

Reduced motion lives **inside** the presets. "Anything that animates must honour
`prefers-reduced-motion`" is a policy, not a per-component decision — written by
hand it was already spread across 13 places, and the 14th component is the one
that forgets.

## What moves differently

**SegmentedControl** runs on the house timing rather than Ark's default. Its
indicator was already sliding — Ark writes the `transition-*` declarations
**inline**, at 150ms on an unset curve — which is also why the obvious fix does
nothing: an inline declaration beats any class rule, so `transitionDuration` as a
prop never reaches the element. Retiming goes through the custom properties those
inline `var()`s read, which is what `arkTravel` sets.

**Button** splits the press out of its blanket transition. `transitionProperty="all"`
at a flat `0.25s` put the press on the same clock as a colour change. The press
is also now the individual `scale` property rather than `transform: scale()`,
which used to _replace_ a transform the call site had set for positioning.

**Switch** gives the thumb the `overshoot` curve — the only one that survives
~16px of travel, because it reverses direction.

**Checkbox** strokes its tick on rather than flashing it, 60ms after the box
fills, so the two read as "pressed" then "confirmed".

**CopyableCode** gained a confirmation it never had: it used to call `onCopy` and
leave the button untouched.

**ColorModeToggle**'s two icons rotate through each other instead of being
swapped by a ternary. The page-wide colour flip stays instant —
`disableTransitionOnChange` is set deliberately and this animates the button only.

**ProgressBar** drops `ease-in-out` for `emphasized`. Easing in is a fiction for a
value that only moves one way and arrives in jumps.

Folding onto the presets also normalised timings that had drifted: the same "a
colour changes on hover" was written with four different easings across four
files. `Card` hover now runs at 150ms rather than 300ms, `ColorModeToggle` at
300ms rather than 500ms, `FileInput` at 150ms rather than 200ms.

`ExpandableText` is deferred: it does swap text with no transition, but animating
that needs a measured height (which is why Chakra's own `expand-height`
interpolates to a `--height` Ark sets), so it should be rebuilt on the
`Collapsible` primitive as its own change.

## Proposals checked and not taken

Recorded with the evidence so the same four do not come back around. The common
thread: a component file being silent about motion does not mean it has none —
these behaviours live in Chakra's recipes and in Ark's runtime, neither of which
a grep over `src/components` ever sees.

- **Modal, "exit in half the enter time"** — already true before this change:
  `motionPreset: "scale"` is the default and gives content 200ms in / 100ms out.
  What was missing was the travel and the curve, which this release adds.
- **Accordion, "grid-template-rows 0fr→1fr to drop the JS measurement"** — the
  height already animates (`expand-height` at `moderate`). The grid technique is
  not reachable without replacing Chakra's content slot: Ark's presence sets
  `hidden` on the collapsed panel, and a `display: none` element cannot
  transition its rows. Nothing a reader would see changes either way, so this is
  a robustness refactor rather than a motion change.
- **Menu, "300ms hover-intent on open"** — hover-intent already exists, at
  100ms: Zag opens a submenu on `TRIGGER_POINTERMOVE` through an `opening` state
  whose `waitForOpenDelay` is a 100ms timer that `TRIGGER_POINTERLEAVE` cancels.
  Root menus open on click, so the scenario the proposal described — a row of
  triggers that flicker as the cursor crosses them — does not exist here at all.
  The delay is hardcoded in the machine with no prop, so 300ms is not reachable
  without owning the open state.
- **Button `loading`** — the prop exists and is inherited from Chakra, and
  `Loader` preserves the button's width when used without `loadingText`. But the
  proposal's actual point was a label _swap_ changing the width, which Chakra
  does not address; that is what `Swap` now does.
