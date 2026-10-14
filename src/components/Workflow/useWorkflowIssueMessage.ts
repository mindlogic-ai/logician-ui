'use client';

import { useCallback } from 'react';

import type { Issue } from './Workflow.types';
import { useWorkflowTranslate } from './WorkflowContext';

/**
 * Maps backend workflow validation issue codes to translated messages.
 * Mirrors the connectors error-message hook precedent
 * (`useConnectorErrorMessage`): the backend owns validation and returns raw
 * English in `Issue.message` (kept as a fallback for tests / logs), while
 * rendering surfaces resolve the localized copy here.
 *
 * Node kind names (Agent, Classify, etc.) are intentionally kept in English
 * across the UI; issues that interpolate them pass the raw `def.label` string
 * in `messageVars`, and Korean sentences read naturally with the
 * mixed-language token (e.g. "Agent는 최소 1개 이상 필요합니다").
 */
export const useWorkflowIssueMessage = () => {
  const translate = useWorkflowTranslate();

  return useCallback(
    (issue: Issue): string => {
      // Coerce all interpolation values to strings — `useTranslate`
      // returns a React-element array when a numeric var is passed,
      // which loses its string-ness through the `as string` cast and
      // breaks downstream code that joins or trims the message.
      const vars = issue.messageVars
        ? Object.fromEntries(
            Object.entries(issue.messageVars).map(([k, v]) => [k, String(v)])
          )
        : undefined;
      const t = (key: string) => translate(key, vars) as string;
      // Backend (`INVALID_GRAPH`) issues arrive with the validator's own
      // snake_case `code` (e.g. `agent_model_required`), localized under a
      // deterministic `workflow_be_<code>` key. Normalize defensively so a
      // dotted/uppercased variant still resolves. `useTranslate` returns the
      // key itself when no entry exists, so a missing key falls back to the
      // raw English `issue.message`.
      const beKey = `workflow_be_${issue.code
        .toLowerCase()
        .replace(/[.-]/g, '_')}`;
      const beMessage = t(beKey);
      return beMessage === beKey ? issue.message : beMessage;
    },
    [translate]
  );
};
