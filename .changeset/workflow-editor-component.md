---
'@mindlogic-ai/logician-ui': minor
---

feat(workflow): add the generic Workflow editor framework

Moves FactChat's Workflow editor into the design system as a fully reusable,
host-configurable component so other apps can consume it. The core is
domain-free: hosts register node kinds via `nodeTypes` (`defineNodeType`),
pass an opaque `hostBridge` for app data, and inject a `translate` function so
the editor localizes with the host's catalog (and resolves host-registered
node `descriptionKey`s) — with bundled defaults when none is provided.

Exposes `Workflow`, `WorkflowProvider`/`useWorkflow`/`useWorkflowTranslate`,
the graph reducer + history, the node-type contract and canvas primitives
(`NodeShell`, `IconTile`, `FloatingCard`, `FieldWrapper`, `CollapsibleSection`),
and the supporting types. Adds `@xyflow/react` and `@dagrejs/dagre` as
dependencies (kept external in the bundle) and registers the chrome icons the
canvas uses (alert/grip/sticky-note/check/chevron/lock/arrows/etc.).
