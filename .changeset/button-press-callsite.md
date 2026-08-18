---
'@mindlogic-ai/logician-ui': patch
---

A call site that presses too no longer erases the Button's own press.

`_hover` and `_active` arrived through the prop spread, and a spread replaces
the whole object — so a button that added one line (FactChat's quiz footer adds
a 2px press ledge) silently lost the variant's pressed colour *and* the press
`scale` along with it, and stopped reading as pressed at all. Both are now
merged the way `lift` already merged them: the call site's own keys still win,
they just no longer erase the ones they did not mention.

`transform` also rejoins the Button's transition. Nothing in the component sets
it — the press deliberately uses `scale` so it cannot clobber a call site — but
call sites do set it, and naming the transition properties took away the cover
the old `transitionProperty: all` gave them. Their transforms were snapping.
