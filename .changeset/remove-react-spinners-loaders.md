---
'@mindlogic-ai/logician-ui': patch
---

Replace the react-spinners loaders with the Chakra-based `<Spinner>`.

`PageLoader` (`BounceLoader`) and `SectionLoader` (`DotLoader`) drew from
`react-spinners`, which injects its `@keyframes` at runtime via
`CSSStyleSheet.insertRule()`. Some browser CSSOM implementations (in-app
webviews and older browsers) reject that rule with
`Failed to execute 'insertRule' on 'CSSStyleSheet': Failed to parse the rule`,
crashing the loader inside its `ErrorBoundary`.

Both loaders now use the existing Chakra-based `<Spinner>` (CSS border
animation, no runtime `insertRule`) and the `react-spinners` dependency is
removed entirely. Public props are unchanged; only the spinner's visual style
changes (bounce/dot → ring).
