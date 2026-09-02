---
'@mindlogic-ai/logician-ui': patch
---

Fix `SwapTransition` freezing its children, and swallowing the caller's layout.

Two defects from the component's first release, found by looking at a real
screen rather than by any check that passed on it. Both come from the same
mistake: a component that stands between a caller and its own subtree has to be
**transparent**, and this one was not — in either direction.

**It rendered a copy of `children`, not `children`.** The subtree was held in
state and refreshed from an effect keyed on `transitionKey`, so a re-render
carrying new children under the _same_ key never reached the screen. Any content
that updates without changing its key — which is most content — was frozen at
whatever it looked like when the key last changed. In the product this was a
quiz option that would not select: the state changed, the pixels did not, and
the screen read as dead.

**It put an extra element between the caller's props and the content.** The two
states were stacked in a grid cell, one level in from the box that receives
`{...rest}`. A caller filling a column — `display="flex" flex={1} minH={0}`, the
shape a full-height pane needs — had its sizing land on an ancestor of the
content, so the pane collapsed to content height and the action bar below it
rode up with dead space beneath. The cell bought nothing: the two states are
mutually exclusive and never on screen together.

Now one box, rendering `children` directly. The only thing still held is a
single snapshot of the outgoing subtree, for the length of the exit — that much
is unavoidable without an animation library, since React has already been told
to render the new content while the old still has to leave.

`animateInitial` was broken too and is fixed by the same change.

`SwapTransition.test.tsx` pins all three. Each fails against the previous
implementation, which is the property that makes them worth having.
