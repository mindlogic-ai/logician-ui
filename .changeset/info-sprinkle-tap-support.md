---
'@mindlogic-ai/logician-ui': patch
---

fix(InfoSprinkle): open on tap on touch devices

`InfoSprinkle` is built on Chakra's `HoverCard`, whose underlying machine opens
on mouse hover and on focus but ignores touch pointers. Browsers that focus the
trigger on tap (e.g. Android Chrome) opened it anyway, but those that don't focus
buttons on tap (e.g. iOS Safari) never did. The trigger now opens the card on tap
on non-hover devices, while keeping the existing hover-to-open behaviour on
desktop; dismissal continues to use the HoverCard's own tap-outside / blur
handling. `open` / `defaultOpen` / `onOpenChange` continue to work for controlled
usage, and any `iconButtonProps.onClick` you pass is still called.

Also exports a new `useHasHover` hook used to detect hover-capable pointers.
