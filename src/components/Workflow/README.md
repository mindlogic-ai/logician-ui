# Workflow

A node-based **workflow / graph editor** built on [React Flow](https://reactflow.dev).
It owns the hard parts — canvas interaction, a drag-and-drop palette, an
undo/redo graph model, auto-layout, selection, and issue rendering — and stays
**domain-free**: it ships with **no node types of its own**. You describe your
domain by registering node types, and you wire up the surrounding chrome
(persistence, validation, an inspector) however your app wants.

> Mental model: this is to a workflow editor what React Flow is to a canvas —
> batteries for the editor, but *you bring the nodes* (and decide what clicking
> one does).

- [Quick start](#quick-start)
- [Defining node types](#defining-node-types)
- [The inspector / drawer](#the-inspector--drawer)
- [Reacting to selection](#reacting-to-selection)
- [Controlled vs uncontrolled graph](#controlled-vs-uncontrolled-graph)
- [Validation & issues](#validation--issues)
- [Internationalization](#internationalization-translate)
- [Passing host data (`hostBridge`)](#passing-host-data-hostbridge)
- [Theming, layout & read-only](#theming-layout--read-only)
- [Props reference](#props-reference)
- [Gotchas](#gotchas)

---

## Quick start

The component must render inside a `LogicianProvider` (it uses design-system
tokens), and React Flow's stylesheet is bundled automatically.

```tsx
import { useState } from 'react';
import {
  Workflow,
  NodeInspector,
  defineNodeType,
  type Graph,
  type NodeTypeDef,
} from '@mindlogic-ai/logician-ui';
import { Sparkles } from '@mindlogic-ai/logician-ui/icons';
import { FormControl, FormLabel, Input } from '@mindlogic-ai/logician-ui';

// 1. Describe your domain as node types.
type MessageConfig = { text: string };

const messageNode = defineNodeType<MessageConfig>({
  kind: 'message',
  label: 'Message',
  category: 'ai',
  icon: Sparkles,
  defaultConfig: () => ({ text: '' }),
  handles: () => ({ inputs: [{ id: 'in' }], outputs: [{ id: 'out' }] }),
  getMetaChips: config => (config.text ? [config.text] : []),
  // Optional: the body shown in the inspector drawer when this node is selected.
  renderDrawer: ({ config, onChange, readOnly }) => (
    <FormControl>
      <FormLabel>Text</FormLabel>
      <Input
        value={config.text}
        disabled={readOnly}
        onChange={e => onChange({ ...config, text: e.target.value })}
      />
    </FormControl>
  ),
});

const NODE_TYPES: NodeTypeDef[] = [messageNode];

// 2. Render the editor.
export function MyEditor() {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  return (
    <Workflow nodeTypes={NODE_TYPES} graph={graph} onGraphChange={setGraph}>
      {/* Opt in to the built-in inspector. Omit it to own inspection yourself
          (see "Reacting to selection"). */}
      <NodeInspector />
    </Workflow>
  );
}
```

That's a full editor: drag `Message` from the palette, connect nodes, undo/redo,
auto-arrange, and edit a selected node in the drawer.

---

## Defining node types

A node type is a plain object created with `defineNodeType<TConfig>(...)`, where
`TConfig` is the shape of that node's `config`. The framework knows nothing about
your kinds — it just renders what the registry describes.

| Field | Required | Purpose |
| --- | --- | --- |
| `kind` | ✓ | Stable id for the type (e.g. `'message'`). Used in `node.kind` and id generation. Keep it English/snake-ish. |
| `label` | ✓ | Short operational noun shown on the card and in the palette. Intentionally **not** translated (matches n8n/Make/Dify). |
| `category` | ✓ | One of `trigger` · `ai` · `logic` · `safety` · `output` · `note`. Drives the icon-tile color. Color attaches to **category**, not kind. |
| `icon` | ✓ | A `CreatedIcon` (wrap any icon with `createIcon` from this package, or use one of the exported icons). |
| `defaultConfig` | ✓ | Value or factory `() => TConfig` for a freshly-dropped node. Prefer the factory for nested/mutable defaults. |
| `handles` | ✓ | `(config) => ({ inputs, outputs })`. Can depend on config (e.g. a classifier emitting one output per category). |
| `renderDrawer` | – | The inspector body for this kind. Omit and clicking the node is a no-op for editing. |
| `renderNode` | – | Escape hatch to fully replace the card body (e.g. a sticky Note). Most types use `getInstanceTitle` + `getMetaChips` instead. |
| `getInstanceTitle` | – | `(config) => string` for the snake_case identifier line. Defaults to the node id. |
| `getMetaChips` | – | `(config) => (string \| { text, tone })[]` — small chips under the title. `tone: 'danger' \| 'warning'` tints a value. |
| `descriptionKey` / `description` | – | Palette description. Prefer `descriptionKey` (resolved through your `translate`). |
| `placement` | – | Declarative constraints read by the palette/canvas: `minCount`, `maxCount`, `pinned` (can't delete), `role: 'start' \| 'end'`, `mustFollow(Directly)`. |
| `canConnect` | – | `(ctx) => boolean \| string` to reject a connection (return a reason string to explain). |
| `outputSchema` | – | `(config) => JSONSchema \| undefined` for variable-resolution features. |
| `getGraphIssues` | – | FE, graph-aware advisories merged into the node's canvas chrome (e.g. an unconnected required exit). Pure + cheap; runs every render. |
| `localizeDefaults` / `hostDefaults` | – | Overlay defaults at creation time using the translator / the `hostBridge` (e.g. seed a node's model from the tenant's live list). |

`resolveDefaultConfig(def)` is exported if you need to materialize a default
config yourself.

---

## The inspector / drawer

There are **three levels** of customization — pick per app:

**1. Built-in drawer (default).** Mount `<NodeInspector />` as a child. It opens a
floating card on node/edge selection, renders the selected node's `renderDrawer`
(or a built-in edge inspector), and provides delete/duplicate + inline issues.

```tsx
<Workflow nodeTypes={NODE_TYPES} graph={graph} onGraphChange={setGraph}>
  <NodeInspector dock="right" />
</Workflow>
```

`<NodeInspector>` props: `dock` (`'left' | 'right'`, default `'right'`) and
`renderEdgeDrawer` (custom edge body; falls back to label + endpoints).

**2. Custom node bodies.** Keep `<NodeInspector>` but put whatever you want inside
each node type's `renderDrawer` — that's where domain-specific UI lives (model
pickers, validators, even modals). The framework never sees it.

**3. Fully custom — drive your own UI.** Omit `<NodeInspector>` entirely and render
your own panel *anywhere in your app* from the selection signal. See below.

---

## Reacting to selection

The editor owns selection and canvas interaction; it surfaces what's selected so
**clicking a node can control any part of your UI** — a side panel in your app
shell, a modal, a route, anything.

```tsx
import { useState } from 'react';
import { Workflow, type WorkflowSelection } from '@mindlogic-ai/logician-ui';

function EditorWithMyOwnPanel() {
  const [selection, setSelection] = useState<WorkflowSelection | null>(null);
  return (
    <div style={{ display: 'flex' }}>
      <Workflow
        nodeTypes={NODE_TYPES}
        graph={graph}
        onGraphChange={setGraph}
        onSelectionChange={setSelection}
        // no <NodeInspector> child → no built-in drawer
      />
      {selection?.type === 'node' && <MyNodePanel node={selection.node} />}
    </div>
  );
}
```

Selection callbacks:

- `onSelectionChange(selection | null)` — fires on select, deselect (pane click,
  `null`), and when the selected element is deleted. `WorkflowSelection` carries
  `{ type, id, node }` or `{ type, id, edge }`.
- `onNodeClick(node)` / `onEdgeClick(edge)` — raw click convenience (e.g. "flip a
  surface back into edit mode"). Selection still updates regardless.

You can also mount `<NodeInspector>` **and** listen to `onSelectionChange` — e.g.
to keep the built-in drawer but also highlight the selection elsewhere.

---

## Controlled vs uncontrolled graph

- **Controlled:** pass `graph` and `onGraphChange`. You own the source of truth.
  Pass a *stable* reference and update it from `onGraphChange`.
- **Uncontrolled:** pass `defaultGraph` (or nothing) and read changes via
  `onGraphChange` if you like. The component keeps its own state.

```ts
type Graph = { nodes: GraphNode[]; edges: GraphEdge[] };
type GraphNode<TConfig = unknown> = {
  id: string;
  kind: string;
  position: { x: number; y: number };
  config: TConfig;
};
type GraphEdge = {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
};
```

Undo/redo is built in (and keyboard-wired). Two persistence hooks help hosts
whose autosave ignores position-only diffs:

- `onArrange(graph)` — fired after the one-click auto-arrange.
- `onHistoryNavigate(graph)` — fired after an undo/redo.

Wire both to a forced save if a tidy layout (or an undo of one) must survive a
reload.

---

## Validation & issues

Validation is **not** built in — the editor *renders* issues you supply, it does
not compute them. This keeps the source of truth wherever it belongs (usually
your backend).

```tsx
<Workflow
  nodeTypes={NODE_TYPES}
  graph={graph}
  issues={issues}            // Issue[] you own — render-only
  validating={isRevalidating} // show a "rechecking" affordance, keep prior issues
/>
```

```ts
type Issue = {
  severity: 'error' | 'warning';
  code: string;
  message: string;              // English fallback
  nodeId?: string;             // attaches to a node
  edgeId?: string;             // attaches to an edge
  fieldKey?: string;           // renders inline under a specific field
  messageVars?: Record<string, string | number>;
};
```

Issues with a `nodeId`/`edgeId` highlight that element and appear in the drawer;
those with a `fieldKey` render inline under the matching input. Cheap, FE-only,
graph-aware advisories can also come from a node type's `getGraphIssues`.

> Localizing issue copy: render `issue.message`, or map `issue.code` to your own
> catalog. (The `useWorkflowIssueMessage` hook maps `code` → a
> `workflow_be_<code>` key via your injected `translate`, falling back to
> `issue.message`.)

---

## Internationalization (`translate`)

All chrome copy (palette, controls, inspector, node `descriptionKey`s) goes
through a single injected translator, so the editor localizes with the rest of
your app:

```tsx
<Workflow nodeTypes={NODE_TYPES} translate={myTranslate} />
```

`translate: (key: string, vars?: Record<string, string | number>) => ReactNode`.
It must resolve both the editor's own `workflow_*` keys **and** any
`descriptionKey`s you set on your node types (pass a function bound to your full
catalog).

If you omit `translate`, the component falls back to its bundled
`Workflow.translations.json` via the design system's `useTranslate`. ⚠️ That
default currently resolves Korean (`useTranslate` does not yet read
`LanguageContext`) — pass your own `translate` for any non-Korean app.

---

## Passing host data (`hostBridge`)

Node inspectors often need app data the framework can't know about (a live model
list, API clients, the current entity id). Thread it opaquely:

```tsx
<Workflow nodeTypes={NODE_TYPES} hostBridge={{ chatbotId, llmModels }} />
```

`hostBridge` is `unknown` by design. Inside `renderDrawer` (and
`hostDefaults`/`localizeDefaults`) you narrow it to your shape — the core never
depends on it.

---

## Theming, layout & read-only

- **Theme:** render inside `LogicianProvider`. Node-tile colors come from the six
  categories; override the mapping with `categoryTokens` if needed.
- **Palette:** `showPalette` (default `true`) toggles the drag-to-add palette.
- **Footer:** `footer` is a slot below the canvas (toolbars, run controls).
- **Children:** rendered inside the canvas frame (like React Flow's
  `<Controls>`/`<MiniMap>`/`<Panel>`) and inside the Workflow context, so they can
  call `useWorkflow()`. This is where `<NodeInspector>` goes.
- **Sizing:** `minHeight` (default `'500px'`); lower it for an embedded preview.
- **Read-only:** `readOnly` hides the palette, disables connect/drag/delete, and
  turns a mounted `<NodeInspector>` into a legible, non-editing view.

```tsx
// Static, read-only thumbnail.
<Workflow nodeTypes={NODE_TYPES} graph={graph} readOnly showPalette={false} minHeight={0} />
```

Advanced: `useWorkflow()` (inside the tree) exposes the graph, `dispatch`,
selection, `undo`/`redo`, and issue maps if you build custom canvas-anchored
surfaces.

---

## Props reference

| Prop | Type | Notes |
| --- | --- | --- |
| `nodeTypes` | `NodeTypeDef[]` | **Required.** Your registered kinds. |
| `graph` | `Graph` | Controlled graph (pair with `onGraphChange`). |
| `onGraphChange` | `(g: Graph) => void` | Fired on every edit. |
| `defaultGraph` | `Graph` | Uncontrolled initial graph. |
| `translate` | `(key, vars?) => ReactNode` | Chrome + `descriptionKey` translator. |
| `issues` | `Issue[]` | Render-only validation (pass a stable ref). |
| `validating` | `boolean` | Show "rechecking" while issues are stale/in-flight. |
| `readOnly` | `boolean` | Disable editing; palette hidden. |
| `showPalette` | `boolean` | Default `true`. |
| `onSelectionChange` | `(sel \| null) => void` | Selection changed (node/edge/deselect). |
| `onNodeClick` / `onEdgeClick` | `(node) / (edge) => void` | Raw click convenience. |
| `onArrange` | `(g: Graph) => void` | After one-click auto-arrange. |
| `onHistoryNavigate` | `(g: Graph) => void` | After undo/redo. |
| `children` | `ReactNode` | Canvas overlay slot (mount `<NodeInspector>` here). |
| `footer` | `ReactNode` | Slot below the canvas. |
| `categoryTokens` | `CategoryTokenMap` | Override category → color tokens. |
| `hostBridge` | `unknown` | Opaque host data for inspectors. |
| `minHeight` | `string \| number` | Default `'500px'`. |
| `onIssuesChange` | `(issues) => void` | Notified when the issues ref changes. |

`<NodeInspector>`: `dock?: 'left' | 'right'`, `renderEdgeDrawer?: ComponentType<EdgeDrawerRenderProps>`.

---

## Gotchas

- **No node types ship.** Without `nodeTypes` the editor is an empty shell. That's
  by design — register your domain.
- **No validation engine.** `issues` is render-only; compute them yourself.
- **i18n default is Korean.** Pass `translate` for non-Korean apps (see above).
- **Wrap in `LogicianProvider`.** Colors resolve from design tokens; React Flow's
  CSS is bundled, but your bundler must allow the package's transitive CSS import
  (fine in Next.js).
- **Controlled graph needs `onGraphChange`.** Otherwise edits can't flow back.
- **Pass a stable `issues` reference** (e.g. `useMemo`) — a fresh array every
  render makes `onIssuesChange` fire every render.
- **`<NodeInspector>` must be a child of `<Workflow>`** (it reads the Workflow
  context). It won't work rendered outside the tree — use `onSelectionChange` to
  drive UI that lives elsewhere.
