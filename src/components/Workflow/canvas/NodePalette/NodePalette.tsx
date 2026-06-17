'use client';

import { DragEvent } from 'react';
import { Box, HStack, Stack } from '@chakra-ui/react';

import { Card } from '@/components/Card';
import { GripVertical, TbX } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Subtext, Subtitle } from '@/components/Typography';

import type { NodeCategory, NodeTypeDef } from '../../Workflow.types';
import { useWorkflow, useWorkflowTranslate } from '../../WorkflowContext';
import { FloatingCard } from '../FloatingCard';
import { IconTile } from '../IconTile';
import { DRAG_MIME, PALETTE_WIDTH } from './NodePalette.styles';

/**
 * Display order for category sections. Categories not in this list (e.g. a
 * host-added kind) fall through to the end in registration order so a new
 * category never disappears from the palette.
 */
const CATEGORY_ORDER: readonly NodeCategory[] = [
  'trigger',
  'ai',
  'logic',
  'safety',
  'output',
  'note',
];

const CATEGORY_LABELS: Record<NodeCategory, string> = {
  trigger: 'Trigger',
  ai: 'AI',
  logic: 'Logic',
  safety: 'Safety',
  output: 'Output',
  note: 'Note',
};

function PaletteItem({ def }: { def: NodeTypeDef }) {
  const { categoryTokens } = useWorkflow();
  const translate = useWorkflowTranslate();
  const description = def.descriptionKey
    ? translate(def.descriptionKey)
    : def.description;
  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData(DRAG_MIME, def.kind);
    e.dataTransfer.effectAllowed = 'move';
  };
  return (
    <Card
      draggable
      onDragStart={onDragStart}
      p={0}
      borderRadius="lg"
      // No box-shadow: the browser's HTML5 drag preview captures a
      // rectangular snapshot of the element. Card's default `shadow="sm"`
      // and the `clickable` hover effect leak outside the rounded border
      // and read as a white "halo" in the drag image.
      boxShadow="none"
      transition="none"
      cursor="grab"
      _active={{ cursor: 'grabbing' }}
      _hover={{ borderColor: 'primary.main' }}
    >
      <HStack gap={2} px={2.5} py={2}>
        <IconTile
          category={def.category}
          icon={def.icon}
          tokens={categoryTokens}
        />
        <Stack gap={0} flex={1} minWidth={0}>
          <Subtext fontWeight="semibold" color="slate.1200" lineClamp={1}>
            {def.label}
          </Subtext>
          {description ? (
            <Subtext color="slate.900" lineClamp={1}>
              {description}
            </Subtext>
          ) : null}
        </Stack>
        <Box color="slate.700" display="flex" alignItems="center">
          <GripVertical boxSize="xs" />
        </Box>
      </HStack>
    </Card>
  );
}

/**
 * Sidebar that lets the author drag node kinds onto the canvas. Rendered as a
 * floating card over the canvas (matching the right-hand inspector drawer), with
 * a header that collapses it back to {@link NodePaletteToggle}.
 */
export function NodePalette({ onClose }: { onClose: () => void }) {
  const { nodeTypes, readOnly } = useWorkflow();
  const translate = useWorkflowTranslate();
  if (readOnly) return null;

  // Group by category, preserving registration order within each group.
  // Pinned kinds (Start) aren't draggable so they're filtered out up front.
  const draggable = Object.values(nodeTypes).filter(
    (def) => !def.placement?.pinned
  );
  const byCategory = new Map<NodeCategory, NodeTypeDef[]>();
  for (const def of draggable) {
    const bucket = byCategory.get(def.category) ?? [];
    bucket.push(def);
    byCategory.set(def.category, bucket);
  }
  const orderedCategories: NodeCategory[] = [
    ...CATEGORY_ORDER.filter((c) => byCategory.has(c)),
    ...[...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <FloatingCard
      width={PALETTE_WIDTH}
      mt={4}
      mb={4}
      mx={4}
      // Size to content and float (like the right-hand inspector) instead of
      // stretching the full canvas height into a sidebar. `height="fit-content"`
      // forces it off the flex row's cross-axis stretch; a long list still caps
      // at the available column via `maxHeight` and scrolls its body.
      alignSelf="flex-start"
      height="fit-content"
      maxHeight="calc(100% - var(--chakra-spacing-4) - var(--chakra-spacing-4))"
      display="flex"
      flexDirection="column"
    >
      {/* Header mirrors the inspector drawer's chrome on the opposite edge:
          a title cluster + a single xs close button that collapses the card
          back to the floating `+` toggle. */}
      <HStack
        justify="space-between"
        align="center"
        px={4}
        py={3}
        borderBottom="1px solid"
        borderColor="slate.200"
      >
        <Subtitle color="slate.1300">
          {translate('workflow_palette_title')}
        </Subtitle>
        <IconButton
          aria-label={translate('workflow_palette_close') as string}
          size="xs"
          variant="ghost"
          colorPalette="neutral"
          onClick={onClose}
        >
          <TbX boxSize="xs" aria-hidden />
        </IconButton>
      </HStack>
      <Box flex="1" minHeight={0} overflowY="auto" p={3}>
        <Stack gap={4}>
          {orderedCategories.map((category) => (
            <Stack key={category} gap={2}>
              <Subtext
                fontWeight="bold"
                color="slate.900"
                textTransform="uppercase"
                letterSpacing="wider"
                pl={1}
              >
                {CATEGORY_LABELS[category]}
              </Subtext>
              <Stack gap={2}>
                {byCategory.get(category)!.map((def) => (
                  <PaletteItem key={def.kind} def={def} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </FloatingCard>
  );
}
