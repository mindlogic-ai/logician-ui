---
'@mindlogic-ai/logician-ui': minor
---

Workflow: add nodes without drag-and-drop through `useWorkflowActions()`, and render content beside the selected node with `renderSelectedNodeToolbar`.

`useWorkflowActions()` (call it from a component rendered inside `<Workflow>`) returns `addNode(kind, target, options?)`, `getAddAfterSource(nodeId)` and `canAddAfter(nodeId)`. `addNode` builds the node with the same helper the palette drop now uses (`{kind}_{N}` id; `defaultConfig` → `localizeDefaults` → `hostDefaults`), places it per `target` — `{ after: nodeId }` to that node's right, wired from its first free exit (no edge into a Note, from a taken exit or when `canConnect` / the connection rules say no; a node with no free exit falls back to the centre), or `{ at: 'viewportCenter' }` unconnected — then selects the new node and pans to it. Node and edge land as one history step, so one undo reverts both. It returns `{ nodeId, edgeId | null }`, or `null` when read-only, the kind is unknown or its id is taken. `options.inspector` is `'follow'` (default), `'open'` or `'close'`.

`renderSelectedNodeToolbar?: (node: GraphNode) => ReactNode` on `<Workflow>` renders host content beside the selected node's exit side in screen space (React Flow's `NodeToolbar` underneath), so hosts no longer import `@xyflow/react` to place a "+" button.

**Behaviour change:** a node dropped from the palette now gets a sequential `{kind}_{N}` id (`agent_3`), the same scheme duplicate and paste already used, instead of `{kind}_<uuid>`. Existing ids are untouched. `nextNodeId` also escapes the kind now, so namespaced kinds (`math.add`) count only their own ids.
