import type { ComponentType, ReactNode } from 'react';

import { type CreatedIcon } from '@/components/Icon';

import type { CategoryTokenMap } from './canvas/IconTile';

/**
 * Generic, domain-free types for the Workflow editor framework.
 *
 * Host apps register NodeTypeDef entries and pass them via props. The framework
 * itself knows nothing about "agent" or "classify" — host registries (under
 * adapters/) provide that.
 */

export type Position = { x: number; y: number };

/** Which side a canvas surface (inspector drawer, etc.) docks on. */
export type DockSide = 'left' | 'right';

/**
 * Translator the editor uses for all of its chrome copy (palette, controls,
 * inspector, issue messages). Injected by the host so the core stays domain-
 * and i18n-framework-agnostic: the host passes a function bound to its own
 * locale + translation catalog (which also resolves the node-type
 * `descriptionKey`s the host registers). When omitted, the component falls back
 * to its bundled defaults.
 *
 * Mirrors the common `(key, vars) => text` shape; returns `ReactNode` because
 * some translators interpolate React elements. Call sites that need a string
 * (aria labels, placeholders) cast the result.
 */
export type WorkflowTranslate = (
  key: string,
  vars?: Record<string, string | number>
) => ReactNode;

export type HandleDef = {
  id: string;
  label?: string;
};

