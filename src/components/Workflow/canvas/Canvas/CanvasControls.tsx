'use client';

import type { FitViewOptions } from '@xyflow/react';
import {
  ControlButton,
  Controls,
  useReactFlow,
  useStore,
  useStoreApi,
} from '@xyflow/react';

import {
  Minus,
  Plus,
  TbArrowBackUp,
  TbArrowForwardUp,
  TbLock,
  TbLockOpen,
  TbMaximize,
  TbSitemap,
} from '@/components/Icon';
import { Tooltip } from '@/components/Tooltip';

import { useWorkflow, useWorkflowTranslate } from '../../WorkflowContext';

// Rendered height of the palette toggle the controls tuck under in edit mode;
// update if the toggle resizes. Combined with the palette's own top gutter
// (spacing-4) it forms the clearance the controls drop by so they sit just
// below the toggle instead of overlapping it.
const PALETTE_TOGGLE_HEIGHT_PX = 52;
// Edit-mode top offset: clear the palette toggle (its gutter + height). Read-only
// preview has no chrome, so the controls sit at the plain corner inset instead.
const TOP_LEFT_OVERLAY_CLEARANCE = `calc(var(--chakra-spacing-4) + ${PALETTE_TOGGLE_HEIGHT_PX}px)`;
// Corner inset (spacing-3) for the controls when no chrome sits above them.
const CORNER_INSET = 'var(--chakra-spacing-3)';

type CanvasControlsProps = {
  /** Read-only preview hides the authoring-only lock and auto-arrange actions. */
  readOnly: boolean;
  /** Tidy the graph left-to-right — owned by the canvas, which has the node
      measurements the layout needs. */
  onAutoArrange: () => void;
  /** Shared fit-view framing so the manual button settles the view the same way
      the initial mount and re-fits do. */
  fitViewOptions: FitViewOptions;
  /** Whether the top-left corner already holds overlay chrome (palette toggle or
      error banner). When it does, the controls tuck below it; otherwise they sit
      tight in the corner so they never float under an empty gap. */
  topLeftChromePresent: boolean;
};

/**
 * The top-left canvas controls. We render every button ourselves — React
 * Flow's built-in zoom / fit / interactivity buttons are suppressed — so each
 * carries a localized {@link Tooltip} instead of React Flow's hardcoded English
 * `title`. We dock the cluster into the top-left overlay corner (rather than
 * React Flow's default bottom-left) so it doesn't read as orphaned mid-canvas —
 * most noticeably when the version-history inspector docks on the left.
 * Placement "right" keeps the tooltip on-canvas.
 */
export function CanvasControls({
  readOnly,
  onAutoArrange,
  fitViewOptions,
  topLeftChromePresent,
}: CanvasControlsProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  // Context undo/redo route through the Workflow wrapper that also asks the
  // host to persist a position-only revert — same path the keyboard shortcuts
  // take, so a button-driven undo of an auto-arrange sticks across reloads.
  const { undo, redo, canUndo, canRedo } = useWorkflow();
  const translate = useWorkflowTranslate();
  const t = (key: string) => translate(key) as string;

  // Mirror React Flow's built-in interactivity lock so our custom buttons drive
  // the same store state the default lock button would. "Interactive" means
  // nodes can be dragged, connected, and selected; the lock flips all three.
  const isInteractive = useStore(
    (s) => s.nodesDraggable || s.nodesConnectable || s.elementsSelectable
  );
  const store = useStoreApi();
  const onToggleInteractivity = () =>
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });

  const zoomInLabel = t('workflow_zoom_in');
  const zoomOutLabel = t('workflow_zoom_out');
  const fitViewLabel = t('workflow_fit_view');
  const undoLabel = t('workflow_undo');
  const redoLabel = t('workflow_redo');
  const autoArrangeLabel = t('workflow_auto_arrange');
  // The tooltip names the action a click performs: an interactive canvas locks,
  // a locked canvas unlocks.
  const interactivityLabel = isInteractive
    ? t('workflow_lock_canvas')
    : t('workflow_unlock_canvas');

  return (
    <Controls
      showZoom={false}
      showFitView={false}
      showInteractive={false}
      // Dock into the top-left overlay corner. When the corner already holds
      // chrome (the palette toggle or the error banner) the cluster tucks below
      // it; otherwise it sits at the corner so it never floats under an empty gap.
      position="top-left"
      style={{
        top: topLeftChromePresent ? TOP_LEFT_OVERLAY_CLEARANCE : CORNER_INSET,
        left: CORNER_INSET,
        margin: 0,
      }}
    >
      <Tooltip content={zoomInLabel} placement="right">
        <ControlButton onClick={() => zoomIn()} aria-label={zoomInLabel}>
          <Plus />
        </ControlButton>
      </Tooltip>
      <Tooltip content={zoomOutLabel} placement="right">
        <ControlButton onClick={() => zoomOut()} aria-label={zoomOutLabel}>
          <Minus />
        </ControlButton>
      </Tooltip>
      <Tooltip content={fitViewLabel} placement="right">
        <ControlButton
          onClick={() => fitView(fitViewOptions)}
          aria-label={fitViewLabel}
        >
          <TbMaximize />
        </ControlButton>
      </Tooltip>
      {/* Undo/redo, the interactivity lock and auto-arrange are authoring
          controls — meaningless in the read-only preview, so all are hidden
          there. */}
      {readOnly ? null : (
        <Tooltip content={undoLabel} placement="right">
          <ControlButton
            onClick={undo}
            disabled={!canUndo}
            aria-label={undoLabel}
          >
            <TbArrowBackUp />
          </ControlButton>
        </Tooltip>
      )}
      {readOnly ? null : (
        <Tooltip content={redoLabel} placement="right">
          <ControlButton
            onClick={redo}
            disabled={!canRedo}
            aria-label={redoLabel}
          >
            <TbArrowForwardUp />
          </ControlButton>
        </Tooltip>
      )}
      {readOnly ? null : (
        <Tooltip content={interactivityLabel} placement="right">
          <ControlButton
            onClick={onToggleInteractivity}
            aria-label={interactivityLabel}
          >
            {isInteractive ? <TbLockOpen /> : <TbLock />}
          </ControlButton>
        </Tooltip>
      )}
      {readOnly ? null : (
        <Tooltip content={autoArrangeLabel} placement="right">
          <ControlButton onClick={onAutoArrange} aria-label={autoArrangeLabel}>
            <TbSitemap />
          </ControlButton>
        </Tooltip>
      )}
    </Controls>
  );
}
