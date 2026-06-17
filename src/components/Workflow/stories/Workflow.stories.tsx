import { Box, HStack, VStack } from '@chakra-ui/react';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Subtext, Subtitle } from '@/components/Typography';

import { NodeInspector } from '../canvas/DrawerShell';
import { Workflow } from '../Workflow';
import type { Graph, WorkflowSelection } from '../Workflow.types';
import { toyGraph, toyNodeTypes } from './toyNodeTypes';

/**
 * The Workflow editor wired with toy (domain-free) node types. The same
 * component powers FactChat's studio editor; the difference is entirely in the
 * registered `nodeTypes` + the surrounding chrome the host composes.
 */
const meta: Meta<typeof Workflow> = {
  title: 'Components/Workflow',
  component: Workflow,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <Box h="600px" w="100%" borderWidth="1px" borderColor="border.default">
        <Story />
      </Box>
    ),
  ],
};
export default meta;

/**
 * Default: palette + canvas + the built-in `<NodeInspector>` drawer. Drag a node
 * from the palette, connect handles, undo/redo, auto-arrange, and click a node
 * to edit it in the drawer.
 */
export const Default: StoryFn<typeof Workflow> = () => (
  <Workflow nodeTypes={toyNodeTypes} defaultGraph={toyGraph as Graph}>
    <NodeInspector />
  </Workflow>
);

/** Empty canvas — only the palette. Proves the cold-start (no nodes) path. */
export const Empty: StoryFn<typeof Workflow> = () => (
  <Workflow nodeTypes={toyNodeTypes}>
    <NodeInspector />
  </Workflow>
);

/**
 * No `<NodeInspector>` — the host owns inspection. Clicking a node drives a panel
 * rendered *outside* the canvas via `onSelectionChange`. This is the seam for
 * "clicking a node controls a different part of the UI".
 */
export const CustomSelectionPanel: StoryFn<typeof Workflow> = () => {
  const [selection, setSelection] = useState<WorkflowSelection | null>(null);
  return (
    <HStack h="100%" gap={0} align="stretch">
      <Box flex="1" minW={0}>
        <Workflow
          nodeTypes={toyNodeTypes}
          defaultGraph={toyGraph as Graph}
          onSelectionChange={setSelection}
        />
      </Box>
      <VStack
        w="280px"
        p={4}
        align="stretch"
        borderLeftWidth="1px"
        borderColor="border.default"
        bg="bg.surface"
      >
        <Subtitle>My own panel</Subtitle>
        <Subtext
          color={selection ? undefined : 'slate.500'}
          data-testid="selection-readout"
        >
          {selection
            ? `Selected ${selection.type}: ${selection.id}`
            : 'Click a node or edge…'}
        </Subtext>
      </VStack>
    </HStack>
  );
};

/**
 * Read-only preview: no palette, the inspector renders as a legible non-editing
 * view (controls disabled). Used for embedded thumbnails / version previews.
 */
export const ReadOnly: StoryFn<typeof Workflow> = () => (
  <Workflow
    nodeTypes={toyNodeTypes}
    defaultGraph={toyGraph as Graph}
    readOnly
    showPalette={false}
  >
    <NodeInspector />
  </Workflow>
);

/** Inspector docked on the left (e.g. when another surface owns the right rail). */
export const LeftDockedInspector: StoryFn<typeof Workflow> = () => (
  <Workflow
    nodeTypes={toyNodeTypes}
    defaultGraph={toyGraph as Graph}
    showPalette={false}
  >
    <NodeInspector dock="left" />
  </Workflow>
);
