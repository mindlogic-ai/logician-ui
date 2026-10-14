'use client';

import { Box, Stack, VStack } from '@chakra-ui/react';

import { Input } from '@/components/Input';
import { Subtext } from '@/components/Typography';

import type {
  EdgeDrawerRenderProps,
  GraphNode,
  NodeTypeDef,
} from '../../Workflow.types';
import { useWorkflow, useWorkflowTranslate } from '../../WorkflowContext';
import { FieldWrapper } from '../FieldWrapper';
import { endpointTitle, findPort } from './endpointTitle';

/**
 * Author-facing line for the port an edge endpoint sits on. A resolved port
 * shows its label (Pass / 분기 1 — the same text LabeledEdge rides on the
 * wire) or nothing when unlabeled (raw ids like `out` are wiring detail). A
 * DANGLING handle — one no current port matches, e.g. after restoring a
 * snapshot whose category was renamed — falls back to the raw id, the only
 * clue left for diagnosing the broken wire.
 */
function portLabel(
  node: GraphNode | undefined,
  def: NodeTypeDef | undefined,
  side: 'inputs' | 'outputs',
  handleId: string | undefined
): string | undefined {
  if (!node || !def || !handleId) return undefined;
  const port = findPort(node, def, side, handleId);
  return port ? port.label : handleId;
}

/**
 * Built-in edge inspector body rendered in `DrawerShell` when the host does not
 * supply a `renderEdgeDrawer`. Shows an editable label plus read-only endpoint
 * info (source title → target title, and handle ids when present). Label edits
 * flow through `onChange` (an `updateEdge` dispatch) so they are undoable.
 *
 * Deliberately uses only generic primitives (logician-ui + FieldWrapper) so the
 * framework core stays domain-free.
 */
export function BuiltInEdgeInspector({
  edge,
  onChange,
  readOnly,
}: EdgeDrawerRenderProps) {
  const translate = useWorkflowTranslate();
  const { graph, getNodeType } = useWorkflow();

  const sourceNode = graph.nodes.find((n) => n.id === edge.source);
  const targetNode = graph.nodes.find((n) => n.id === edge.target);
  const sourceDef = sourceNode ? getNodeType(sourceNode.kind) : undefined;
  const targetDef = targetNode ? getNodeType(targetNode.kind) : undefined;
  const sourceTitle = endpointTitle(sourceNode, sourceDef, edge.source);
  const targetTitle = endpointTitle(targetNode, targetDef, edge.target);

  return (
    <Box px={4} py={4}>
      <VStack align="stretch" gap={4}>
        <FieldWrapper
          // Edges have no field-scoped issues in `issuesByField` (which is keyed
          // by nodeId), so this lookup is intentionally empty — FieldWrapper is
          // reused purely for its label + layout.
          nodeId={edge.id}
          fieldKey="label"
          label={translate('workflow_edge_label_label') as string}
        >
          {({ borderColor }) => (
            <Input
              borderColor={borderColor}
              value={edge.label ?? ''}
              disabled={readOnly}
              placeholder={
                translate('workflow_edge_label_placeholder') as string
              }
              onChange={(e) =>
                onChange({ ...edge, label: e.target.value || undefined })
              }
            />
          )}
        </FieldWrapper>

        <Stack gap={1.5}>
          <Subtext fontWeight="semibold" color="slate.1300">
            {translate('workflow_edge_endpoints_heading') as string}
          </Subtext>
          <Stack gap={2}>
            <EndpointRow
              label={translate('workflow_edge_source_label') as string}
              title={sourceTitle}
              portLabel={portLabel(
                sourceNode,
                sourceDef,
                'outputs',
                edge.sourceHandle
              )}
            />
            <EndpointRow
              label={translate('workflow_edge_target_label') as string}
              title={targetTitle}
              portLabel={portLabel(
                targetNode,
                targetDef,
                'inputs',
                edge.targetHandle
              )}
            />
          </Stack>
        </Stack>
      </VStack>
    </Box>
  );
}

/** One read-only endpoint line: role label, resolved node title, optional port label. */
function EndpointRow({
  label,
  title,
  portLabel,
}: {
  label: string;
  title: string;
  portLabel?: string;
}) {
  return (
    <Stack gap={0.5}>
      <Subtext color="slate.900">{label}</Subtext>
      <Subtext color="slate.1200">{title}</Subtext>
      {portLabel ? <Subtext color="slate.700">{portLabel}</Subtext> : null}
    </Stack>
  );
}
