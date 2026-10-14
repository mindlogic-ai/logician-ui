---
'@mindlogic-ai/logician-ui': patch
---

Darken headings to the intended `fg.emphasized` token.

`H1`–`H5` now render in `fg.emphasized` (gray.1300 `#1E2433`, the gray scale's
documented "headings" step) instead of the lighter body-text weight they had
drifted to. `H3` was explicitly pinned to `fg.default` (gray.1000 `#414A63` —
"body text"), and `H1`/`H2`/`H4`/`H5` set no color at all, so they inherited the
ambient text color; both read too light for headings once `fg.default` was
re-pegged from gray.1300 → gray.1000 for body copy. Pinning `fg.emphasized`
makes all five consistent and matches that token's stated purpose ("Strongest
text — headings, titles"). Callers can still override via the `color` prop.
