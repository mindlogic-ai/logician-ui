---
'@mindlogic-ai/logician-ui': minor
---

Ship the shared form-primitive family: `FieldRow`, `FieldLabel`, `FieldError`, `FieldHelp`, `FormSection`, `FormSectionHeader`, `FormScrollArea`, `FormFooter` and `FormModalFooter`.

These were hoisted out of FactChat's `@/components/form` so every product composes fields from one design-system family instead of hand-rolling label / error / section / footer chrome.

**Highlights**

- `FieldRow` — the composition keystone: wraps a control in `FormControl` and owns all label↔control / `aria-invalid` / `aria-describedby` wiring. Form-library agnostic (`error` is a plain prop, so it works with RHF and `useState` forms).
- `FormSection` — a titled group of fields; flat by default, `collapsible` delegates to `CollapsibleSection`.
- `FormFooter` / `FormScrollArea` — the sticky-footer + scroll-column shell for sidebar/left-panel forms.
- `FormModalFooter` — the action footer for form-in-a-modal surfaces (optional far-left delete + Cancel + primary submit with its own loading/disabled state). It is **copy-agnostic**: it owns no strings, so `cancelLabel` is **required** and `deleteLabel` is rendered verbatim — the consuming app supplies its own (translated) labels.

Each primitive ships with a Storybook story and a test.
