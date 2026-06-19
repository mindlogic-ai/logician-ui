'use client';

import { VStack } from '@chakra-ui/react';

import { FormControl } from '@/components/FormControl';
import { FormLabel } from '@/components/FormLabel';
import { Bulb, Plus, Sparkles } from '@/components/Icon';
import { Input } from '@/components/Input';

import { defineNodeType, type NodeTypeDef } from '../Workflow.types';

/**
 * Toy node kinds used only by the stories. They prove the Workflow component is
 * domain-free — these math primitives have nothing to do with any host app, yet
 * exercise the full contract (handles, drawers, placement, output schema).
 */

type InputCfg = { value: number };
type AddCfg = { label: string };
type OutputCfg = { label: string };

const inputNode = defineNodeType<InputCfg>({
  kind: 'math.input',
  label: 'Number',
  description: 'Constant input',
  category: 'trigger',
  icon: Sparkles,
  defaultConfig: () => ({ value: 1 }),
  placement: { role: 'start' },
  handles: () => ({ inputs: [], outputs: [{ id: 'out' }] }),
  outputSchema: () => ({
    type: 'object',
    properties: { value: { type: 'number' } },
    required: ['value'],
    additionalProperties: false,
  }),
  getInstanceTitle: (cfg) => `${cfg.value}`,
  renderDrawer: ({ config, onChange, readOnly }) => (
    <FormControl>
      <FormLabel>Value</FormLabel>
      <Input
        type="number"
        value={config.value}
        disabled={readOnly}
        onChange={(e) =>
          onChange({ ...config, value: Number(e.target.value) || 0 })
        }
      />
    </FormControl>
  ),
});

const addNode = defineNodeType<AddCfg>({
  kind: 'math.add',
  label: 'Add',
  description: 'a + b',
  category: 'logic',
  icon: Plus,
  defaultConfig: () => ({ label: 'sum' }),
  handles: () => ({
    inputs: [
      { id: 'a', label: 'a' },
      { id: 'b', label: 'b' },
    ],
    outputs: [{ id: 'out' }],
  }),
  outputSchema: () => ({
    type: 'object',
    properties: { value: { type: 'number' } },
    required: ['value'],
    additionalProperties: false,
  }),
  getInstanceTitle: (cfg) => cfg.label,
  getMetaChips: (cfg) => [cfg.label],
  renderDrawer: ({ config, onChange, readOnly }) => (
    <VStack align="stretch" gap={3}>
      <FormControl>
        <FormLabel>Label</FormLabel>
        <Input
          value={config.label}
          disabled={readOnly}
          onChange={(e) => onChange({ ...config, label: e.target.value })}
        />
      </FormControl>
    </VStack>
  ),
});

const outputNode = defineNodeType<OutputCfg>({
  kind: 'math.output',
  label: 'Print',
  description: 'Terminal output',
  category: 'output',
  icon: Bulb,
  defaultConfig: () => ({ label: 'result' }),
  placement: { minCount: 1, role: 'end' },
  handles: () => ({ inputs: [{ id: 'in' }], outputs: [] }),
  getInstanceTitle: (cfg) => cfg.label,
  renderDrawer: ({ config, onChange, readOnly }) => (
    <FormControl>
      <FormLabel>Label</FormLabel>
      <Input
        value={config.label}
        disabled={readOnly}
        onChange={(e) => onChange({ ...config, label: e.target.value })}
      />
    </FormControl>
  ),
});

export const toyNodeTypes: NodeTypeDef[] = [inputNode, addNode, outputNode];

/** A small starter graph: two inputs feeding an Add, feeding a Print. */
export const toyGraph = {
  nodes: [
    {
      id: 'a',
      kind: 'math.input',
      position: { x: 0, y: 0 },
      config: { value: 2 },
    },
    {
      id: 'b',
      kind: 'math.input',
      position: { x: 0, y: 140 },
      config: { value: 3 },
    },
    {
      id: 'sum',
      kind: 'math.add',
      position: { x: 280, y: 70 },
      config: { label: 'sum' },
    },
    {
      id: 'print',
      kind: 'math.output',
      position: { x: 560, y: 70 },
      config: { label: 'result' },
    },
  ],
  edges: [
    { id: 'e1', source: 'a', target: 'sum', targetHandle: 'a' },
    { id: 'e2', source: 'b', target: 'sum', targetHandle: 'b' },
    { id: 'e3', source: 'sum', target: 'print' },
  ],
};
