import { type CreatedIcon } from '@/components/Icon';

import type { NodeCategory } from '../../Workflow.types';

export type CategoryTokens = { bg: string; fg: string; border: string };
export type CategoryTokenMap = Record<NodeCategory, CategoryTokens>;

export type IconTileProps = {
  category: NodeCategory;
  icon: CreatedIcon;
  size?: number;
  tokens?: CategoryTokenMap;
};
