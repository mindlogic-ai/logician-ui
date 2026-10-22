---
'@mindlogic-ai/logician-ui': patch
---

Docs: bilingual (English / 한국어) usage pages for the motion primitives (Appear,
Reveal, FlyTo, Pulse, Shake, SwapTransition, CountUp, Confetti) and the setup
utilities (ScaledContext, ColorMode, LogicianProvider), plus a Basic story for
ColorMode. `ColorModeToggle` now renders its icon wrappers as `<span>`, so the
button holds phrasing content only; its JSDoc no longer claims it renders
nothing before mount. Confetti `colors` JSDoc now describes the real defaults.
