import { graphlib, layout } from '@dagrejs/dagre';

import { CARD_WIDTH } from '../canvas/NodeShell/NodeShell.styles';
import type { Graph, Position } from '../Workflow.types';

/**
 * Flow axis of the laid-out graph. `LR` (the default) lays ranks out
 * left-to-right, matching the way a workflow reads: trigger → steps → output.
 */
export type LayoutDirection = 'LR' | 'TB';

/** Rendered footprint of a node, used so ranks don't overlap. */
export type NodeDimensions = {
  width: number;
  height: number;
  /**
   * Extra room (px) to reserve on the node's trailing (downstream) edge for
   * content that overflows the card — specifically the exit labels a Classify /
   * If-Else node paints to the right of its handles. These are absolutely
   * positioned, so React Flow's measured `width` excludes them; without this
   * the next rank packs right up against the node and the edges leaving those
   * exits get tucked under the label text. See `estimateLabelOverhang`.
   */
  trailing?: number;
};

/**
 * Roughly how wide (px) the longest of a node's exit labels renders, so the
 * layout can reserve trailing room for it. The label is absolutely positioned
 * and not in the layout pass, so we approximate from text length rather than
 * measure: a per-glyph width plus the label's inset from the node edge. Korean
 * glyphs are near full-width, so we size for the wider case to stay safe.
 */
const LABEL_GLYPH_PX = 8;
const LABEL_INSET_PX = 18;

export function estimateLabelOverhang(labels: string[]): number {
  const longest = labels.reduce((max, label) => Math.max(max, label.length), 0);
  return longest === 0 ? 0 : LABEL_INSET_PX + longest * LABEL_GLYPH_PX;
}

export type AutoLayoutOptions = {
  direction?: LayoutDirection;
  /** Gap between adjacent ranks (along the flow axis). */
  rankGap?: number;
  /** Gap between sibling nodes within a rank (the cross axis). */
  nodeGap?: number;
  /**
   * Per-node order of output handles, keyed by node id — the ordered list of
   * `HandleDef.id`s a node paints top-to-bottom (e.g. a Classify node's
   * categories). Used to lay a node's downstream children out in the same order
   * its exits read, so the child wired to the first exit sits above the one
   * wired to the last (see `orderEdgesForDagre`). Nodes absent from the map (or
   * edges with no `sourceHandle`) keep their order in `graph.edges`.
   */
  outputOrder?: Record<string, readonly string[]>;
};

/**
 * Order `edges` for insertion into dagre so a fan-out node's children come out
 * in exit order — first exit on top, last on the bottom.
 *
 * dagre derives a rank's initial vertical order from a DFS that pushes each
 * node's successors in *edge-insertion order*, and the first-pushed sibling
 * lands at the BOTTOM (largest cross-axis coordinate). Left to the raw
 * `graph.edges` order — which is just whenever the author happened to wire each
 * exit — that yields criss-crossed edges: the first exit's child gets sent to
 * the bottom and the last exit's to the top.
 *
 * So for each source we know the exit order of, we reorder ITS edges in REVERSE
 * exit order to cancel dagre's reversal. Every other edge — a source with no
 * known exit order, or fewer than two edges — keeps its exact slot in
 * `graph.edges`, so the documented fallback path doesn't perturb the layout.
 * Stable: ties (e.g. two edges off one exit) preserve input order.
 */
