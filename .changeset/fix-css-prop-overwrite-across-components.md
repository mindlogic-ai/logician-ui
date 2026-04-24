---
"@mindlogic-ai/logician-ui": patch
---

fix: preserve library `css` prop against consumer overwrite across components

Several components defined a library `css` prop (typically CSS custom properties or nested selector blocks) but applied it BEFORE `{...rest}`, letting a consumer's `css` silently clobber it. Switched every site to destructure `css` from props and compose via `mergeCss(libraryCss, css)` applied AFTER `{...rest}`, so consumer styles merge with library styles instead of replacing them.

Also replaces the hardcoded `css={{ transition: 'all 0.25s ease-in-out' }}` on `Button` with `transitionProperty`/`transitionDuration`/`transitionTimingFunction` props to avoid the Chakra v3 style walker choking on the shorthand transition string when combined with state pseudos.

Components fixed:

- Button: swap hardcoded transition string for token-backed transition props
- Input, RadioGroup, SegmentedControl, Spinner, Tab, TabList, Tbody, Tooltip: merge consumer `css` with library `css` instead of letting `{...rest}` overwrite it
