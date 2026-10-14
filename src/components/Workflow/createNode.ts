import type {
  GraphNode,
  NodeTypeDef,
  Position,
  WorkflowTranslate,
} from './Workflow.types';
import { resolveDefaultConfig } from './Workflow.types';

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
  // Escape the kind: namespaced kinds (`math.add`) would otherwise read `.` as
  // a wildcard and count unrelated ids toward the counter.
  const escaped = kind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^${escaped}_(\\d+)$`);
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

/** String-only translator handed to `NodeTypeDef.localizeDefaults`. */
export type DefaultsTranslate = (
  key: string,
  params?: Record<string, string>
) => string;

/**
 * Tear the string lookup off the host translator so `localizeDefaults` doesn't
 * depend on the React-fragment interpolation path.
 */
export function toDefaultsTranslate(
  translate: WorkflowTranslate
): DefaultsTranslate {
  return (key, params) => translate(key, params) as string;
}

/**
 * Build a fresh node of `def`'s kind — the ONE place a node is created from a
 * node type, shared by the palette drop and `useWorkflowActions().addNode`, so
 * both paths produce the same id and starting config:
 *
 * - id: `nextNodeId` (`{kind}_{N}`), so authors can type it into `{{...}}`
 *   references — the same scheme duplicate/paste use;
 * - config: `defaultConfig`, then `localizeDefaults(translate)`, then
 *   `hostDefaults(hostBridge)`, each shallow-merged over the previous.
 */
export function createNodeFromType(
  def: NodeTypeDef,
  {
    position,
    nodes,
    translate,
    hostBridge,
  }: {
    position: Position;
    /** Current node list — continues the per-kind id counter. */
    nodes: ReadonlyArray<GraphNode>;
    translate: DefaultsTranslate;
    hostBridge?: unknown;
  }
): GraphNode {
  const base = resolveDefaultConfig(def) as Record<string, unknown>;
  const overlay = def.localizeDefaults?.(translate) as
    | Record<string, unknown>
    | undefined;
  // Host-data overlay (e.g. a starting LLM picked from the tenant's live model
  // list) — applied last so it wins over any static placeholder in
  // `defaultConfig`. Absent on a generic host, leaving the static defaults.
  const bridged = def.hostDefaults?.(hostBridge) as
    | Record<string, unknown>
    | undefined;
  return {
    id: nextNodeId(def.kind, nodes),
    kind: def.kind,
    position,
    config: { ...base, ...overlay, ...bridged },
  };
}
