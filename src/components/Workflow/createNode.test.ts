import { describe, expect, it } from 'vitest';

import { nextNodeId } from './createNode';
import type { GraphNode } from './Workflow.types';

const node = (id: string, kind: string): GraphNode => ({
  id,
  kind,
  position: { x: 0, y: 0 },
  config: {},
});

describe('nextNodeId', () => {
  it('returns the singleton id for start', () => {
    expect(nextNodeId('start', [])).toBe('start');
    expect(nextNodeId('start', [node('start', 'start')])).toBe('start');
  });

  it('returns kind_1 when no nodes of that kind exist', () => {
    expect(nextNodeId('agent', [])).toBe('agent_1');
    expect(nextNodeId('classify', [node('agent_1', 'agent')])).toBe(
      'classify_1'
    );
  });

  it('continues the per-kind counter past the highest existing number', () => {
    const nodes = [
      node('agent_1', 'agent'),
      node('agent_2', 'agent'),
      node('agent_5', 'agent'),
    ];
    expect(nextNodeId('agent', nodes)).toBe('agent_6');
  });

  it('ignores hand-named seed ids that do not match {kind}_<digits>', () => {
    // Chatbot 3814's seed uses agent_main / guard_out / end_pass — those
    // must NOT count toward the per-kind counter, otherwise a fresh agent
    // next to agent_main would jump to agent_2 instead of agent_1.
    const nodes = [
      node('agent_main', 'agent'),
      node('guard_out', 'guardrail'),
      node('end_pass', 'end'),
    ];
    expect(nextNodeId('agent', nodes)).toBe('agent_1');
    expect(nextNodeId('guardrail', nodes)).toBe('guardrail_1');
    expect(nextNodeId('end', nodes)).toBe('end_1');
  });

  it('counts only nodes whose id matches the queried kind', () => {
    const nodes = [node('agent_1', 'agent'), node('classify_3', 'classify')];
    expect(nextNodeId('agent', nodes)).toBe('agent_2');
    expect(nextNodeId('classify', nodes)).toBe('classify_4');
    expect(nextNodeId('guardrail', nodes)).toBe('guardrail_1');
  });

  it('handles gaps in the per-kind sequence', () => {
    // The user deleted agent_2; the next add still continues past the max.
    const nodes = [node('agent_1', 'agent'), node('agent_3', 'agent')];
    expect(nextNodeId('agent', nodes)).toBe('agent_4');
  });
});
