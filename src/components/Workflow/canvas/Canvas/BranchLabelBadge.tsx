'use client';

import type { MouseEvent, ReactNode } from 'react';

import { Badge } from '@/components/Badge';
import { TbCheck, TbX } from '@/components/Icon';

import type { EdgeLabelVariant } from './edgeLabelVariant';

/**
 * Badge variant per branch-label kind. Pass / Fail are a binary safety outcome
 * so they read semantic (green / red); every routing key (If-Else branches, the
 * If-Else `else` fallback, Classify categories) and any free-text label reads as
 * a single neutral badge so the branch names all look alike.
 */
const VARIANT_BADGE: Record<
  EdgeLabelVariant,
  'success' | 'danger' | 'neutral'
> = {
  pass: 'success',
  fail: 'danger',
  key: 'neutral',
  else: 'neutral',
  default: 'neutral',
};

/**
 * The chip that names a node's exit branch. Rendered in two places that must
 * look identical so it reads as the SAME badge relocating: at the node's output
 * handle (while the exit is unconnected) and on the connected edge's midpoint.
 *
 * A drop shadow lifts it off the tinted canvas in light mode; in dark mode a
 * shadow can't lift anything, so the chip trades it for a hairline ring and
 * the neutral variant raises its fill clear of the canvas.
 */
export function BranchLabelBadge({
  variant,
  children,
  onClick,
}: {
  variant: EdgeLabelVariant;
  children: ReactNode;
  /** When set, the badge is clickable (the edge uses this to open its
   * inspector); omitted at the node handle, where the badge is inert. */
  onClick?: (e: MouseEvent) => void;
}) {
  const badgeVariant = VARIANT_BADGE[variant];
  return (
    <Badge
      variant={badgeVariant}
      boxShadow="sm"
      _dark={{
        boxShadow: '0 0 0 1px {colors.border.strong}',
        // slate.300, not the semantically-equivalent bg.emphasized: Chakra
        // resolves `bg.*` tokens referenced inside a nested condition to their
        // BASE value (rendering the light-gray light-mode fill in dark mode);
        // the slate ramp resolves correctly here. No upstream issue filed —
        // verified via rendered-DOM probe, 2026-06-12.
        bgColor: badgeVariant === 'neutral' ? 'slate.300' : undefined,
      }}
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
    >
      {variant === 'pass' ? <TbCheck boxSize="xs" aria-hidden /> : null}
      {variant === 'fail' ? <TbX boxSize="xs" aria-hidden /> : null}
      {children}
    </Badge>
  );
}
