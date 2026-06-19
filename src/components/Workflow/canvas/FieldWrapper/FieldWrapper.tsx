'use client';

import { ReactNode, useMemo, useRef } from 'react';
import { HStack, Stack } from '@chakra-ui/react';

import { AlertTriangle, TbAlertCircle } from '@/components/Icon';
import { Subtext } from '@/components/Typography';

import { useWorkflowIssueMessage } from '../../useWorkflowIssueMessage';
import { useWorkflow } from '../../WorkflowContext';
import { pickPrimaryIssue, severityColorToken } from '../issueSeverity';
import { useFieldFocusRequest } from '../useFieldFocusRequest';

export type FieldTone = 'default' | 'danger' | 'warning';

export type FieldToneState = {
  tone: FieldTone;
  /**
   * Resolved Chakra color token for the current tone, or undefined when
   * tone is 'default'. Pass directly to a child input's `borderColor` —
   * Chakra leaves the input's default border in place when undefined.
   */
  borderColor: string | undefined;
  /**
   * True when the field is in an error state — pass to logician-ui controls
   * (e.g. `SelectField`, `ComboboxField`) whose API exposes `invalid`
   * instead of accepting a raw `borderColor`. Warning state does not flip
   * this — the helper text below already conveys it.
   */
  invalid: boolean;
};

export type FieldWrapperProps = {
  /** Owning node — used to look up field-level issues. */
  nodeId: string;
  /** Stable key — must match the `fieldKey` emitted by `def.validate()`. */
  fieldKey: string;
  label: ReactNode;
  /**
   * Render-prop. Receives the resolved tone for the field so the input
   * can apply its own `borderColor` directly — avoids drawing a wrapping
   * ring on top of the input's own border (which double-borders).
   */
  children: (state: FieldToneState) => ReactNode;
  /** Optional helper text shown beneath the input when no issue is present. */
  helperText?: ReactNode;
  /** Optional trailing slot in the label row — e.g. an info popover trigger. */
  labelAction?: ReactNode;
};

/**
 * Layout wrapper for a single inspector field. Reads the field's validation
 * state from WorkflowContext (`issuesByField[`${nodeId}.${fieldKey}`]`) and
 * passes a resolved tone to the render-prop child so the input applies its
 * own `borderColor` — no wrapping ring, no double border.
 *
 * Deliberately not a Chakra `FormControl`: the editor's child controls
 * (SelectField, Switch) bring their own `Field.Root`, and double-wrapping
 * triggers zag's duplicate-id collision (see the schema-fields block in
 * `agentNodeType` for the prior fix). Children own their own label/id
 * association; this wrapper just decorates the layout.
 *
 * Also wires the `fieldFocusRequest` channel: when the canvas validation
 * banner asks to jump to `(nodeId, fieldKey)`, the matching wrapper scrolls
 * into view and focuses its input, then clears the request so a re-render
 * doesn't refocus repeatedly.
 */
export function FieldWrapper({
  nodeId,
  fieldKey,
  label,
  children,
  helperText,
  labelAction,
}: FieldWrapperProps) {
  const { issuesByField } = useWorkflow();
  const resolveIssueMessage = useWorkflowIssueMessage();
  const containerRef = useRef<HTMLDivElement>(null);
  const issues = issuesByField[`${nodeId}.${fieldKey}`] ?? [];
  const issue = useMemo(() => pickPrimaryIssue(issues), [issues]);

  const tone: FieldTone =
    issue?.severity === 'error'
      ? 'danger'
      : issue?.severity === 'warning'
        ? 'warning'
        : 'default';
  const toneColor =
    tone === 'default' ? undefined : severityColorToken(issue!.severity);

  useFieldFocusRequest(nodeId, fieldKey, containerRef);

  return (
    <Stack ref={containerRef} gap={1.5}>
      <HStack justify="space-between" align="center" gap={2}>
        <Subtext fontWeight="semibold" color="slate.1300">
          {label}
        </Subtext>
        {labelAction ?? null}
      </HStack>
      {children({ tone, borderColor: toneColor, invalid: tone === 'danger' })}
      {issue ? (
        <HStack gap={1} align="center">
          <Subtext color={toneColor} display="flex" alignItems="center">
            {tone === 'danger' ? (
              <TbAlertCircle boxSize="xs" />
            ) : (
              <AlertTriangle boxSize="xs" />
            )}
          </Subtext>
          <Subtext color={toneColor}>{resolveIssueMessage(issue)}</Subtext>
        </HStack>
      ) : helperText ? (
        <Subtext color="slate.900">{helperText}</Subtext>
      ) : null}
    </Stack>
  );
}
