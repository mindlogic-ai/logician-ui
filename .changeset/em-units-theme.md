---
"@mindlogic-ai/logician-ui": patch
---

fix: switch theme textStyles font sizes from rem to em for contextual scaling

em units inherit from the nearest ancestor font-size, enabling components inside
containers like Popover to scale from a local base (e.g. 14px) rather than
always deferring to the html root.
