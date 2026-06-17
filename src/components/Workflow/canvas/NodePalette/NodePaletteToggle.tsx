'use client';

import { Box } from '@chakra-ui/react';

import { IoAddOutline } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Tooltip } from '@/components/Tooltip';

import { useWorkflowTranslate } from '../../WorkflowContext';

/**
 * Collapsed entry-point for the palette: a floating `+` button docked over the
 * canvas top-left. Opening it swaps in the full {@link NodePalette} card; the
 * card's close button collapses back to this button. Mirrors the right-hand
 * inspector drawer's "float over the canvas" treatment on the opposite edge.
 */
export function NodePaletteToggle({ onOpen }: { onOpen: () => void }) {
  const translate = useWorkflowTranslate();
  const label = translate('workflow_palette_title') as string;
  return (
    // zIndex sits above the GraphErrorBanner (zIndex 5), which docks in the same
    // top-left corner, so the toggle stays clickable when the graph has issues.
    <Box position="absolute" top={4} left={4} zIndex={6}>
      <Tooltip content={label} placement="right">
        <IconButton
          aria-label={label}
          size="md"
          variant="outline"
          colorPalette="neutral"
          bg="bg.surface"
          boxShadow="md"
          onClick={onOpen}
        >
          <IoAddOutline boxSize="md" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
