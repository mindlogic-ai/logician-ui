---
'@mindlogic-ai/logician-ui': minor
---

feat(Modal): add `fullScreenOnMobile` prop and scope base font to 14px

- Add `fullScreenOnMobile` prop to `Modal` (default: `true`). When true, the modal becomes fullscreen (100vw × 100dvh, no border-radius) on mobile viewports. When false, horizontal margin (`mx: 4`) is applied instead — suitable for confirm dialogs and small modals.
- Wrap `ModalContent` children in `ScaledContext fontSize="14px"` so all modal typography and spacing scales to a 14px base without affecting the global font size.
- Expose `useModalContext` hook for consuming `fullScreenOnMobile` in custom modal content components.
