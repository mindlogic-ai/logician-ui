'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { Issue, RunState } from '../Workflow.types';
import type {
  DrawerTarget,
  WorkflowContextValue,
  WorkflowProviderProps,
} from './WorkflowContext.types';

const WorkflowContext = createContext<WorkflowContextValue | null>(null);

export function useWorkflow(): WorkflowContextValue {
  const ctx = useContext(WorkflowContext);
  if (!ctx) {
    throw new Error('useWorkflow must be used inside a <Workflow> component');
  }
  return ctx;
}

/**
 * Convenience accessor for the host-injected translator. Canvas chrome calls
 * this exactly where it would otherwise reach for an app-level `useTranslate`,
 * keeping the core free of any direct i18n dependency.
 */
export function useWorkflowTranslate() {
  return useWorkflow().translate;
}

export function WorkflowProvider({
  graph,
  dispatch,
  undo,
  redo,
  canUndo,
  canRedo,
  nodeTypes,
  translate,
  issues,
  onArrange,
  readOnly = false,
  onSelectionChange,
  validating = false,
  categoryTokens,
  hostBridge,
  children,
}: WorkflowProviderProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [drawerTarget, setDrawerTarget] = useState<DrawerTarget | null>(null);
  const [runStates, setRunStates] = useState<Record<string, RunState>>({});
  const [fieldFocusRequest, setFieldFocusRequest] = useState<{
    nodeId: string;
    fieldKey: string;
  } | null>(null);

  const requestFieldFocus = useCallback((nodeId: string, fieldKey: string) => {
    setFieldFocusRequest({ nodeId, fieldKey });
  }, []);

  const consumeFieldFocusRequest = useCallback(
    () => setFieldFocusRequest(null),
    []
  );

  const setRunState = useCallback((id: string, state: RunState) => {
    setRunStates((prev) => ({ ...prev, [id]: state }));
  }, []);

  const resetRunStates = useCallback(() => setRunStates({}), []);

  // Single entry point for "select this element": every open-intent caller
  // (canvas node/edge click, edge label, error-banner jump) routes through here
  // so selection lives in one place. The host is notified via the
  // `onSelectionChange` effect below.
  const revealInspector = useCallback(
    (target: DrawerTarget) => setDrawerTarget(target),
    []
  );

  // Notify the host whenever the selected element changes — so it can drive its
  // own inspector / side panel anywhere in its layout. Keyed on the target
  // identity (set fresh per click), so graph edits don't re-fire it; the
  // node/edge snapshot is read at fire time via a ref to avoid stale closures.
  const graphRef = useRef(graph);
  graphRef.current = graph;
  useEffect(() => {
    if (!onSelectionChange) return;
    if (!drawerTarget) {
      onSelectionChange(null);
      return;
    }
    const g = graphRef.current;
    if (drawerTarget.type === 'node') {
      const node = g.nodes.find((n) => n.id === drawerTarget.id);
      onSelectionChange(node ? { type: 'node', id: node.id, node } : null);
    } else {
      const edge = g.edges.find((e) => e.id === drawerTarget.id);
      onSelectionChange(edge ? { type: 'edge', id: edge.id, edge } : null);
    }
    // Depends on `drawerTarget` only — fire on selection-identity change, not on
    // every graph edit (the node/edge snapshot is read via `graphRef`).
  }, [drawerTarget]);

  const getNodeType = useCallback(
    (kind: string) => nodeTypes[kind],
    [nodeTypes]
  );

  const issuesByNode = useMemo(() => {
    const map: Record<string, Issue[]> = {};
    for (const issue of issues) {
      if (!issue.nodeId) continue;
      (map[issue.nodeId] ||= []).push(issue);
    }
    return map;
  }, [issues]);

  const issuesByEdge = useMemo(() => {
    const map: Record<string, Issue[]> = {};
    for (const issue of issues) {
      if (!issue.edgeId) continue;
      (map[issue.edgeId] ||= []).push(issue);
    }
    return map;
  }, [issues]);

  const issuesByField = useMemo(() => {
    const map: Record<string, Issue[]> = {};
    for (const issue of issues) {
      if (!issue.nodeId || !issue.fieldKey) continue;
      const key = `${issue.nodeId}.${issue.fieldKey}`;
      (map[key] ||= []).push(issue);
    }
    return map;
  }, [issues]);

  const value = useMemo<WorkflowContextValue>(
    () => ({
      graph,
      dispatch,
      undo,
      redo,
      canUndo,
      canRedo,
      nodeTypes,
      getNodeType,
      translate,
      issues,
      issuesByNode,
      issuesByEdge,
      issuesByField,
      editor: { selectedNodeId, selectedEdgeId, drawerTarget, runStates },
      onArrange,
      setSelectedNodeId,
      setSelectedEdgeId,
      setDrawerTarget,
      revealInspector,
      setRunState,
      resetRunStates,
      fieldFocusRequest,
      requestFieldFocus,
      consumeFieldFocusRequest,
      readOnly,
      validating,
      categoryTokens,
      hostBridge,
    }),
    [
      graph,
      dispatch,
      undo,
      redo,
      canUndo,
      canRedo,
      nodeTypes,
      getNodeType,
      translate,
      issues,
      issuesByNode,
      issuesByEdge,
      issuesByField,
      onArrange,
      selectedNodeId,
      selectedEdgeId,
      drawerTarget,
      revealInspector,
      runStates,
      setRunState,
      resetRunStates,
      fieldFocusRequest,
      requestFieldFocus,
      consumeFieldFocusRequest,
      readOnly,
      validating,
      categoryTokens,
      hostBridge,
    ]
  );

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}
