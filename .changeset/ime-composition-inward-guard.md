---
'@mindlogic-ai/logician-ui': patch
---

`Input` and `Textarea` no longer break or lose the last syllable when typing
Korean (or Japanese, Chinese, Vietnamese — any IME) while `value` is also
written from outside, or when the composition is cut short by blur / a window
switch (reported by 충북대: `학사지원` → `학사ㅈ지원`).

Both components mirrored `value` into state and synced it unconditionally;
writing `.value` onto the node mid-composition ends the composition. A shared
internal hook (`useCompositionSafeValue`) now guards the **inward** direction
only: while a composition is open an outside value is not written onto the
node, and at `compositionend` it is applied if it is a genuine change (form
reset, clear) rather than the consumer's own lagging echo.

`onChange` is **not** delayed: it still fires on every keystroke, composing or
not, so a consumer never sees a value one syllable behind (`김민`, not `김`).
At `compositionend` the node's text is read and emitted once (covers
conversions and blur commits that fire no `input`), and the trailing `input`
WebKit sends afterwards is deduped.

Also: `Input`'s `trimWhiteSpace` / `noSpaces` / `maskNumber` are applied to the
emitted value while composing but written onto the node only after the
composition ends; Enter is swallowed for WebKit's post-commit keydown
(`keyCode 229`) and `nativeEvent.isComposing`, not just while composing; a blur
finishes a composition the keyboard never ended (Android). No API change.
