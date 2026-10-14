import type { CSSProperties, ReactNode } from 'react';

import { type CreatedIcon } from '@/components/Icon';

import type {
  HandleDef,
  Issue,
  MetaChipSpec,
  NodeCategory,
  RunState,
} from '../../Workflow.types';
import type { CategoryTokenMap } from '../IconTile';

export type NodeShellProps = {
  label: string;
  instanceTitle?: string;
  metaChips?: ReadonlyArray<MetaChipSpec>;
  category: NodeCategory;
  icon: CreatedIcon;
  selected: boolean;
  runState: RunState;
  issues: Issue[];
  inputs: HandleDef[];
  outputs: HandleDef[];
  /**
   * Output handle ids that already have an edge connected. A connected exit's
   * name is carried by the edge's label badge, so the node suppresses its own
   * handle label there to avoid showing the branch name twice (once on the
   * exit, once on the edge). Unconnected exits keep their label so the author
   * can still tell the branches apart.
   */
  connectedOutputIds?: ReadonlySet<string>;
  /** Optional override for the category → token map. */
  categoryTokens?: CategoryTokenMap;
  /** Escape-hatch body. If provided, replaces the standard header+meta layout. */
  customBody?: ReactNode;
};

export type RingChrome = {
  borderColor: string;
  outline?: string;
  outlineColor?: string;
};

export type PortStyle = CSSProperties;
