---
"@mindlogic-ai/logician-ui": patch
---

feat(Modal): bake in Dialog.Backdrop overlay by default

Modal now renders the backdrop overlay internally, matching the Chakra v2 behavior where the overlay was included automatically. Users no longer need to render `<ModalOverlay />` manually inside `<Modal>`.
