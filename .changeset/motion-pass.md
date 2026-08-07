---
'@mindlogic-ai/logician-ui': minor
---

Motion pass: eight components now move on the shared timing scale.

Nothing here changes an API — every change is to how a component moves, so the
thing to check after upgrading is feel, not types. `Theme/Motion pass` in
Storybook puts all eight side by side with what each did before.

**SegmentedControl was the one actually broken.** Chakra's `segment-group`
recipe positions the indicator through `--left`/`--width` but declares no
transition, so the thumb teleported between segments — the slide the control is
supposed to have never existed. It now transitions over `motion.base`.

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
