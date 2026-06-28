---
'@mindlogic-ai/logician-ui': major
---

Remove the `MDXEditor` component and drop the `@mdxeditor/editor` dependency.

The markdown editor is moving to a Lexical-based implementation that now lives in the consuming product repo, so the design system no longer ships an editor. This removes the `MDXEditor` export (along with its types and styles) from the package root.

**Migration:** Consumers using `MDXEditor` from `@mindlogic-ai/logician-ui` should import their editor from the product repo's Lexical implementation instead.

**Bundle/install impact:** `@mdxeditor/editor` (~590 KB unpacked, built on Lexical) and its dependency tree are gone — the lockfile drops 182 transitive packages (1480 → 1298). The component was externalized in the rollup build, so `dist/` size is unchanged, but the package's install footprint for consumers shrinks substantially.
