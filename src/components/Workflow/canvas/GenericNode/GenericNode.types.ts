import type { Node } from '@xyflow/react';

/**
 * The payload React Flow passes to our custom node renderer. We only ship
 * the node id; everything else is resolved from `useWorkflow()` so React
 * Flow's internal state stays small.
 */
export type WorkflowNodeData = { nodeId: string };

export type WorkflowReactFlowNode = Node<WorkflowNodeData, 'workflow'>;
