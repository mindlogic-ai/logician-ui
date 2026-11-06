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

The root padding is now a fixed 4px instead of the `1` spacing token (0.25em).
At a 14px font the token is 3.5px, and the indicator is positioned from the
item's integer `offsetTop`, so it sat half a pixel low. The track is 1px taller
at 14px fonts as a result, which matches the Button heights it was meant to.

The hairline ring around the track is now an inset box-shadow (light and dark)
instead of an outer one. The outer ring sat 1px outside the control, so a
flush `overflow` ancestor (a horizontally scrolling tab row) clipped its
straight edges and only the rounded corners showed. Call sites that padded
their scroll box by 1px with a matching negative margin to make room for it
no longer need to.
