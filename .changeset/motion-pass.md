---
'@mindlogic-ai/logician-ui': minor
---

Motion pass: eight components now move on the shared timing scale.

Nothing here changes an API — every change is to how a component moves, so the
thing to check after upgrading is feel, not types. `Theme/Motion pass` in
Storybook puts all eight side by side with what each did before.

**SegmentedControl** now runs on the house timing rather than Ark's default.
Its indicator was already sliding — Ark writes the `transition-*` declarations
**inline**, at 150ms on an unset curve — which is also why the obvious fix does
nothing: an inline declaration beats any class rule, so `transitionDuration` as
a prop never reaches the element. Retiming goes through the custom properties
those inline `var()`s read, and `transitions.arkTiming()` is the preset for it.
It is 300ms on `emphasized` now, so the thumb arrives under the finger and
settles instead of skating.

**Button** splits the press out of its blanket transition. `transitionProperty="all"`
at a flat `0.25s` put `scale(0.97)` on the same clock as a colour change, so the
finger was long gone while the button was still sinking. `transform` now takes
`motion.press` (120ms); colour, border and shadow keep 150ms.

**Switch** gives the thumb the `overshoot` curve — the only one that survives
~16px of travel, because it reverses direction.

**Checkbox** strokes its tick on rather than flashing it, 60ms after the box
fills, so the two read as "pressed" then "confirmed" instead of one flash.

**CopyableCode** gained a confirmation it never had: it used to call `onCopy`
and leave the button untouched, giving no sign the copy worked.

**ColorModeToggle**'s two icons now rotate through each other instead of being
swapped by a ternary. The page-wide colour flip stays instant — `disableTransitionOnChange`
is set deliberately and this animates the button only.

**ProgressBar** drops `ease-in-out` for `emphasized`. Easing in is a fiction for
a value that only moves one way and arrives in jumps.

**Card** is unchanged here but worth re-checking: the previous release fixed a
`transitionDuration="normal"` that was invalid CSS and silently dropped, so
Card hover now eases where it used to snap.

Four proposals were dropped after reading Chakra's recipes, because the "before"
they described did not exist — `Modal` already exits in half its enter time,
`Menu` opens on click so there is no hover to debounce, `Button`'s `loading`
prop already exists and already preserves width, and `Accordion` already
animates height. They are recorded with evidence in the `Dropped` story so the
same suggestions don't come back around.

`ExpandableText` is deferred, not dropped: it does swap text with no transition,
but animating that needs a measured height (which is why Chakra's own
`expand-height` interpolates to a `--height` Ark sets), so it should be rebuilt
on the `Collapsible` primitive as its own change.

## How to reach for it

Components pick a **transition preset** by intent rather than assembling a
duration and a curve by hand:

```tsx
<SegmentGroup.Indicator {...transitions.travel('left, width')} />
<Switch.Thumb {...transitions.spring('translate')} />
```

`press` (contact) · `feedback` (hover and state) · `travel` (moving to a new
position) · `spring` (a physical flip, or two things crossing) · `composite`
(the rare element needing two clocks, like Button). Each takes the property to
animate, because CSS defaults `transition-property` to `all` and a duration on
its own quietly animates everything on the element.

Reduced motion lives **inside** the presets. "Anything that animates must honour
`prefers-reduced-motion`" is a policy, not a per-component decision — written out
by hand it was already spread across 13 places, and the 14th component is the one
that forgets. `checkmarkDraw` is exported the same way, because an animation does
not turn off like a transition: killing it alone would park `stroke-dashoffset`
at its start value and leave the tick invisible, so the dash pattern has to be
undone as well.

Folding onto the presets also normalised a few timings that had drifted: the same
"a colour changes on hover" was written with four different easings across four
files. `Card` hover now runs at 150ms rather than 300ms, `ColorModeToggle` at
300ms rather than 500ms, and `FileInput` at 150ms rather than 200ms — all three
were arbitrary rather than reasoned, and hover feedback reads better fast.
