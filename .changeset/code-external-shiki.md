---
'@mindlogic-ai/logician-ui': patch
---

Code: Shiki is no longer bundled into `dist`. The build used to copy every
Shiki grammar and theme into `dist/node_modules` (about 46 MB of a 60 MB
package), so apps shipped a second Shiki beside the one they installed.
`import('shiki')` now resolves to the app's own copy. Shiki stays in
`dependencies`, so no app needs to add it, and highlighting is unchanged.
