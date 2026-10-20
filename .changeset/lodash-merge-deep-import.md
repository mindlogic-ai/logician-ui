---
'@mindlogic-ai/logician-ui': patch
---

Use `lodash/merge` deep import instead of the full `lodash` package so consumers only bundle the merge function
