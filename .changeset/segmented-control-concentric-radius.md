---
'@mindlogic-ai/logician-ui': patch
---

`SegmentedControl`: the selected indicator's corner radius is now the root's
radius minus the root padding (floored at 0), so the inner and outer curves are
concentric and the gap between them stays even. `borderRadius="full"` is
unchanged.

The light-mode indicator shadow drops from `md` (4px offset, 8px blur) to `xs`
(1px, 2px): `md` filled the 4px track padding under the thumb and made it look
like it sat low. Dark mode is unchanged.
