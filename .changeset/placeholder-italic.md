---
'@mindlogic-ai/logician-ui': patch
---

Placeholders are now italic so an empty field no longer reads like a typed
value (R30 2nd-round QA #8). A global `*::placeholder { font-style: italic }`
covers every native placeholder — Input, Textarea, PasswordInput, the
Combobox input, MonthPicker and any raw `<input>`/`<textarea>` in the app —
and Select's empty value text gets the same slant through its trigger recipe.
Placeholder colour is unchanged. Editors that draw a placeholder as their own
element (e.g. a Lexical contenteditable overlay) are not affected.
