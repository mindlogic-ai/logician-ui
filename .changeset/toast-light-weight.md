---
'@mindlogic-ai/logician-ui': minor
---

Light-mode toasts now carry the same weight. The `success` family (light and
high-contrast light) is re-tuned to the chroma of the other status families —
`success-fg` #556344 → #365E22, `success-bg` #E5EDDD → #E3F0D8, `success-border`
#C5D4B5 → #B8D6A0 — so the success toast no longer reads grey-olive. The
`neutral` toast outline moves from `border.default` to `border.strong`
in both modes (high contrast keeps `border.default`, its darker edge there).
The dark success tokens are unchanged.
