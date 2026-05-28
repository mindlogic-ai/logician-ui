---
"@mindlogic-ai/logician-ui": patch
---

feat(theme): respect `prefers-reduced-motion` globally (WCAG 2.3.3)

- Add a `@media (prefers-reduced-motion: reduce)` rule in `globalCss` that collapses all CSS animations and transitions (including `scroll-behavior`) to ~0ms when the OS-level "reduce motion" accessibility preference is enabled
- Applies to every component that animates via Chakra style props (`transition`, `animationDuration`, etc.) and acts as a belt-and-suspenders fallback for framer-motion (used internally by Chakra v3/Ark)
- No visible change for users who do not have reduce motion turned on
