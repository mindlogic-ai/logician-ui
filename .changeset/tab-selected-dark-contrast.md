---
'@mindlogic-ai/logician-ui': patch
---

Fix the selected horizontal `Tab` label failing AA contrast in dark mode.

`horizontalSelectedStyles` painted the selected label `primary.main`, which
resolves to `blue.300` (#4A79DC) in dark. That is 4.59:1 on the page background
(#0E1014) and only **4.19:1** on a raised surface (#181A20) — under the 4.5:1
that KWCAG 5.3.3 (텍스트 콘텐츠의 명도 대비) and WCAG AA ask of text.

The gap between those two numbers is why this went unnoticed for so long: the
selected tab cleared the bar on every full-page layout and failed it only when
a tab list rendered inside a modal or a popover. A consuming app's audit had
been green across 89 surfaces and turned red the first time a modal containing
tabs was added to the scan.

The label now uses the `.dark` end of the ramp in dark mode
(`{ base: 'primary.main', _dark: 'primary.dark' }` — `blue.200`, 6.68:1 on the
surface and 7.31:1 on the page), the same shape as the `Link` fix in
`4.0.0-alpha.22`. Light mode is untouched: `primary.main` is 6.62:1 on white.

The 2px underline deliberately keeps `primary.main`. It is a graphic, judged at
3:1, which 4.19:1 clears — moving it would be a visual change the standard does
not ask for.

`primary.main` itself is NOT re-pegged, and should not be: it is also a solid
fill under white labels (`Checkbox`, `Switch`, `Banner`), where white on
`blue.200` measures 2.60:1. This is the same reasoning that already produced
`secondary.main`'s dark step, which moved violet off `.300` at 4.29:1 for
exactly this reason. Blue never got the same treatment.

The steps are exported as `TAB_RAMP` so the contrast regression in
`a11y.kwcag.test.tsx` measures the tokens the component actually renders rather
than restating the arithmetic.

Also exports `LINK_RAMP` from `src/index.ts`. It was added to the Typography
barrel in `4.0.0-alpha.22` but never to the main one, which has left
`yarn lint` (`check-component-exports`) failing on `dev` since.
