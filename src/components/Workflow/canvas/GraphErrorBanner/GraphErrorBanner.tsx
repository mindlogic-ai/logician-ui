'use client';

import { useMemo, useState } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { useReactFlow } from '@xyflow/react';

import { TbChevronDown } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { Subtext, Text } from '@/components/Typography';

import { useWorkflowIssueMessage } from '../../useWorkflowIssueMessage';
import type { GraphNode, Issue, NodeTypeDef } from '../../Workflow.types';
import { useWorkflow, useWorkflowTranslate } from '../../WorkflowContext';
import { endpointTitle } from '../EdgeInspector';
import { IssueList } from '../IssueList';

const NODELESS_GROUP = '__graph__';

type NodeIssueBucket = {
  /** Stable key — node id, or NODELESS_GROUP for graph-wide issues. */
  key: string;
  /** Resolved node + label when the group is tied to a specific node. */
  node: GraphNode | null;
  def: NodeTypeDef | null;
  errors: Issue[];
  warnings: Issue[];
};

// Same fallback chain as everywhere else (instance title → kind label → id),
// so an unnamed node groups under "End", not its raw `end_1` id.
const getNodeTitle = (node: GraphNode, def: NodeTypeDef | null): string =>
  endpointTitle(node, def ?? undefined, node.id);

/**
 * Floating banner listing the current graph's validation issues — both the
 * live validator output and backend `INVALID_GRAPH` errors fed in via
 * `externalIssues`. Issues group by node (then severity); clicking an issue
 * selects and pans to its node. Hidden in read-only mode (the Behavior-tab
 * preview).
 *
 * `paletteToggleVisible` shifts the banner clear of the floating `+` palette
 * toggle, which docks in the same top-left corner once the palette is
 * collapsed — otherwise the two overlays would overlap.
 */
