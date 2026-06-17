import type { ReactNode } from 'react';

import type { CategoryTokenMap } from '../canvas/IconTile';
import type { GraphAction } from '../graphReducer';
import type {
  Graph,
  Issue,
  NodeTypeDef,
  NodeTypeRegistry,
  RunState,
  WorkflowSelection,
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
  /**
   * Select a node or edge and make it the inspector's target. Every "open this
   * element's details" entry point — canvas node/edge click, edge label,
   * error-banner jump — routes through here so selection stays in one place
   * (read it via `editor.drawerTarget`; the host is also notified through
   * `WorkflowProps.onSelectionChange`).
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
  /** See `WorkflowProps.onSelectionChange`. Fired by the provider on selection change. */
  onSelectionChange?: (selection: WorkflowSelection | null) => void;
  /** See `WorkflowContextValue.validating`. */
  validating?: boolean;
  categoryTokens?: CategoryTokenMap;
  hostBridge?: unknown;
  children: ReactNode;
};
