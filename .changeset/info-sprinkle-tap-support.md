---
'@mindlogic-ai/logician-ui': patch
---

fix(InfoSprinkle): open on tap on touch devices

`InfoSprinkle` is built on Chakra's `HoverCard`, whose underlying machine only
opens on mouse hover/focus and ignores touch — so the card never opened when
tapped on mobile. The trigger now toggles the card on tap when the primary
pointer can't hover, while keeping the existing hover-to-open behaviour on
desktop. `open` / `defaultOpen` / `onOpenChange` continue to work for controlled
usage, and any `iconButtonProps.onClick` you pass is still called.

Also exports a new `useHasHover` hook used to detect hover-capable pointers.