export type GraphNode<TConfig = unknown> = {
  id: string;
  kind: string;
  position: Position;
  config: TConfig;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export type IssueSeverity = 'error' | 'warning';

export type Issue = {
  nodeId?: string;
  edgeId?: string;
  handleId?: string;
  /**
   * Identifies the specific input the issue belongs to (e.g. `'name'`,
   * `'model'`). Lets the drawer render the issue inline beneath the matching
   * field instead of as a separate list. Optional — graph-wide and
   * node-without-a-field issues leave it undefined.
   */
  fieldKey?: string;
  severity: IssueSeverity;
  code: string;
  /**
   * English fallback message. Used by tests, logs, and any surface that
   * doesn't run the `useWorkflowIssueMessage` hook (which maps `code` +
   * `messageVars` to a localized string).
   */
  message: string;
  /**
   * Interpolation values consumed by `useWorkflowIssueMessage`. Mirror the
   * `{var}` placeholders in the matching translation key.
   */
  messageVars?: Record<string, string | number>;
};

export type RunState = 'idle' | 'running' | 'done' | 'error';

export type MetaChipTone = 'default' | 'danger' | 'warning';

export type MetaChipSpec =
  | string
  | { readonly text: string; readonly tone?: MetaChipTone };

export type NodeRenderProps<TConfig = unknown> = {
  id: string;
  config: TConfig;
  selected: boolean;
  runState: RunState;
  issues: Issue[];
};

export type DrawerRenderProps<TConfig = unknown> = {
  id: string;
  config: TConfig;
  onChange: (next: TConfig) => void;
  issues: Issue[];
  /**
   * Editor is read-only (published view / no edit permission) — inspectors
   * should disable mutating controls.
   */
  readOnly: boolean;
  /**
   * Opaque host bridge from the editor (see `WorkflowProps.hostBridge`).
   * FactChat node-types narrow it (e.g. to `WorkflowHostBridge`) to reach
   * chatbot-scoped data; the core stays decoupled.
   */
  hostBridge?: unknown;
};

/**
 * Props passed to a host-supplied edge inspector (`WorkflowProps.renderEdgeDrawer`).
 *
 * Mirrors `DrawerRenderProps` for nodes so the framework core stays domain-free:
 * the host owns edge-specific UI (e.g. future edge conditions / CEL) while the
 * core only knows how to mount it. When no host renderer is provided the editor
 * falls back to a built-in inspector (editable label + read-only endpoints).
 */
export type EdgeDrawerRenderProps = {
  edge: GraphEdge;
  /** Persist an edited edge — dispatches `updateEdge` so changes are undoable. */
  onChange: (next: GraphEdge) => void;
  /** Editor is read-only — disable mutating controls. */
  readOnly: boolean;
  /** Issues whose `edgeId` matches this edge. */
  issues: Issue[];
  /** Opaque host bridge (see `WorkflowProps.hostBridge`). */
  hostBridge?: unknown;
};

export type ConnectionCtx = {
  source: GraphNode;
  sourceHandle?: string;
  target: GraphNode;
  targetHandle?: string;
  graph: Graph;
};

/**
 * Minimal JSON Schema 7-ish subset. Kept local to avoid pulling a 200kB schema
 * lib for a half-dozen field types. Host adapters can produce anything
 * compatible with the strict subset OpenAI / Gemini / Pydantic agree on.
 */
export type JSONSchema =
  | {
      type: 'string';
      description?: string;
      enum?: string[];
      nullable?: boolean;
    }
  | {
      type: 'number' | 'integer';
      description?: string;
      minimum?: number;
      maximum?: number;
      nullable?: boolean;
    }
  | { type: 'boolean'; description?: string; nullable?: boolean }
  | {
      type: 'array';
      items: JSONSchema;
      description?: string;
      nullable?: boolean;
    }
  | {
      type: 'object';
      properties: Record<string, JSONSchema>;
      required?: string[];
      additionalProperties?: boolean;
      description?: string;
      nullable?: boolean;
    };

/**
 * Optional declarative placement constraints. Validation itself is owned by
 * the backend now; these stay on the node-type contract because the palette
 * and canvas read them (e.g. `pinned` wires React Flow's `deletable`).
 *
 * - `role: 'start' | 'end'` marks entry/terminal kinds.
 * - `mustFollowDirectly` is OR semantics: a node passes if at least one of
 *   its direct parents matches the whitelist.
 */
export type PlacementRule = {
  minCount?: number;
  maxCount?: number;
  mustFollowDirectly?: string[];
  mustFollow?: string[];
  /** Cannot be deleted by the user. React Flow's `deletable` is wired to !pinned. */
  pinned?: boolean;
  /** Semantic role used by the validator to infer entry/terminal kinds. */
  role?: 'start' | 'end';
};

/**
 * The six visual categories. Color attaches to category, not to kind — adding
 * a new kind never grows the palette. Every node type picks exactly one.
 *
 * The framework leaves the visual mapping (token names, icon tile colors) to
 * the host's NodeShell renderer; this enum just defines the slots.
 */
export type NodeCategory =
  | 'trigger'
  | 'ai'
  | 'logic'
  | 'safety'
  | 'output'
  | 'note';

/**
 * Public contract for registering a node kind.
 *
 * `defaultConfig` may be a value or a factory. Prefer the factory form for
 * configs that contain nested mutable objects, dates, or anything that should
 * be a fresh instance per node.
 *
 * Use `defineNodeType<TConfig>(...)` to keep TypeScript happy when collecting
 * heterogeneous defs into a single registry array.
 */
export type NodeTypeDef<TConfig = unknown> = {
  kind: string;
  /**
   * Short, operational noun. Shown as the bold line on the canvas card.
   * Intentionally not translated — these are technical primitives that
   * stay English in localized UIs (matches n8n/Make/Dify convention) and
   * the `node.kind` token (e.g. `start`, `agent`) used in template refs
   * like `{{start.input}}` mirrors the English label.
   */
  label: string;
  /**
   * One-line description. Shown under the label in the palette. English
   * fallback — prefer setting `descriptionKey` so the palette picks up
   * the localized copy.
   */
  description?: string;
  /** Translation key for `description`. Resolved by NodePalette. */
  descriptionKey?: string;
  /**
   * Icon component for the node — wrap the source icon via the logician-ui
   * `createIcon` helper (see `src/components/Icon/`) so all icons expose the
   * same Chakra-shaped API (`boxSize`, `color`, `currentColor` tinting) and
   * the host can't mix icon families.
   */
  icon: CreatedIcon;
  /**
   * One of six visual categories. Drives the icon-tile color and (for Note)
   * the body color. Has no effect on validation or runtime.
   */
  category: NodeCategory;

  defaultConfig: TConfig | (() => TConfig);

  /**
   * Optional overlay applied to `defaultConfig()` at node-creation time
   * with the current `useTranslate` translator in scope. Use for
   * user-facing string defaults that should land in the locale's
   * language — e.g. the canvas display name. The framework can't run
   * hooks inside `defaultConfig`, so localized defaults live here.
   * Shallow-merges over the static defaults; unset fields fall through.
   */
  localizeDefaults?: (
    translate: (key: string, params?: Record<string, string>) => string
  ) => Partial<TConfig>;

  /**
   * Optional overlay applied to `defaultConfig()` at node-creation time with the
   * opaque host bridge in scope — the host-data analogue of `localizeDefaults`.
   * Use for defaults that depend on live host data the static `defaultConfig`
   * can't see, e.g. picking a starting LLM from the tenant's live model list so
   * a fresh node never persists a hardcoded model that's absent from the picker.
   * Shallow-merges over the static + localized defaults; omit a key (or return
   * `{}`) to leave the static default in place. `hostBridge` is opaque — the
   * node type narrows it (see `getWorkflowHostBridge`).
   */
  hostDefaults?: (hostBridge: unknown) => Partial<TConfig>;

  /**
   * The snake_case identifier line under the kind label.
   * Defaults to the node id when omitted.
   */
  getInstanceTitle?: (config: TConfig) => string;

  /**
   * Optional meta-row chips. Short nouns/phrases ("Sonnet 4.6", "mask · halt").
   * Return an empty array to omit the meta row.
   *
   * Chips can be plain strings, or `{ text, tone }` objects to surface a
   * danger/warning tint on a specific sub-value (e.g. an unknown model).
   */
  getMetaChips?: (config: TConfig) => ReadonlyArray<MetaChipSpec>;

  /**
   * Escape hatch for nodes whose body doesn't fit the standard
   * header + meta-chips shape (e.g. Note). Most node types should leave this
   * undefined and use `getInstanceTitle` + `getMetaChips` instead.
   */
  renderNode?: ComponentType<NodeRenderProps<TConfig>>;
  /** Optional. If absent, clicking the node is a no-op for editing. */
  renderDrawer?: ComponentType<DrawerRenderProps<TConfig>>;

  /** Handles can depend on config (Classify creates N outputs from categories). */
  handles: (config: TConfig) => { inputs: HandleDef[]; outputs: HandleDef[] };

  /**
   * Optional FE-computed, graph-aware advisories for this node, merged into the
   * node's canvas warning/error chrome alongside the backend `issues`. Use for
   * guidance the backend can't give before a save — an unconnected required
   * exit, an empty or duplicated fan-out label. Pure and synchronous; it runs
   * on every node render, so keep it cheap.
   */
  getGraphIssues?: (ctx: { node: GraphNode<TConfig>; graph: Graph }) => Issue[];

  /** Output shape for variable resolution; undefined = no referenceable output. */
  outputSchema?: (config: TConfig) => JSONSchema | undefined;

  placement?: PlacementRule;

  /**
   * Reject an attempted connection. Return `true` to allow, `false` or a
   * reason string to reject. Called for either the source or target side —
   * the framework runs both and rejects if either says no.
   */
  canConnect?: (ctx: ConnectionCtx) => boolean | string;
};

export type NodeTypeRegistry = Record<string, NodeTypeDef>;

/**
 * Public props for the `<Workflow>` component.
 */
export type WorkflowProps = {
  nodeTypes: NodeTypeDef[];

  /**
   * Translator for the editor's chrome copy. The host passes a function bound
   * to its own locale + catalog so the editor localizes with the rest of the
   * app and can resolve the `descriptionKey`s the host registers on its node
   * types. When omitted, the component uses its bundled default copy.
   */
  translate?: WorkflowTranslate;

  /** Controlled graph. If provided, `onGraphChange` should also be provided. */
  graph?: Graph;
  onGraphChange?: (next: Graph) => void;

  /**
   * Fired when the user runs the one-click auto-arrange, with the freshly
   * laid-out graph. A pure reposition normally rides along on the next real
   * edit's save (see the host's `differsBeyondPosition`), so a deliberate
   * arrange would otherwise not persist on its own — hosts wire this to a
   * forced save so the tidied layout sticks across reloads. Domain-free: the
   * core just reports "the user arranged the graph"; the host decides what to
   * do with it.
   */
  onArrange?: (graph: Graph) => void;

  /**
   * Fired with the resulting graph after the user undoes/redoes. Lets the host
   * persist a revert that the autosave would otherwise drop: undoing an
   * auto-arrange is a position-only change, which `differsBeyondPosition`
   * ignores, so without this a reverted layout wouldn't survive a reload.
   */
  onHistoryNavigate?: (graph: Graph) => void;

  /** Uncontrolled initial graph. Ignored when `graph` is provided. */
  defaultGraph?: Graph;

  /**
   * Validation issues to render — sourced from the backend.
   *
   * Pass a stable reference (e.g. via `useMemo`) — a fresh array on every
   * render will cause `onIssuesChange` to fire every render.
   */
  issues?: Issue[];

  /** Hide palette + disable connect/drag/delete. */
  readOnly?: boolean;

  /**
   * Issues are being recomputed (a save/validation is in flight) — render a
   * loading affordance instead of treating an empty `issues` list as "no
   * issues". Lets the host keep the prior issues visible (passed in via
   * `issues`) while signalling that fresh validation is underway, avoiding a
   * blank→repopulate flicker. Generic on purpose: the framework stays
   * domain-free and the host decides what "validating" means.
   */
  validating?: boolean;

  showPalette?: boolean;

  /**
   * Render the right-hand inspector drawer (node/edge details). Defaults to
   * `true`. Hosts set this to `false` to free the floating-card slot for their
   * own surface — e.g. the studio workflow editor swaps in a test-chat card
   * when the author flips into test mode. Generic on purpose: the core only
   * knows "show the inspector or don't".
   */
  showInspector?: boolean;

  /**
   * Which side the inspector drawer docks on. Defaults to `'right'`. Hosts set
   * `'left'` when another surface owns the right rail (e.g. the studio editor's
   * version-history panel) so node inspection relocates into the slot the
   * palette vacated instead of fighting for the right edge.
   */
  inspectorDock?: DockSide;

  /**
   * Fired when the user clicks a node OR an edge while the inspector is
   * suppressed (`showInspector={false}`). Lets a host that has parked the
   * inspector slot for another surface (e.g. the studio editor's test-chat card)
   * react to the click — typically by restoring the inspector — so a click in
   * test mode jumps back to element details instead of being swallowed. The
   * clicked element is already selected and set as the drawer target, so once
   * the host flips `showInspector` back on the inspector opens on it. No-op when
   * the inspector is already shown.
   */
  onInspectTarget?: () => void;

  /**
   * Notified whenever the issues array identity changes. Mostly a Storybook
   * convenience now that validation is owned entirely by the backend — prod
   * surfaces read `backendIssues` directly off their save response.
   */
  onIssuesChange?: (issues: Issue[]) => void;

  /** Render-prop slot below the canvas (toolbar, run controls, etc.). */
  footer?: ReactNode;

  /**
   * Minimum height of the editor frame. Defaults to `'500px'` for the full
   * editor; lower it (e.g. for a read-only preview embedded in a card) so the
   * canvas can shrink to its container.
   */
  minHeight?: string | number;

  /**
   * Optional override for the category → token map. Use to retheme the
   * icon-tile colors and the Note body without forking NodeShell.
   * Defaults to DEFAULT_CATEGORY_TOKENS.
   */
  categoryTokens?: CategoryTokenMap;

  /**
   * Opaque slot for host-specific data that node-type render functions need
   * from the host app (e.g. a live LLM list, a chatbot id, API clients). The
   * framework passes this through verbatim — node types cast it to their
   * expected shape via a small accessor (see `adapters/factchatBridge.ts`).
   * Kept as `unknown` so the framework itself stays domain-free.
   */
  hostBridge?: unknown;

  /**
   * Optional host renderer for the edge inspector drawer. Threaded through
   * exactly like `nodeTypes`/`hostBridge` so the core never hardcodes
   * edge-specific UI. When omitted, the editor renders a built-in inspector
   * (editable label + read-only endpoints + delete) that is sufficient for
   * label-only edges. Provide this to add richer edge editing later (e.g.
   * edge conditions / CEL) without changing the framework core.
   */
  renderEdgeDrawer?: ComponentType<EdgeDrawerRenderProps>;
};

/**
 * Identity helper that preserves the TConfig generic so registry entries
 * don't need `as NodeTypeDef` casts at the call site.
 */
export function defineNodeType<TConfig>(
  def: NodeTypeDef<TConfig>
): NodeTypeDef {
  return def as NodeTypeDef;
}

/** Resolve `defaultConfig` whether it's a value or a factory. */
export function resolveDefaultConfig<TConfig>(
  def: Pick<NodeTypeDef<TConfig>, 'defaultConfig'>
): TConfig {
  const d = def.defaultConfig;
  return typeof d === 'function' ? (d as () => TConfig)() : d;
}
