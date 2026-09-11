---
'@mindlogic-ai/logician-ui': minor
---

Add a `./styles` entry point for pure style objects.

The root entry pulls in every component, and with them side-effect CSS imports
such as `katex/dist/katex.min.css`. A bundler handles that; a plain Node loader
does not. So a consumer's unit test that imported a style constant from the root
failed to load the module at all:

```
TypeError: Unknown file extension ".css" for .../katex/dist/katex.min.css
```

That is how `noZoomOnFocus` landed: it is a two-line style object, but reaching
it cost the whole design system, and four test files in the first consuming app
stopped loading. Importing a style object should not carry the component graph.

`@mindlogic-ai/logician-ui/styles` now exposes those objects on their own,
mirroring the existing `./icons` entry. Everything re-exported there stays free
of runtime imports — types only — so the entry brings in nothing but the objects.
The same names remain on the root entry, so existing imports keep working.
