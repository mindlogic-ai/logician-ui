---
'@mindlogic-ai/logician-ui': minor
---

FormModal, ViewModal: two preset modals so a caller picks the kind of modal instead of assembling one. `FormModal` (input: create, edit) wraps its children in a `<form>` — Enter submits, a backdrop click nudges the dialog instead of closing it (X, Esc and Cancel still close), and `FormModalFooter`'s submit button stays disabled while a native constraint such as an empty `required` field fails. `ViewModal` (detail, preview, bulk-action result) has a single footer button, translated 닫기 by default, and closes on every way out. Both take a required `title` rendered in `ModalHeader`, `size` (`md`/`lg`/`xl` and `lg`/`xl`), and cap their height at `min(820px, 85dvh)` with only the body scrolling. `useFormModalContext` exposes the form's validity to a custom footer.