export function GraphErrorBanner({
  paletteToggleVisible = false,
}: {
  paletteToggleVisible?: boolean;
}) {
  const {
    issues,
    graph,
    readOnly,
    validating,
    getNodeType,
    setSelectedNodeId,
    revealInspector,
    requestFieldFocus,
  } = useWorkflow();
  const { fitView } = useReactFlow();
  const translate = useWorkflowTranslate();
  const resolveIssueMessage = useWorkflowIssueMessage();
  const [open, setOpen] = useState(false);

  // Stringify counts before interpolation — see `useWorkflowIssueMessage`
  // for the underlying `useTranslate` quirk this guards against.
  const summarize = (errorCount: number, warningCount: number): string => {
    const parts: string[] = [];
    if (errorCount > 0) {
      parts.push(
        translate('workflow_issues_summary_errors', {
          count: String(errorCount),
        }) as string
      );
    }
    if (warningCount > 0) {
      parts.push(
        translate('workflow_issues_summary_warnings', {
          count: String(warningCount),
        }) as string
      );
    }
    return parts.join(', ');
  };

  const { errorCount, warningCount, groups } = useMemo(() => {
    let errors = 0;
    let warnings = 0;
    // Preserve insertion order from `graph.nodes` so the dropdown matches
    // canvas left-to-right reading order; graph-wide issues are appended last.
    const byKey = new Map<string, NodeIssueBucket>();
    const nodeById = new Map(graph.nodes.map((n) => [n.id, n] as const));

    const getOrCreate = (key: string): NodeIssueBucket => {
      let g = byKey.get(key);
      if (!g) {
        const node = nodeById.get(key) ?? null;
        g = {
          key,
          node,
          def: node ? (getNodeType(node.kind) ?? null) : null,
          errors: [],
          warnings: [],
        };
        byKey.set(key, g);
      }
      return g;
    };

    for (const issue of issues) {
      if (issue.severity === 'error') errors += 1;
      else warnings += 1;
      const key = issue.nodeId ?? NODELESS_GROUP;
      const g = getOrCreate(key);
      if (issue.severity === 'error') g.errors.push(issue);
      else g.warnings.push(issue);
    }

    // Order: graph-wide bucket first (cycle / unreachable / etc. block the
    // whole canvas and deserve top billing), then per-node buckets in
    // canvas order.
    const ordered: NodeIssueBucket[] = [];
    const graphWide = byKey.get(NODELESS_GROUP);
    if (graphWide) ordered.push(graphWide);
    for (const node of graph.nodes) {
      const g = byKey.get(node.id);
      if (g) ordered.push(g);
    }

    return { errorCount: errors, warningCount: warnings, groups: ordered };
  }, [issues, graph.nodes, getNodeType]);

  // Noise guard: only surface the "validating" affordance when we're
  // re-checking a graph that ALREADY shows issues (the retained `displayIssues`
  // the host passes in during a save). A clean graph (no issues) stays hidden
  // mid-save — the header save-status spinner already covers that case — so
  // editing a valid graph never flashes a banner on every keystroke.
  if (readOnly || issues.length === 0) return null;

  const showValidating = validating;

  const jumpToNode = (nodeId?: string) => {
    if (!nodeId || !graph.nodes.some((n) => n.id === nodeId)) return;
    setSelectedNodeId(nodeId);
    // revealInspector so jumping to a node from the banner also restores the
    // inspector when it's parked (test mode), not just sets the drawer target.
    revealInspector({ type: 'node', id: nodeId });
    void fitView({ nodes: [{ id: nodeId }], duration: 400, maxZoom: 1.2 });
  };

  const jumpToIssue = (issue: Issue) => {
    if (!issue.nodeId) return;
    jumpToNode(issue.nodeId);
    if (issue.fieldKey) {
      requestFieldFocus(issue.nodeId, issue.fieldKey);
    }
  };

  return (
    <Box
      position="absolute"
      top={3}
      // Clear the floating `+` palette toggle (md IconButton at left={4}) when
      // it's showing, so the banner sits beside it rather than under it.
      left={paletteToggleVisible ? 16 : 3}
      zIndex={5}
      maxW="md"
      bg="bg.surface"
      borderWidth="1px"
      borderColor={errorCount > 0 ? 'danger.main' : 'warning.main'}
      borderRadius="md"
      boxShadow="sm"
      overflow="hidden"
    >
      {showValidating ? (
        <Flex
          align="center"
          gap={2}
          px={3}
          py={2}
          bg="slate.50"
          borderBottomWidth="1px"
          borderColor="slate.200"
        >
          <Spinner size="xs" />
          <Subtext fontWeight="semibold" color="slate.1100">
            {translate('workflow_issues_validating') as string}
          </Subtext>
        </Flex>
      ) : null}
      <Box
        as="button"
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={3}
        px={3}
        py={2}
        bg="transparent"
        border="none"
        cursor="pointer"
        opacity={showValidating ? 0.6 : 1}
        transition="opacity 0.15s"
        onClick={() => setOpen((o) => !o)}
      >
        <Text fontSize="sm" fontWeight="semibold" color="slate.1300">
          {summarize(errorCount, warningCount)}
        </Text>
        <TbChevronDown
          boxSize="xs"
          color="slate.900"
          transform={open ? 'rotate(180deg)' : 'none'}
          transition="transform 0.15s"
        />
      </Box>
      {open ? (
        <VStack
          align="stretch"
          gap={0}
          maxH="80"
          overflowY="auto"
          opacity={showValidating ? 0.6 : 1}
          transition="opacity 0.15s"
          borderTopWidth="1px"
          borderColor="slate.200"
        >
          {groups.map((group, gi) => (
            <Box
              key={group.key}
              borderTopWidth={gi === 0 ? 0 : '1px'}
              borderColor="slate.200"
            >
              <Flex
                align="center"
                gap={2}
                px={3}
                py={1.5}
                bg="slate.50"
                cursor={group.node ? 'pointer' : 'default'}
                _hover={group.node ? { bg: 'slate.100' } : undefined}
                onClick={group.node ? () => jumpToNode(group.key) : undefined}
              >
                {group.def?.icon ? (
                  <Box
                    color="slate.1100"
                    display="flex"
                    alignItems="center"
                    flexShrink={0}
                  >
                    <group.def.icon boxSize="xs" />
                  </Box>
                ) : null}
                <Subtext fontWeight="semibold" color="slate.1300" truncate>
                  {group.node
                    ? getNodeTitle(group.node, group.def)
                    : translate('workflow_drawer_graph_group_title')}
                </Subtext>
              </Flex>
              {group.errors.length > 0 ? (
                <IssueList
                  label={translate('workflow_issues_errors_label') as string}
                  tone="error"
                  issues={group.errors}
                  onIssueClick={group.node ? jumpToIssue : undefined}
                  resolveMessage={resolveIssueMessage}
                />
              ) : null}
              {group.warnings.length > 0 ? (
                <IssueList
                  label={translate('workflow_issues_warnings_label') as string}
                  tone="warning"
                  issues={group.warnings}
                  onIssueClick={group.node ? jumpToIssue : undefined}
                  resolveMessage={resolveIssueMessage}
                />
              ) : null}
            </Box>
          ))}
        </VStack>
      ) : null}
    </Box>
  );
}
