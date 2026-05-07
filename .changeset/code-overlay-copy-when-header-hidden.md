---
'@mindlogic-ai/logician-ui': patch
---

fix(Code): render copy button as floating overlay when `hideHeader` is true

Previously, setting `hideHeader` removed the entire header — including the copy
button — even when `onCopy` was provided. The copy trigger now renders as a
top-right overlay (`IconButton` ghost variant with a tooltip, matching the
`CodeTabs` copy button) whenever the header is hidden but `onCopy` is set.
Positioned at `top={2} right={3}` so the icon sits in the upper-right corner
without overlapping the first line of code. Exposes `.ml-code-copy` className
hook for consumer overrides.
