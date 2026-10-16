---
'@mindlogic-ai/logician-ui': patch
---

Motion cleanups: the checkbox tick draws in 200ms (was 300ms); Accordion
content opens/closes on the same 300 / 150 clock as Collapsible (was Chakra's
200 / 200); PageLoader, SectionLoader and GraphErrorBanner use the `feedback`
preset instead of literal timings, so they honour reduced motion; InfoSprinkle
drops its literal transition; PageLoader uses `100dvh` and ErrorFallback
`100svh` instead of `100vh`.
