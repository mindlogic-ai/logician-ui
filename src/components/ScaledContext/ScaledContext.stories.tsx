import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { ScaledContext } from './ScaledContext';

const meta = {
  title: 'Components/ScaledContext',
  component: ScaledContext,
  parameters: { layout: 'centered' },
  argTypes: {
    fontSize: { control: 'text' },
  },
} satisfies Meta<typeof ScaledContext>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { fontSize: '1rem' },
  render: args => (
    <ScaledContext {...args}>
      <Stack gap={4} p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md" minW="200px">
        <Text>Content inside ScaledContext</Text>
        <Button variant="outline">Action</Button>
        <Checkbox>
          <Checkbox.Control />
          <Checkbox.Label>Option</Checkbox.Label>
        </Checkbox>
      </Stack>
    </ScaledContext>
  ),
};

export const Scaling: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Spacing and size tokens are converted from `rem` to `em`, so they scale proportionally with `fontSize`. The same content looks identical in structure but grows/shrinks with the font size.',
      },
    },
  },
  render: () => (
    <HStack align="start" gap={8} flexWrap="wrap">
      {(['0.75rem', '1rem', '1.25rem', '1.5rem'] as const).map(size => (
        <Box key={size}>
          <Text fontSize="xs" color="gray.500" mb={2} fontFamily="mono">
            fontSize="{size}"
          </Text>
          <ScaledContext fontSize={size}>
            <Stack
              gap={3}
              p={3}
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
            >
              <Button variant="outline">Button</Button>
              <Checkbox>
                <Checkbox.Control />
                <Checkbox.Label>Checkbox</Checkbox.Label>
              </Checkbox>
            </Stack>
          </ScaledContext>
        </Box>
      ))}
    </HStack>
  ),
};

export const NestedScaling: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'ScaledContext can be nested. Each level scales relative to its own fontSize, allowing isolated UI regions to have independent densities.',
      },
    },
  },
  render: () => (
    <Stack gap={6}>
      <ScaledContext fontSize="0.875rem" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
        <Stack gap={3}>
          <Text fontSize="sm" color="gray.500" fontFamily="mono">
            Outer: 0.875rem (compact)
          </Text>
          <Button variant="outline">Outer Button</Button>
          <ScaledContext fontSize="1.25rem" p={3} borderWidth="1px" borderColor="primary.light" borderRadius="md">
            <Stack gap={3}>
              <Text fontSize="sm" color="gray.500" fontFamily="mono">
                Inner: 1.25rem (spacious)
              </Text>
              <Button variant="outline">Inner Button</Button>
              <Checkbox>
                <Checkbox.Control />
                <Checkbox.Label>Inner Checkbox</Checkbox.Label>
              </Checkbox>
            </Stack>
          </ScaledContext>
        </Stack>
      </ScaledContext>
    </Stack>
  ),
};
