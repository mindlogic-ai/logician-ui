import type { ComponentType, ReactNode } from 'react';

import type { CategoryTokenMap } from '../canvas/IconTile';
import type { GraphAction } from '../graphReducer';
import type {
  EdgeDrawerRenderProps,
  Graph,
  Issue,
  NodeTypeDef,
  NodeTypeRegistry,
  RunState,
  WorkflowTranslate,
} from '../Workflow.types';

/**
 * What the right-hand inspector drawer is currently showing. A node and an
 * edge share the same drawer surface, so a single discriminated target — set
 * together with the matching canvas-selection id — keeps "what's selected" and
 * "what's inspected" in lockstep without two separate drawer ids.
 */
export type DrawerTarget =
  | { type: 'node'; id: string }
  | { type: 'edge'; id: string };

export type EditorState = {
  selectedNodeId: string | null;
  /** Currently selected edge id (canvas selection highlight). */
  selectedEdgeId: string | null;
  /** Node or edge whose properties the inspector drawer renders, or null. */
  drawerTarget: DrawerTarget | null;
  runStates: Record<string, RunState>;
};

export type WorkflowContextValue = {
  graph: Graph;
  dispatch: (action: GraphAction) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  nodeTypes: NodeTypeRegistry;
  getNodeType: (kind: string) => NodeTypeDef | undefined;
  /** Host-injected translator for the editor's chrome copy. */
  translate: WorkflowTranslate;
  issues: Issue[];
  issuesByNode: Record<string, Issue[]>;
  /** Issues keyed by `edgeId` — surfaced in the edge inspector drawer. */
  issuesByEdge: Record<string, Issue[]>;
  /**
   * Issues keyed by `${nodeId}.${fieldKey}` for inline field rendering.
   * Issues missing a `fieldKey` (graph-wide checks, generic node issues) do
   * not appear here — those still surface in the canvas validation banner.
   */
  issuesByField: Record<string, Issue[]>;
  editor: EditorState;
  /**
   * Host hook fired with the laid-out graph when the user runs auto-arrange.
   * See `WorkflowProps.onArrange` — lets the host force-persist the reposition.
   */
  onArrange?: (graph: Graph) => void;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedEdgeId: (id: string | null) => void;
  /** Set (or clear) the node/edge the inspector drawer renders. */
  setDrawerTarget: (target: DrawerTarget | null) => void;
  setRunState: (id: string, state: RunState) => void;
  resetRunStates: () => void;
  /**
   * Latest `(nodeId, fieldKey)` the user asked to jump to via the canvas
   * validation banner. FieldWrapper subscribes — if its key matches it
   * scrolls into view and focuses the input, then calls
   * `consumeFieldFocusRequest` so a re-render doesn't refocus repeatedly.
   */
  fieldFocusRequest: { nodeId: string; fieldKey: string } | null;
  requestFieldFocus: (nodeId: string, fieldKey: string) => void;
  consumeFieldFocusRequest: () => void;
  readOnly: boolean;
  /** Whether the inspector drawer renders. See `WorkflowProps.showInspector`. */
  showInspector: boolean;
  /**
   * Select a node or edge AND ensure the inspector is showing it: sets the
   * drawer target, and when a host has parked the inspector slot for another
   * surface (`showInspector={false}`, e.g. the studio editor's test-chat card)
   * asks it to restore the inspector via `WorkflowProps.onInspectTarget`. Every
   * "open this element's details" entry point — canvas node/edge click, edge
   * label, error-banner jump — routes through here so none of them get swallowed
   * while the inspector is parked. No-op restore when the inspector is shown.
   */
  revealInspector: (target: DrawerTarget) => void;
  /**
   * Issues are being recomputed (host save/validation in flight). Surfaces a
   * loading affordance (e.g. in `GraphErrorBanner`) so an empty `issues` list
   * mid-validation isn't treated as "no issues". See `WorkflowProps.validating`.
   */
  validating: boolean;
  /** Optional host override for category → token map. */
  categoryTokens?: CategoryTokenMap;
  /**
   * Opaque host bridge threaded down to inspectors so they can reach
   * host-supplied data (live model list, tool catalog, etc.) without the
   * generic Workflow core depending on FactChat APIs. Inspectors narrow it.
   */
  hostBridge?: unknown;
  /**
   * Optional host renderer for the edge inspector drawer (see
   * `WorkflowProps.renderEdgeDrawer`). When omitted the drawer falls back to a
   * built-in label + endpoints inspector.
   */
  renderEdgeDrawer?: ComponentType<EdgeDrawerRenderProps>;
};

export type WorkflowProviderProps = {
  graph: Graph;
  dispatch: (action: GraphAction) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  nodeTypes: NodeTypeRegistry;
  /** Host-injected translator for the editor's chrome copy. */
  translate: WorkflowTranslate;
  issues: Issue[];
  /** See `WorkflowContextValue.onArrange`. */
  onArrange?: (graph: Graph) => void;
  readOnly?: boolean;
  /** See `WorkflowProps.showInspector`. Defaults to `true`. */
  showInspector?: boolean;
  /** See `WorkflowProps.onInspectTarget`. */
  onInspectTarget?: () => void;
  /** See `WorkflowContextValue.validating`. */
  validating?: boolean;
  categoryTokens?: CategoryTokenMap;
  hostBridge?: unknown;
  /** Optional host renderer for the edge inspector drawer. */
  renderEdgeDrawer?: ComponentType<EdgeDrawerRenderProps>;
  children: ReactNode;
};
