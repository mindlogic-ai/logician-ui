---
'@mindlogic-ai/logician-ui': minor
---

FormModalFooter: new optional `submitLoadingText`, forwarded to the submit
Button's `loadingText`. Without it a submitting form footer showed a bare
spinner, which breaks the Button rule that `loading` needs `loadingText`.
