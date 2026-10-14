---
'@mindlogic-ai/logician-ui': patch
---

Export the pieces `4.0.0-alpha.25` documented but did not ship.

alpha.25 made 19 components polymorphic and told consumers they could carry `as` through their own wrappers. They could not: three things never reached the package root.

- **`polymorphic` and `PolymorphicComponent`** — `src/index.ts` re-exported the module with `export type`, which cannot carry a value, so the helper function was unreachable. A consumer got `has no exported member named 'polymorphic'`.
- **Every `*OwnProps`** — declared in each `*.types.ts` but absent from the component barrels, so `CardOwnProps`, `ButtonOwnProps`, `ChipOwnProps` and the rest were unreachable too. `Button`, `IconButton` and `SeeMoreButton` route through `index.tsx` barrels that still listed only the old prop type.
- **The typography prop types** — the root exported `Text`, `Subtitle`, `H1`–`H5` and friends but none of their prop types, so a wrapper over `H3` or `Text` could not be typed at all.

All three were found the same way: by writing a real consumer wrapper against alpha.25. FactChat's `ClickableCard` needs `CardOwnProps` and `polymorphic` to carry `as="button"` through, and failed to compile on all four counts.

Also corrects the guidance in `polymorphic.ts`. It previously steered consumer wrappers toward `as unknown as PolymorphicComponent<…>`, which was reached backwards from a test failure — FactChat's review conventions ban type escape hatches outright. The failure was one line: the suites mocking this package route through a single shared mock, which needs `polymorphic: <T,>(Impl: T) => Impl`. Since this function is a type-level identity, that is not a stub — it is the implementation. Both options stay documented, with the tradeoff stated instead of a recommendation dressed up as one.

No runtime or type behaviour changes for anything that already compiled; this only widens what the entry point re-exports.
