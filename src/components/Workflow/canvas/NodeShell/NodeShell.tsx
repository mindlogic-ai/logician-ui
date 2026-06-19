'use client';

import type { ReactNode } from 'react';
import { Box, HStack, Stack } from '@chakra-ui/react';
import { Handle, Position } from '@xyflow/react';

import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { AlertTriangle, StickyNote } from '@/components/Icon';
import { Subtext } from '@/components/Typography';

import type {
  MetaChipSpec,
  MetaChipTone,
  NodeCategory,
  RunState,
} from '../../Workflow.types';
import { BranchLabelBadge } from '../Canvas/BranchLabelBadge';
import { getEdgeLabelVariant } from '../Canvas/edgeLabelVariant';
import { getCategoryTokens, IconTile } from '../IconTile';
import {
  CARD_WIDTH,
  getPortTop,
  MAX_META_CHIPS,
  metaChipStyles,
  metaChipToneStyles,
  NODE_MIN_HEIGHT,
  PORT_EDGE_PAD,
  PORT_GAP,
  PORT_STYLE,
} from './NodeShell.styles';
import type { NodeShellProps, RingChrome } from './NodeShell.types';

/**
 * Compact pill for the canvas node's meta row. Wraps logician-ui Chip
 * and overrides its chunky default padding/radius via `metaChipStyles`.
 * Tone tints the chip (e.g. an unknown model on an Agent node).
 */
function MetaChip({
  children,
  tone = 'default',
}: {
  children: ReactNode;
  tone?: MetaChipTone;
}) {
  return (
    <Chip {...metaChipStyles} {...metaChipToneStyles[tone]}>
      {children}
    </Chip>
  );
}

function normalizeChip(spec: MetaChipSpec): {
  text: string;
  tone: MetaChipTone;
} {
  return typeof spec === 'string'
    ? { text: spec, tone: 'default' }
    : { text: spec.text, tone: spec.tone ?? 'default' };
}

/**
 * Ring + body-border treatment per state. Notes keep their warm border in
 * all states but still surface the primary ring when selected so the active
 * annotation is visible.
 *
 * Precedence for the ring color: running > error > selected > warning.
 * The default-case border is `slate.300`.
 */
function getRingChrome(
  category: NodeCategory,
  selected: boolean,
  hasError: boolean,
  hasWarning: boolean,
  runState: RunState,
  noteBorder: string
): RingChrome {
  if (category === 'note') {
    if (selected) {
      return {
        borderColor: noteBorder,
        outline: '3px solid',
        outlineColor: 'primary.lighter',
      };
    }
    return { borderColor: noteBorder };
  }
  if (runState === 'running') {
    return {
      borderColor: 'primary.main',
      outline: '3px solid',
      outlineColor: 'primary.lighter',
    };
  }
  if (hasError) {
    return {
      borderColor: 'danger.main',
      outline: '3px solid',
      outlineColor: 'danger.lighter',
    };
  }
  if (selected) {
    return {
      borderColor: 'primary.main',
      outline: '3px solid',
      outlineColor: 'primary.lighter',
    };
  }
  if (hasWarning) return { borderColor: 'warning.main' };
  return { borderColor: 'slate.300' };
}

/**
 * Header glyph independently selected from the ring. Error wins over
 * warning wins over running's status dot — so an error inside a running
 * node still surfaces the alert, instead of being hidden by the green
 * dot.
 */
function getHeaderBadge(
  hasError: boolean,
  hasWarning: boolean,
  runState: RunState
): ReactNode {
  if (hasError) {
    return (
      <Box color="danger.main" display="flex" alignItems="center">
        <AlertTriangle boxSize="xs" />
      </Box>
    );
  }
  if (hasWarning) {
    return (
      <Box color="warning.dark" display="flex" alignItems="center">
        <AlertTriangle boxSize="xs" />
      </Box>
    );
  }
  if (runState === 'running') {
    return (
      <Box
        boxSize="2.5"
        borderRadius="full"
        bg="success.main"
        outline="3px solid"
        outlineColor="success.lighter"
      />
    );
  }
  return null;
}

