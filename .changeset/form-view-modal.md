---
'@mindlogic-ai/logician-ui': minor
---

FormModal, ViewModal: two preset modals so a caller picks the kind of modal instead of assembling one. `FormModal` (input: create, edit) wraps its children in a `<form>` — Enter submits, a backdrop click closes it only while nothing has been typed — once a field changed the click is refused and the dialog shakes (X, Esc and Cancel always close; `dirty` overrides the detection, e.g. react-hook-form's `isDirty`), and `FormModalFooter`'s submit button stays disabled while a native constraint such as an empty `required` field fails. `ViewModal` (detail, preview, bulk-action result) has a single footer button, translated 닫기 by default, and closes on every way out. Both take a required `title` rendered in `ModalHeader`, `size` (`md`/`lg`/`xl` and `lg`/`xl`), and cap their height at `min(820px, 85dvh)` with only the body scrolling. `useFormModalContext` exposes the form's validity to a custom footer.

FormModalFooter: `onDelete` / `deleteLabel` are deprecated. Delete belongs on the list — a row or card menu (⋯) that opens a danger confirm — so an edit modal keeps Cancel + Save only. Existing callers still render the button; the props go in a later major.
