---
'@mindlogic-ai/logician-ui': minor
---

Toast: add an `action` slot, and document how actions belong in feedback surfaces.

`useToast()` options and `<Toast>` take `action?: { label: ReactNode; onClick: () => void }`. It renders under the description through `Toast.ActionTrigger` as a text action in the toast's status color (`danger.dark` on error, `primary.dark` on info, …), bold, with no border or fill and the same hover tint as the close ×. A negative left margin equal to its padding lines the label up with the description. Clicking it calls `onClick` and dismisses the toast. New `actionStyles` (per status) is exported next to `closeButtonStyles`.

When an action is set and `duration` is not given, `useToast` now defaults the duration to **8000ms** (`TOAST_ACTION_DURATION`) instead of 5000ms (`TOAST_DEFAULT_DURATION`). An explicit `duration`, including `null`, still wins, and toasts without an action are unchanged.

Chakra's own `toaster.create({ action })` is rendered the same way. Its `onClick` is not called twice.

New Storybook page **Guidelines / Actions in feedback surfaces** (`src/guidelines/FeedbackActions.mdx`) sets out the rules: text actions in toasts and banners, buttons only in panes and dialogs; the action takes the container's status color; one action per toast with dismiss on ×; no copy that repeats the action, ≤ 2 lines; the fix is the ink primary in a pane; 8s for toasts with an action. Callers that put a `<Button>` inside `description` should move it to `action`.
