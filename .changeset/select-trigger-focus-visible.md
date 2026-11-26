---
'@mindlogic-ai/logician-ui': patch
---

`Select` trigger and `FieldTrigger` (and the date pickers built on it): the
focus ring (`primary.main` border plus 1px ring) now shows on keyboard focus
(`:focus-visible`) instead of any focus. Picking an option with the mouse no
longer leaves a ring on the trigger it returns focus to; a keyboard pick still
shows it, and the ring while the list is open is unchanged. An invalid trigger
keeps its red border. `Input` and the `Combobox` text input still ring on any
focus.
