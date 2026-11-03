---
'@mindlogic-ai/logician-ui': minor
---

Two state colour roles. `control.on` (+ `control.onFg`) is binary on/off state:
the Switch track when on, a selected toggle chip, any on/off control. It keeps
the green Switch already used (#30862D light / #8FC46E dark), so Switch looks
the same; it now reads `control.on`/`control.onFg` instead of borrowing
`success.solid`/`success.onSolid`. `mark.starred` is anything the user marked
to keep (favourites, saved templates, starred items, bookmarks), from the
yellow hue: #B78100 light (3.41:1 on white, ≥ 3.01:1 on every light layer),
#E4AC44 dark (≥ 4.72:1 on every dark layer). Rule, in SemanticTokens.mdx and
Brand & colour usage: binary on/off state uses `control.on`; user-marked items
use `mark.starred`; never `primary`/black/white or a status colour for state.
