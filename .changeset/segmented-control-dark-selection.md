---
'@mindlogic-ai/logician-ui': minor
---

feat(theme): add `bg.raised` token; fix SegmentedControl dark-mode selection

**New semantic token `bg.raised`** — a strongly-raised neutral surface one level
above `bg.surface` (`white` in light, `gray.1100` in dark). It exists because
the `bg.*` dark ramp is compressed such that `bg.surface` (`gray.1400`) is
*darker* than `bg.subtle` (`gray.1300`), so there was no token for a neutral
element that reads as lifted above a subtle fill in dark. Added to the exported
`SemanticColorToken` contract. (Named `raised` rather than Chakra's `emphasized`
because that default token name can't be overridden via `semanticTokens` in this
setup — it keeps resolving to Chakra's own `gray.200`.)

**SegmentedControl dark-mode selection.** Previously the selected indicator used
`bg.surface`, which in dark resolves *darker* than the track, so the active
segment looked recessed and was barely distinguishable — and the `md` drop
shadow is invisible on a dark canvas. The indicator now rides on `bg.raised`, so
the selected thumb reads as lifted above the `bg.subtle` track in both modes.
Dark mode additionally gains a soft ambient shadow + translucent-white hairline
edge on the thumb (a drop shadow alone doesn't register on dark), and a
translucent-white hairline ring on the track so its bounds stay visible on any
dark surface — without it the track vanishes on a same-or-lighter dark surface
(e.g. a `bg.surface` card) and the control looks like floating text. Both rings
are box-shadows, not borders, so the matched item-height math is preserved.

Light mode is unchanged (verified pixel-identical; the dark-only treatment is
scoped to `.dark`, and `bg.raised` resolves to the same `white` the indicator
already used in light).
