import { createElement, type ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { emptyGraph } from './graphReducer';
import { useWorkflowIssueMessage } from './useWorkflowIssueMessage';
import type { Issue, WorkflowTranslate } from './Workflow.types';
import { WorkflowProvider } from './WorkflowContext';

/**
 * The hook is domain-free: it maps an issue's `code` to a deterministic
 * `workflow_be_<code>` key and resolves it through the host-injected
 * translator, falling back to the raw `issue.message` when the host has no
 * matching key. These tests inject a stub translator that mimics the common
 * "return the key when it's missing" contract, so they assert the mapping /
 * normalization / fallback behavior without depending on any host catalog.
 */
const CATALOG: Record<string, string> = {
  workflow_be_agent_model_required: 'Pick a model for the agent.',
  workflow_be_cycle_detected: 'The graph has a cycle.',
  workflow_be_if_else_input_attribute_unknown:
    'Unknown attribute {invalidPath}; try {suggestedPath}.',
};

const translate: WorkflowTranslate = (key, vars) => {
  const template = CATALOG[key];
  if (template === undefined) return key; // mirror "missing key → key"
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    String(vars?.[name] ?? `{${name}}`)
  );
};

const wrapper = ({ children }: { children: ReactNode }) =>
  createElement(
    WorkflowProvider,
    {
      graph: emptyGraph,
      dispatch: () => {},
      undo: () => {},
      redo: () => {},
      canUndo: false,
      canRedo: false,
      nodeTypes: {},
      translate,
      issues: [],
    },
    children
  );

const renderResolver = () =>
  renderHook(() => useWorkflowIssueMessage(), { wrapper }).result;

describe('useWorkflowIssueMessage', () => {
  it('resolves the workflow_be_<code> key via the injected translator', () => {
    const result = renderResolver();
    const issue: Issue = {
      severity: 'error',
      code: 'agent_model_required',
      message: 'RAW_BE_FALLBACK',
    };
    expect(result.current(issue)).toBe('Pick a model for the agent.');
    expect(result.current(issue)).not.toBe('RAW_BE_FALLBACK');
  });

  it('falls back to issue.message for an unknown code', () => {
    const result = renderResolver();
    const issue: Issue = {
      severity: 'error',
      code: 'totally_unknown_code',
      message: 'RAW_BE_FALLBACK',
    };
    expect(result.current(issue)).toBe('RAW_BE_FALLBACK');
  });

  it('normalizes a dotted/uppercased code to the snake_case key', () => {
    const result = renderResolver();
    const issue: Issue = {
      severity: 'error',
      code: 'CYCLE.DETECTED',
      message: 'RAW_BE_FALLBACK',
    };
    expect(result.current(issue)).toBe('The graph has a cycle.');
  });

  it('interpolates messageVars into the resolved copy', () => {
    const result = renderResolver();
    const issue: Issue = {
      severity: 'error',
      code: 'if_else_input_attribute_unknown',
      message: 'RAW_BE_FALLBACK',
      messageVars: {
        invalidPath: 'input.answer',
        suggestedPath: 'input.parsed.answer',
      },
    };
    const message = result.current(issue);
    expect(message).toContain('input.answer');
    expect(message).toContain('input.parsed.answer');
    expect(message).not.toBe('RAW_BE_FALLBACK');
  });
});
