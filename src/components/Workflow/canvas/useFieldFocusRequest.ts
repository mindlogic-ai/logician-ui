'use client';

import { type RefObject, useEffect } from 'react';

import { useWorkflow } from '../WorkflowContext';

/**
 * Wires a field surface into the `fieldFocusRequest` channel: when the canvas
 * validation banner asks to jump to `(nodeId, fieldKey)`, the matching
 * container scrolls into view and its first focusable element is focused,
 * then the request is consumed so a re-render doesn't refocus repeatedly.
 *
 * Shared by `FieldWrapper` (body fields) and `NodeTitleEditable` (the header
 * rename editor) so the jump protocol can't drift between them. The selector
 * includes the editable's `[data-part="preview"]` — focusing it activates
 * edit mode (activationMode "focus"); mid-edit its `input` matches first.
 */
export function useFieldFocusRequest(
  nodeId: string,
  fieldKey: string,
  containerRef: RefObject<HTMLDivElement | null>
): void {
  const { fieldFocusRequest, consumeFieldFocusRequest } = useWorkflow();

  useEffect(() => {
    if (
      fieldFocusRequest?.nodeId !== nodeId ||
      fieldFocusRequest.fieldKey !== fieldKey
    ) {
      return;
    }
    // Defer one frame so a freshly-mounted drawer has painted before we
    // try to scroll/focus inside it.
    const handle = requestAnimationFrame(() => {
      const root = containerRef.current;
      if (root) {
        root.scrollIntoView({ block: 'center', behavior: 'smooth' });
        root
          .querySelector<HTMLElement>(
            'input, textarea, [contenteditable="true"], select, button, [data-part="preview"]'
          )
          ?.focus();
      }
      consumeFieldFocusRequest();
    });
    return () => cancelAnimationFrame(handle);
  }, [
    fieldFocusRequest,
    nodeId,
    fieldKey,
    containerRef,
    consumeFieldFocusRequest,
  ]);
}