export function NodeShell({
  label,
  instanceTitle,
  metaChips,
  category,
  icon,
  selected,
  runState,
  issues,
  inputs,
  outputs,
  connectedOutputIds,
  categoryTokens,
  customBody,
}: NodeShellProps) {
  const hasError = issues.some((i) => i.severity === 'error');
  const hasWarning = !hasError && issues.some((i) => i.severity === 'warning');
  const tokens = getCategoryTokens(category, categoryTokens);
  const ring = getRingChrome(
    category,
    selected,
    hasError,
    hasWarning,
    runState,
    tokens.border
  );
  const badge = getHeaderBadge(hasError, hasWarning, runState);
  const isNote = category === 'note';
  const chips = (metaChips ?? []).slice(0, MAX_META_CHIPS).map(normalizeChip);
  const overflowChip =
    metaChips && metaChips.length > MAX_META_CHIPS
      ? `+${metaChips.length - MAX_META_CHIPS}`
      : null;

  // Grow the card so ports stay evenly spread without crowding: the busiest
  // side drives the height — the inter-port gaps plus a tight top/bottom edge
  // pad — floored at NODE_MIN_HEIGHT. Notes carry no ports and size to their
  // text, so they opt out.
  const portCount = Math.max(inputs.length, outputs.length);
  const minHeight = isNote
    ? undefined
    : `${Math.max(
        NODE_MIN_HEIGHT,
        PORT_GAP * Math.max(portCount - 1, 0) + PORT_EDGE_PAD * 2
      )}px`;

  return (
    <Card
      width={CARD_WIDTH}
      minHeight={minHeight}
      p={0}
      borderRadius="lg"
      borderColor={ring.borderColor}
      outline={ring.outline}
      outlineColor={ring.outlineColor}
      boxShadow="sm"
      bg={isNote ? tokens.bg : 'bg.surface'}
      position="relative"
      // Center the body within the port-driven min-height so a content-light
      // node (e.g. Start) sits mid-card rather than pinned to the top edge.
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {isNote ? (
        <Stack gap={1} px={3} py={2}>
          <HStack
            gap={1}
            color="warning.dark"
            fontWeight="bold"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            <StickyNote boxSize="xs" />
            <Subtext color="warning.dark" fontWeight="bold">
              Note
            </Subtext>
          </HStack>
          {customBody ?? (
            <Subtext color="slate.1200" lineHeight={1.45}>
              {instanceTitle ?? label}
            </Subtext>
          )}
        </Stack>
      ) : (
        (customBody ?? (
          <Stack gap={0}>
            <HStack
              gap={2}
              px={3}
              pt={2}
              pb={chips.length || overflowChip ? 1 : 2}
            >
              <IconTile
                category={category}
                icon={icon}
                tokens={categoryTokens}
              />
              <Stack gap={0} flex={1} minWidth={0}>
                <Subtext fontWeight="semibold" color="slate.1200" lineClamp={1}>
                  {label}
                </Subtext>
                {instanceTitle ? (
                  <Subtext color="slate.900" lineClamp={1}>
                    {instanceTitle}
                  </Subtext>
                ) : null}
              </Stack>
              {badge}
            </HStack>
            {chips.length || overflowChip ? (
              <HStack px={3} pb={2} gap={1} flexWrap="wrap">
                {chips.map((chip) => (
                  <MetaChip key={chip.text} tone={chip.tone}>
                    {chip.text}
                  </MetaChip>
                ))}
                {overflowChip ? <MetaChip>{overflowChip}</MetaChip> : null}
              </HStack>
            ) : null}
          </Stack>
        ))
      )}

      {inputs.map((h, i) => (
        <Handle
          key={`in-${h.id}`}
          id={h.id}
          type="target"
          position={Position.Left}
          style={{
            ...PORT_STYLE,
            top: getPortTop(i, inputs.length),
          }}
        />
      ))}
      {outputs.map((h, i) => (
        <Handle
          key={`out-${h.id}`}
          id={h.id}
          type="source"
          position={Position.Right}
          style={{
            ...PORT_STYLE,
            top: getPortTop(i, outputs.length),
          }}
        >
          {h.label && !connectedOutputIds?.has(h.id) ? (
            // Same badge as the connected edge carries (see BranchLabelBadge),
            // so disconnecting/connecting reads as the chip relocating rather
            // than restyling. `pointerEvents="none"` keeps the handle draggable
            // through the label.
            <Box
              position="absolute"
              left="14px"
              top="50%"
              transform="translateY(-50%)"
              whiteSpace="nowrap"
              pointerEvents="none"
            >
              <BranchLabelBadge variant={getEdgeLabelVariant(h.id)}>
                {h.label}
              </BranchLabelBadge>
            </Box>
          ) : null}
        </Handle>
      ))}
    </Card>
  );
}
