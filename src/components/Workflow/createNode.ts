import type { GraphNode } from './Workflow.types';

/**
 * Unique id for edges and other internal graph elements that aren't referenced
 * by name in user content. Node IDs use `nextNodeId` for memorable
 * `{kind}_{N}` ids instead.
 */
export function genId(prefix: string): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/**
 * Next sequential id for a node of the given kind, given the current node
 * list. Returns ids like `agent_1`, `classify_2`, `guardrail_1`, etc., so
 * authors can type them verbatim into `{{...}}` references.
 *
 * Start is a singleton — always `start`. Existing seeded graphs use hand-named
 * ids like `agent_main` / `guard_out`; those don't match the `kind_<digits>`
 * pattern and are ignored when computing the next number, so a fresh `agent`
 * dropped next to `agent_main` becomes `agent_1`, not `agent_2`.
 */
export function nextNodeId(
  kind: string,
  nodes: ReadonlyArray<GraphNode>
): string {
  if (kind === 'start') return 'start';
  const re = new RegExp(`^${kind}_(\\d+)$`);
  let max = 0;
  for (const n of nodes) {
    const m = re.exec(n.id);
    if (m) {
      const v = Number.parseInt(m[1], 10);
      if (Number.isFinite(v) && v > max) max = v;
    }
  }
  return `${kind}_${max + 1}`;
}

/** Offset applied to a duplicated node so it doesn't sit exactly on top. */
const DUPLICATE_OFFSET = 40;

/**
 * A copy of `node` with a fresh sequential id, a deep-cloned config, and a
 * slight offset. Pass the current node list so the duplicate's id continues
 * the per-kind counter. If two duplicates race within the same React batch
 * the second collides and the reducer's existing `addNode` dedupe drops it
 * — one missing duplicate, no corrupt state.
 */
export function cloneNode(
  node: GraphNode,
  nodes: ReadonlyArray<GraphNode>
): GraphNode {
  return {
    id: nextNodeId(node.kind, nodes),
    kind: node.kind,
    position: {
      x: node.position.x + DUPLICATE_OFFSET,
      y: node.position.y + DUPLICATE_OFFSET,
    },
    config: structuredClone(node.config),
  };
}
