'use client';

import { useEffect, useRef } from 'react';

import { cloneNode } from './createNode';
import type { GraphNode } from './Workflow.types';
import { useWorkflow } from './WorkflowContext';

/**
 * True while a keystroke is being typed into a form field. Graph-level
 * shortcuts must yield so the field keeps normal text editing — including
 * its own native undo.
 */
const isEditingText = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  );
};

/**
 * Keyboard shortcuts for the workflow editor: undo/redo, copy/paste and
 * duplicate of the selected node, Delete/Backspace to remove the selected node
 * OR edge, and Escape to close the inspector. No-ops in read-only mode (the
 * Behavior-tab preview). React Flow's own Delete/Backspace binding still fires
 * for canvas-focused selections; this mirrors it so a selection made elsewhere
 * (e.g. via the inspector) is still removable.
 */
export function useWorkflowKeyboard(): void {
  const {
    undo,
    redo,
    readOnly,
    graph,
    dispatch,
    editor,
    getNodeType,
    setDrawerTarget,
    setSelectedNodeId,
    setSelectedEdgeId,
  } = useWorkflow();
  const clipboardRef = useRef<GraphNode | null>(null);
  const selectedNodeId = editor.selectedNodeId;
  const selectedEdgeId = editor.selectedEdgeId;

  useEffect(() => {
    if (readOnly) return;

    const pickSelected = (): GraphNode | null => {
      const node = graph.nodes.find((n) => n.id === selectedNodeId);
      if (!node || getNodeType(node.kind)?.placement?.pinned) return null;
      return node;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Text-editing shortcuts belong to the focused field, not the graph.
      if (isEditingText(e.target)) return;

      if (e.key === 'Escape') {
        setDrawerTarget(null);
        setSelectedNodeId(null);
        setSelectedEdgeId(null);
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Delete a selected edge (node deletion stays with React Flow's own
        // binding, which also clears edges attached to the removed node).
        if (
          selectedEdgeId &&
          graph.edges.some((ed) => ed.id === selectedEdgeId)
        ) {
          dispatch({ type: 'deleteEdge', id: selectedEdgeId });
          setSelectedEdgeId(null);
          setDrawerTarget(null);
        }
        return;
      }

      if (!e.metaKey && !e.ctrlKey) return;
      const key = e.key.toLowerCase();

      if (key === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (key === 'y') {
        e.preventDefault();
        redo();
      } else if (key === 'c') {
        const node = pickSelected();
        if (node) clipboardRef.current = node;
      } else if (key === 'v') {
        e.preventDefault();
        if (clipboardRef.current) {
          dispatch({
            type: 'addNode',
            node: cloneNode(clipboardRef.current, graph.nodes),
          });
        }
      } else if (key === 'd') {
        e.preventDefault();
        const node = pickSelected();
        if (node)
          dispatch({ type: 'addNode', node: cloneNode(node, graph.nodes) });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    undo,
    redo,
    readOnly,
    graph,
    dispatch,
    selectedNodeId,
    selectedEdgeId,
    getNodeType,
    setDrawerTarget,
    setSelectedNodeId,
    setSelectedEdgeId,
  ]);
}
