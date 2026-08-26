---
'@mindlogic-ai/logician-ui': patch
---

Fix `Link`'s hover contrast in dark mode (KWCAG 5.3.3 · WCAG 1.4.3).

The hover was `{ base: 'primary.dark', _dark: 'primary.main' }` — "one step
darker", which is correct against a white page and backwards against a dark one,
where darker means *toward* the background. Hovering a link in dark mode dropped
it from 6.68:1 to **4.19:1**, under the same 4.5:1 the resting colour clears.
The error variant did the same thing (`danger.main`, 4.26:1).

Now `primary.darker` / `danger.darker` — the step past `.dark` at both ends of
the ramp, so one token is right in both modes with no special-casing. Light is
unchanged at 11.98:1 and 10.83:1; dark becomes 10.68:1 and 10.34:1.

No scanner would have caught this: axe measures the resting state only, and the
contrast bar applies to text in every state a user can put it in. The ramp is
now exported as `LINK_RAMP` so the regression test asserts the tokens the
component actually uses, not just that some correct-looking hex passes.
