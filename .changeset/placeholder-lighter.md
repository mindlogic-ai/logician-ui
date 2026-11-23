---
'@mindlogic-ai/logician-ui': patch
---

Placeholders are lighter so an empty field no longer reads like a typed value
(R30 2nd-round QA #8). Native `::placeholder`, `[data-placeholder]` and
Select's empty value text now use `fg.placeholder`, which is 3.5:1 on the
surface (BAZE light `#8D8882`, dark `#7D7C7A`) instead of Chakra's
`fg.muted/80` (~6:1). High-contrast modes keep 7:1.
