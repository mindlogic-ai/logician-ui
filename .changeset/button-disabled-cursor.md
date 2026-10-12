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
