---
'@mindlogic-ai/logician-ui': patch
---

chore(Card): remove unused `.card-image` CSS hook

The `.card-image` selector was a consumer-facing CSS hook intended to be
applied to image children of `<Card>` for hover-scale and smooth-transition
effects, but no consumers ended up adopting it. Removing the dead styles
(and the now-unused `mergeCss` indirection in `Card.tsx`).
