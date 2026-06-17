'use client';

import {
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box } from '@chakra-ui/react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getSmoothStepPath,
} from '@xyflow/react';

import { TbX } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';

import { useWorkflow, useWorkflowTranslate } from '../../WorkflowContext';
import { findPort } from '../EdgeInspector';
import { BranchLabelBadge } from './BranchLabelBadge';
import { getEdgeLabelVariant } from './edgeLabelVariant';

// Grace period on pointer-leave so moving from the SVG edge to the portaled
// label (or the delete button beside it) doesn't flicker the affordance off in
// the gap between layers.
const HOVER_LEAVE_GRACE_MS = 80;

/**
 * Edge with a logician-ui `Badge` label that rides the connection midpoint.
 * Clicking the label selects the edge (opens its inspector); hovering the edge
 * reveals a delete button BESIDE the label (not replacing it), so the label
 * stays clickable. Labels use `EdgeLabelRenderer` rather than React Flow's SVG
 * `labelStyle` so they inherit the design system's Badge styling.
 */
export function LabeledEdge({
  id,
  source,
  sourceHandleId,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  markerEnd,
  style,
}: EdgeProps) {
  const {
    graph,
    getNodeType,
    dispatch,
    readOnly,
    editor: { selectedEdgeId },
    setSelectedNodeId,
    setSelectedEdgeId,
    setDrawerTarget,
    revealInspector,
  } = useWorkflow();
  const translate = useWorkflowTranslate();

  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const onEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(true);
  }, []);
  const onLeave = useCallback(() => {
    leaveTimer.current = setTimeout(
      () => setHovered(false),
      HOVER_LEAVE_GRACE_MS
    );
  }, []);
  useEffect(
    () => () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    },
    []
  );

  // Clicking the label selects the edge and opens its inspector — mirrors the
  // canvas `onEdgeClick` so the label is just another way in. Routes through
  // revealInspector so a label click in test mode also restores the parked
  // inspector (the badge stops propagation, so it never reaches onEdgeClick).
  const onSelect = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      setSelectedNodeId(null);
      setSelectedEdgeId(id);
      revealInspector({ type: 'edge', id });
    },
    [id, setSelectedNodeId, setSelectedEdgeId, revealInspector]
  );

  const onDelete = useCallback(
    (e: MouseEvent) => {
      // Don't let the click fall through to edge/pane selection handlers.
      e.stopPropagation();
      dispatch({ type: 'deleteEdge', id });
      // Mirror the keyboard-delete cleanup so the inspector doesn't linger on a
      // now-removed edge.
      if (selectedEdgeId === id) {
        setSelectedEdgeId(null);
        setDrawerTarget(null);
      }
    },
    [dispatch, id, selectedEdgeId, setSelectedEdgeId, setDrawerTarget]
  );

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // The label's text: an explicit edge label wins; otherwise fall back to the
  // source handle's label, so semantic exits (Pass / Fail / branch / Else) ride
  // on the wire without the author having to name every edge.
  const variant = getEdgeLabelVariant(sourceHandleId);
  // Resolve the source handle's label once (not per render): React Flow
  // re-renders edges constantly during pan/zoom, and `handles()` rebuilds its
  // outputs array each call.
  const handleLabel = useMemo(() => {
    const sourceNode = graph.nodes.find((n) => n.id === source);
    return findPort(
      sourceNode,
      sourceNode ? getNodeType(sourceNode.kind) : undefined,
      'outputs',
      sourceHandleId ?? undefined
    )?.label;
  }, [graph.nodes, source, sourceHandleId, getNodeType]);
  const displayLabel = label ?? handleLabel;

  // Delete shows only while the name badge itself is hovered (when editable) —
  // not anywhere on the wire — so it's a deliberate, low-noise affordance. The
  // edge inspector's delete button (see DrawerShell) covers labelless edges and
  // anyone who'd rather delete from the sidebar.
  const showDelete = hovered && !readOnly && Boolean(displayLabel);
  const wrapperTransform = `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`;

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      {showDelete || displayLabel ? (
        <EdgeLabelRenderer>
          {/* The anchor is centered on the edge midpoint and wraps the badge;
              hovering it (the badge) is what reveals delete. Delete is
              positioned absolutely to the badge's right (out of the centered
              flow) so revealing it doesn't shift the badge. */}
          <Box
            position="absolute"
            transform={wrapperTransform}
            pointerEvents="all"
            display="inline-flex"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {displayLabel ? (
              <BranchLabelBadge variant={variant} onClick={onSelect}>
                {displayLabel}
              </BranchLabelBadge>
            ) : null}
            {showDelete ? (
              <Box
                position="absolute"
                left="100%"
                top="50%"
                transform="translateY(-50%)"
                pl={1}
              >
                <IconButton
                  aria-label={translate('workflow_edge_delete') as string}
                  onClick={onDelete}
                  size="xs"
                  variant="outline"
                  colorPalette="danger"
                  bg="bg.surface"
                  borderRadius="full"
                >
                  <TbX boxSize="xs" />
                </IconButton>
              </Box>
            ) : null}
          </Box>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}
