---
'@mindlogic-ai/logician-ui': patch
---

fix(dark-mode): migrate remaining non-flipping primitives to semantic tokens

A full-repo scan surfaced color values that stayed fixed across modes; map them
to semantic tokens so they flip. Two were dark-mode bugs:

- `SegmentedControl` selected-segment label was `gray.1500` (near-black) on the
  dark indicator → now `fg.default`, legible in both modes.
- `Card` `gradient` variant was a hardcoded light gradient (`#F5F8FD→#FFF`) → now
  `bg.subtle → bg.surface` with a `primary.light` border, so it flips.

Plus: CollapsibleTrigger hover, FileInput upload area, InfoSprinkle icon,
Pagination nav arrows, DatePicker calendar icons, PinInput border, and the
neutral progress/slider/switch/spinner/radial-progress **tracks** (`gray.200`
family → `bg.muted`). White slider knobs and brand/solid fills are intentionally
left as-is (they must stay visible / are mode-invariant by design). Light mode
is preserved aside from ~1-step token-mapping shifts.
