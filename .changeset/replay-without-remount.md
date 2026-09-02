---
'@mindlogic-ai/logician-ui': patch
---

`Pulse` and `Shake` replay without throwing away what they wrap.

Both restarted their animation by changing the React `key`, which is the
cheapest way to replay a CSS animation and also the most destructive: a new key
is a new element, so the entire subtree is discarded and rebuilt. The cost was
never stated because it was never noticed — measured now, a replay moved
keyboard focus to `<body>`, reset uncontrolled inputs, and restarted any child
animation mid-flight.

`Shake` is the worst case and the reason this is a defect rather than a
documented trade-off: it fires on a refusal — a wrong answer, an invalid field —
which is exactly when someone is mid-interaction. It took the keyboard away from
the person it had just told no.

They now alternate between two byte-identical keyframes (`pulse-pop` /
`pulse-pop-alt`, `shake-x` / `shake-x-alt`). A CSS animation restarts when its
`animation-name` changes, so the replay is the same and the DOM is untouched.
The extra keyframe pair is the whole price.

No API change: `trigger` and the first-render latch behave exactly as before.
