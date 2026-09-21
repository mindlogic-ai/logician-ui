---
'@mindlogic-ai/logician-ui': patch
---

Stop `Input` and `Textarea` from eating the last Hangul syllable when their
`value` is written from outside during an IME composition.

Both components mirror the `value` prop into local state and synced it
unconditionally (`useEffect(() => setCurrentValue(propValue), [propValue])`).
A controlled input is a promise that `node.value` equals `props.value`, and
React keeps it by writing the prop onto the node — which, while an IME
composition is open, **ends** that composition: the half-built jamo is left
behind as literal text and the finished syllable lands on top of it.
`학사지원` typed, `학사ㅈ지원` on screen. Reported by a 충북대 tenant admin,
where the composition was cut short by the browser window losing focus.

While a composition is open the components now neither adopt the incoming
`value` nor emit outward, so React's commit finds nothing to correct and never
touches the node. On `compositionend` they adopt the finished text and emit it
once — and if the outside value changed *during* the composition (a form reset,
a filter clear), that value is applied instead, deferred rather than discarded.
A trailing `input` event carrying the text just committed no longer emits a
second time.

One behaviour change to know about: while composing, `onChange` now fires per
**syllable** rather than per keystroke. Consumers that read their own state
inside an Enter handler or a clear-button visibility check should gate on
`event.nativeEvent.isComposing`.

No API change.
