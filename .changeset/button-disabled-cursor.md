---
'@mindlogic-ai/logician-ui': patch
---

A disabled `Button` or `MenuItem` no longer shows the pointer cursor.

Both set `cursor="pointer"` as a style prop. Chakra emits style props outside its
cascade layers and the recipe's disabled cursor inside `@layer recipes`, so the
pointer always won and a disabled control read as clickable. The disabled
cursor (`not-allowed`) now sits beside it. On `Button` it is merged with the
call site's `_disabled` the way `_hover`/`_active` already are, so a call site
that styles its disabled state does not lose the cursor.

A `loading` Button (which Chakra also disables) shows `progress` instead: it is
working, not forbidden.

`_hover`, `_active` and `_disabled` from the call site are now deep-merged with
the variant's own (`mergeCss`), so a nested condition such as `_dark` adds to
the variant's instead of replacing it — e.g. `lift`'s dark-mode hover shadow
survives a call site's `_hover={{ _dark: … }}`.
