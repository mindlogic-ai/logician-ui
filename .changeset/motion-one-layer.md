---
'@mindlogic-ai/logician-ui': minor
---

Motion is one layer again, and the layer only holds what more than one component
reaches for.

The orchestration work (presence policy, loops, stagger) merged into the same
branch rather than stacking as a second PR, and then the vocabulary was cut down
to the seven presets that are genuinely shared: `press`, `feedback`, `travel`,
`spring`, `presence`, `stagger`, and the `composite` escape hatch.

Six motions moved out to the component that was their only caller —
`spin` → `Spinner.styles.ts`, `indeterminate` → `ProgressBar.styles.ts`,
`checkmarkDraw` → `Checkbox.styles.ts`, `dotPop` → `Radio.styles.ts`,
the Ark indicator hatch → `SegmentedControl.styles.ts`, and the Modal's two
keyframe names → `Modal.styles.ts`, where it now borrows the shared `presence`
clock instead of restating it. Rendered output is unchanged: every one was
measured in a browser before and after.

The duration tokens they read (`motion.loop.*`) stay global — that is the scale,
and only the *composition* was local. Keyframes stay global too, because CSS
gives `@keyframes` no other home.

Two new components from that work are gone for now, so this release changes only
components that already existed: `Skeleton` is removed outright, and `Swap` is
folded into the one place that used it, `CopyableCode`, which keeps the fixed
button width.

The guarantees followed the code rather than being dropped with it: a new
`componentMotion.test.ts` asserts that every relocated motion still answers
reduced motion, that no loop turns itself off by zeroing its duration, and that
the Modal still owns its movement and nothing else.
