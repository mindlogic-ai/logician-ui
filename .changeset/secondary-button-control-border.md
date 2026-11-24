---
'@mindlogic-ai/logician-ui': patch
---

Secondary Button and IconButton outlines use `border.control` (3:1), the same
token as Input, Select and Checkbox, instead of the decorative `border.default`
(~1.4:1). A secondary button next to a field now has the same border.
