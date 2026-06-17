import type { GraphNode, HandleDef, NodeTypeDef } from '../../Workflow.types';

/**
 * Author-facing title for an edge endpoint: the node-type's per-instance title
 * (e.g. an agent's name) when available, else the type label, else the raw id.
 *
 * Shared by the edge inspector (drawer header connection title + endpoint info).
 */
export function endpointTitle(
  node: GraphNode | undefined,
  def: NodeTypeDef | undefined,
  fallbackId: string
): string {
  if (node && def?.getInstanceTitle) {
    const title = def.getInstanceTitle(node.config);
    if (title) return title;
  }
  return def?.label ?? fallbackId;
}

/**
 * Resolve the port an edge endpoint sits on, from the owning node's current
 * handle set. `undefined` when the handle id no longer matches any port — a
 * dangling endpoint (e.g. a restored snapshot referencing a renamed Classify
 * category).
 *
 * Shared by the canvas wire label (LabeledEdge) and the edge inspector so the
 * two surfaces can't drift on how a port is named.
 */
export function findPort(
  node: GraphNode | undefined,
  def: NodeTypeDef | undefined,
  side: 'inputs' | 'outputs',
  handleId: string | undefined
): HandleDef | undefined {
  if (!node || !def || !handleId) return undefined;
  return def.handles(node.config)[side].find((h) => h.id === handleId);
}
