---
'@mindlogic-ai/logician-ui': major
---

`ExpandableText` clips by lines and animates open.

**Breaking: `charLimit` is gone, replaced by `lineClamp` (default 3).** The old
prop counted characters, which meant the collapsed and expanded states were two
different node trees — the component swapped one for the other, and everything
below jumped in a single frame. This is text someone is part-way through
reading, so a jump costs them their place.

Both states now render the same children and only the clipping differs, which is
what makes the height animatable at all. Opening and closing run on `travel`.

```tsx
-(<ExpandableText charLimit={100}>{text}</ExpandableText>) +
<ExpandableText lineClamp={3}>{text}</ExpandableText>;
```

`charLimit` still type-checks and is ignored, so nothing breaks at build time —
but any call site passing it will show three lines rather than its old character
budget, and should be revisited.

Two details worth knowing if you touch this:

**Not `-webkit-line-clamp`.** It would put an ellipsis on the cut line, but under
a clamp `scrollHeight` collapses to the clipped height — which is the only way to
ask whether anything is hidden, so the link that opens the text could never
appear. A `max-height` of whole `lh` units cuts on the same line boundary, keeps
the measurement honest, and is the thing being animated anyway.

**The height settles back to `none`,** not to the measured pixel count, so a
later reflow (a resize, a font swap) is not trapped under a stale number. Closing
therefore pins the height it is leaving for one frame before releasing it, since
`none` cannot be interpolated from.
