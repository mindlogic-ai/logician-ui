---
'@mindlogic-ai/logician-ui': major
---

Flip `Modal`'s `fullScreenOnMobile` default from `true` to `false`.

A full-screen takeover on a phone suits long or immersive content — a file
picker, a course switcher — but most modals are confirm dialogs and short
forms, and for those the takeover removes the "this is dismissible" cue and
reads as a navigation. The mobile-native shape for that content is a dialog
that keeps its edges, which is what `false` gives (horizontal `mx: 4`).

Breaking for consumers: every `<Modal>` that did not pass the prop was
full-screen on mobile and now is not. Pass `fullScreenOnMobile` explicitly
where the takeover is intentional. Call sites that already pass
`fullScreenOnMobile={false}` are unaffected and can drop the prop.
