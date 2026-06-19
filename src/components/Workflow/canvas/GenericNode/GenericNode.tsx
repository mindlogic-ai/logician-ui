'use client';

import { memo, useMemo } from 'react';
import type { NodeProps } from '@xyflow/react';

import { AlertOctagon } from '@/components/Icon';

import type { GraphNode } from '../../Workflow.types';
import { useWorkflow } from '../../WorkflowContext';
import { NodeShell } from '../NodeShell';
import type { WorkflowReactFlowNode } from './GenericNode.types';

/**
 * Single React Flow node renderer used for every node kind. Looks up the
 * registered NodeTypeDef and pulls declarative content from
 * `getInstanceTitle` + `getMetaChips`. Nodes whose body doesn't fit that
 * shape (e.g. Note) provide a `renderNode` escape hatch.
 *
 * Data passed via React Flow is just the node id — we resolve everything
 * else from context. This keeps the React Flow node payload small and
 * ensures every component reads the same source of truth.
 */

export const GenericNode = memo(function GenericNode(
  props: NodeProps<WorkflowReactFlowNode>
) {
  const { data, selected } = props;
  const { graph, getNodeType, issuesByNode, editor, categoryTokens } =
    useWorkflow();

  const node = graph.nodes.find((n) => n.id === data.nodeId) as
    | GraphNode
    | undefined;
  const def = node ? getNodeType(node.kind) : undefined;

  // Exits that already have an edge: their name shows on the edge's label badge,
  // so NodeShell suppresses the duplicate handle label for them. Memoized so the
  // Set identity is stable across renders — a fresh Set every render would defeat
  // NodeShell's own `memo`. Computed before the early return to keep the hook
  // call unconditional; an unmatched `node?.id` just yields an empty set.
  const connectedOutputIds = useMemo(
    () =>
      new Set(
        graph.edges
          .filter((e) => e.source === node?.id && e.sourceHandle)
          .map((e) => e.sourceHandle as string)
      ),
    [graph.edges, node?.id]
  );

  if (!node || !def) {
    return (
      <NodeShell
        label={node?.kind ?? 'unknown'}
        instanceTitle="unregistered kind"
        // safety category surfaces the broken-ness in the icon tile, not
        // only in the error ring chrome.
        category="safety"
        icon={AlertOctagon}
        selected={!!selected}
        runState="error"
        issues={[
          {
            severity: 'error',
            code: 'node.unknown_kind',
            message: `Unknown node kind: ${node?.kind ?? ''}`,
          },
        ]}
        inputs={[]}
        outputs={[]}
        categoryTokens={categoryTokens}
      />
    );
  }

  const { inputs, outputs } = def.handles(node.config);
  const backendIssues = issuesByNode[node.id] ?? [];
  // FE-computed, graph-aware advisories (e.g. an unconnected Guardrail exit)
  // surface in the same warning/error chrome as backend issues.
  const graphIssues = def.getGraphIssues?.({ node, graph }) ?? [];
  const issues = graphIssues.length
    ? [...backendIssues, ...graphIssues]
    : backendIssues;
  const runState = editor.runStates[node.id] ?? 'idle';

  const CustomRender = def.renderNode;
  const customBody = CustomRender ? (
    <CustomRender
      id={node.id}
      config={node.config}
      selected={!!selected}
      runState={runState}
      issues={issues}
    />
  ) : undefined;

  return (
    <NodeShell
      label={def.label}
      instanceTitle={def.getInstanceTitle?.(node.config) ?? node.id}
      metaChips={def.getMetaChips?.(node.config)}
      category={def.category}
      icon={def.icon}
      selected={!!selected}
      runState={runState}
      issues={issues}
      inputs={inputs}
      outputs={outputs}
      connectedOutputIds={connectedOutputIds}
      categoryTokens={categoryTokens}
      customBody={customBody}
    />
  );
});