function orderEdgesForDagre(
  edges: Graph['edges'],
  outputOrder: Record<string, readonly string[]>
): Graph['edges'] {
  // Collect, per source we can sort, that source's edges in REVERSE exit order.
  const sortedBySource = new Map<string, Graph['edges']>();
  for (const edge of edges) {
    if (!outputOrder[edge.source]) continue;
    const group = sortedBySource.get(edge.source);
    if (group) group.push(edge);
    else sortedBySource.set(edge.source, [edge]);
  }
  for (const [source, group] of sortedBySource) {
    const order = outputOrder[source];
    if (group.length < 2) {
      sortedBySource.delete(source);
      continue;
    }
    const exitIndex = (handle: string | undefined): number => {
      // An undefined handle denotes the first output (matches the
      // `resolveHandle` convention in connectionRules), so it ranks as exit 0.
      const i = order.indexOf(handle ?? order[0]);
      return i === -1 ? Number.MAX_SAFE_INTEGER : i;
    };
    // Stable sort keeps ties (e.g. two edges off one exit) in input order.
    group.sort((a, b) => exitIndex(b.sourceHandle) - exitIndex(a.sourceHandle));
  }

  // Nothing to reorder — hand back the original array untouched.
  if (sortedBySource.size === 0) return edges;

  // Replay `graph.edges` in place, drawing each sortable source's edges from
  // its reordered queue so only those slots change and all others stay put.
  const cursor = new Map<string, number>();
  return edges.map((edge) => {
    const group = sortedBySource.get(edge.source);
    if (!group) return edge;
    const i = cursor.get(edge.source) ?? 0;
    cursor.set(edge.source, i + 1);
    return group[i];
  });
}

/**
 * Footprint assumed for a node we have no measured size for — e.g. one added
 * but not yet rendered. Width tracks the fixed node-card width (`CARD_WIDTH`);
 * height is a typical two-row card. Callers should pass real measured sizes
 * when available so ranks pack tightly.
 */
const FALLBACK_WIDTH = parseInt(CARD_WIDTH, 10);
const FALLBACK_HEIGHT = 76;

const DEFAULT_RANK_GAP = 80;
const DEFAULT_NODE_GAP = 40;

/**
 * Compute a tidy, hierarchical layout for a workflow graph and return a new
 * `Graph` with every node's `position` recomputed (edges untouched). Pure and
 * deterministic — same graph + dimensions in, same positions out — so it's
 * safe to dispatch through the reducer and to snapshot in tests.
 *
 * `dimensions` maps node id → measured size; missing entries fall back to the
 * node-card defaults. Disconnected nodes are placed by dagre in the first rank
 * (never overlapping, thanks to `nodesep`).
 */
export function autoLayout(
  graph: Graph,
  dimensions: Record<string, NodeDimensions> = {},
  options: AutoLayoutOptions = {}
): Graph {
  const {
    direction = 'LR',
    rankGap = DEFAULT_RANK_GAP,
    nodeGap = DEFAULT_NODE_GAP,
    outputOrder = {},
  } = options;

  // Footprint dagre lays out with: the real card height, and a width padded by
  // any trailing exit-label overhang so the next rank clears it. We keep the
  // node left-aligned within that padded box (see the offset below) so the
  // reserved space lands on the trailing edge, where the labels actually are.
  const footprintOf = (id: string): NodeDimensions => {
    const d = dimensions[id];
    return {
      width: (d?.width ?? FALLBACK_WIDTH) + (d?.trailing ?? 0),
      height: d?.height ?? FALLBACK_HEIGHT,
    };
  };

  const g = new graphlib.Graph();
  g.setGraph({ rankdir: direction, ranksep: rankGap, nodesep: nodeGap });
  // dagre requires an edge-label factory even when we attach no labels.
  g.setDefaultEdgeLabel(() => ({}));

  for (const node of graph.nodes) {
    g.setNode(node.id, footprintOf(node.id));
  }
  for (const edge of orderEdgesForDagre(graph.edges, outputOrder)) {
    // Guard against edges that reference a pruned node so dagre doesn't
    // implicitly create a zero-size node for the dangling endpoint.
    if (g.hasNode(edge.source) && g.hasNode(edge.target)) {
      g.setEdge(edge.source, edge.target);
    }
  }

  layout(g);

  return {
    ...graph,
    nodes: graph.nodes.map((node) => {
      const laidOut = g.node(node.id);
      if (!laidOut) return node;
      const { width, height } = footprintOf(node.id);
      // dagre reports the node CENTER; React Flow positions are top-left. The
      // footprint width includes the trailing label pad, so subtracting half of
      // it puts the card's real left edge at the box's left — leaving the pad on
      // the trailing side, under the overflowing exit labels.
      const position: Position = {
        x: laidOut.x - width / 2,
        y: laidOut.y - height / 2,
      };
      return { ...node, position };
    }),
  };
}
