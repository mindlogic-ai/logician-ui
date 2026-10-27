---
'@mindlogic-ai/logician-ui': minor
---

Button: new opt-in `focusableWhenDisabled` + `onDisabledClick`. With `disabled`, the button renders `aria-disabled="true"` (and `data-disabled`) instead of the native attribute, so it keeps the disabled look, stays in the Tab order and can explain itself: a press (click, Enter, Space) calls `onDisabledClick` instead of `onClick` and cancels the default action, so `type="submit"` does not submit. `loading` still disables natively. Without the prop nothing changes.
