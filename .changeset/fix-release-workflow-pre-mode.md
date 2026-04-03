---
"@mindlogic-ai/logician-ui": patch
---

Fix release workflow alternating alpha bump failure

Remove `changeset pre exit` step from release workflow — it was committing `pre.json` with `mode: "exit"` back to dev, causing the next run's `pre enter alpha` to no-op and `changeset version` to exit pre-release instead of bumping alpha. Also resets `pre.json` to `mode: "pre"`.
