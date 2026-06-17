'use client';

import { createContext, useContext } from 'react';

import type { Graph } from './Workflow.types';

/**
 * Optional ancestor-provided hook to observe an uncontrolled <Workflow>'s
 * graph without taking over its state (which `graph` + `onGraphChange` would).
 *
 * Used by the Storybook JSON-preview decorator so every story can render the
 * serialized graph payload. No provider exists in production, so <Workflow>
 * treats it as a no-op.
 */
export type WorkflowGraphObserver = (graph: Graph) => void;

export const WorkflowGraphObserverContext =
  createContext<WorkflowGraphObserver | null>(null);

export const useWorkflowGraphObserver = () =>
  useContext(WorkflowGraphObserverContext);
