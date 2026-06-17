'use client';

import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { Box } from '@chakra-ui/react';

import { useTranslate } from '@/hooks/useTranslate';

import { Canvas } from './canvas/Canvas';
import { historyReducer, initHistory } from './graphHistory';
import { useWorkflowGraphObserver } from './graphObserver';
import { emptyGraph } from './graphReducer';
import WorkflowTranslations from './Workflow.translations.json';
import type {
  Graph,
  Issue,
  NodeTypeRegistry,
  WorkflowProps,
  WorkflowTranslate,
} from './Workflow.types';
import { WorkflowProvider } from './WorkflowContext';

const EMPTY_ISSUES: Issue[] = [];

export function Workflow({
  nodeTypes: nodeTypeList,
  graph: controlledGraph,
  onGraphChange,
  onArrange,
  onHistoryNavigate,
  defaultGraph,
  issues: providedIssues,
  readOnly = false,
  validating = false,
  showPalette = true,
  onNodeClick,
  onEdgeClick,
  onSelectionChange,
  onIssuesChange,
  footer,
  children,
  categoryTokens,
  hostBridge,
  translate: providedTranslate,
  minHeight = '500px',
}: WorkflowProps) {
  const isControlled = controlledGraph !== undefined;

  // Chrome copy is host-injected so the core carries no app i18n dependency.
  // The host translator also resolves the node-type `descriptionKey`s it
  // registers. Without one, fall back to the bundled defaults.
  const fallbackTranslate = useTranslate(
    WorkflowTranslations
  ) as WorkflowTranslate;
  const translate = providedTranslate ?? fallbackTranslate;

  // Internal reducer is always the source of truth — even in controlled mode.
  // This avoids race conditions when multiple actions fire in the same React
  // batch: with a stale-closure dispatch wrapper around the host's setState,
  // the second action would compute from the original graph. By always
  // reducing locally and notifying the host via effect, both actions see the
  // updated state in sequence.
  const [history, dispatch] = useReducer(
    historyReducer,
    controlledGraph ?? defaultGraph ?? emptyGraph,
    initHistory
  );
  const graph = history.present;

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  // An undo/redo can revert to a graph that differs from the saved baseline
  // ONLY in node positions (e.g. undoing an auto-arrange). The host's autosave
  // ignores position-only diffs, so we flag the navigation and hand the host the
  // result via `onHistoryNavigate` to force-persist it. We gate out no-op
  // presses: they never change `graph`, so the flag would otherwise strand and
  // mis-fire on the next edit.
  const pendingHistoryNavRef = useRef(false);
  const undo = useCallback(() => {
    if (!canUndo) return;
    pendingHistoryNavRef.current = true;
    dispatch({ type: 'undo' });
  }, [canUndo]);
  const redo = useCallback(() => {
    if (!canRedo) return;
    pendingHistoryNavRef.current = true;
    dispatch({ type: 'redo' });
  }, [canRedo]);

  // Sync controlled prop INTO internal state when the host updates externally
  // (e.g. undo from outside, server-pushed change). Identity-based skip avoids
  // loops with our own onGraphChange.
  const lastControlledRef = useRef<Graph | undefined>(controlledGraph);
  useEffect(() => {
    if (!isControlled || controlledGraph === undefined) return;
    if (controlledGraph === graph) return;
    if (controlledGraph === lastControlledRef.current) return;
    lastControlledRef.current = controlledGraph;
    dispatch({ type: 'replace', graph: controlledGraph });
  }, [controlledGraph, isControlled, graph]);

  // Notify host OUT when internal graph changes (controlled mode only).
  const firstNotifyRef = useRef(true);
  useEffect(() => {
    if (!isControlled) return;
    if (firstNotifyRef.current) {
      firstNotifyRef.current = false;
      return;
    }
    if (graph === lastControlledRef.current) return;
    lastControlledRef.current = graph;
    onGraphChange?.(graph);
    // A position-only undo/redo settles to 'saved' via onGraphChange above and
    // would otherwise not persist; let the host force-save the result.
    if (pendingHistoryNavRef.current) {
      pendingHistoryNavRef.current = false;
      onHistoryNavigate?.(graph);
    }
  }, [graph, isControlled, onGraphChange, onHistoryNavigate]);

  const registry: NodeTypeRegistry = useMemo(() => {
    const map: NodeTypeRegistry = {};
    for (const def of nodeTypeList) map[def.kind] = def;
    return map;
  }, [nodeTypeList]);

  // Validation lives on the backend — the editor just renders whatever the
  // most recent save response returned. `providedIssues` is the only source.
  const issues = providedIssues ?? EMPTY_ISSUES;

  useEffect(() => {
    onIssuesChange?.(issues);
  }, [issues, onIssuesChange]);

  // Optional ancestor-provided observer — lets a parent watch the graph
  // without taking control of it. Used by the Storybook JSON-preview
  // decorator; no provider exists in production, so this is a no-op there.
  const observeGraph = useWorkflowGraphObserver();
  useEffect(() => {
    observeGraph?.(graph);
  }, [graph, observeGraph]);

  return (
    <WorkflowProvider
      graph={graph}
      dispatch={dispatch}
      undo={undo}
      redo={redo}
      canUndo={canUndo}
      canRedo={canRedo}
      nodeTypes={registry}
      translate={translate}
      issues={issues}
      onArrange={onArrange}
      readOnly={readOnly}
      onSelectionChange={onSelectionChange}
      validating={validating}
      categoryTokens={categoryTokens}
      hostBridge={hostBridge}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
        minHeight={minHeight}
      >
        <Canvas
          showPalette={showPalette && !readOnly}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
        >
          {children}
        </Canvas>
        {footer ? (
          <Box
            borderTop="1px solid"
            borderColor="slate.200"
            bg="bg.surface"
            px={4}
            py={2}
          >
            {footer}
          </Box>
        ) : null}
      </Box>
    </WorkflowProvider>
  );
}
