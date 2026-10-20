import { Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Chip } from '.';

/**
 * **Deprecated since 5.0** — `Chip` is a thin alias of `Tag` and is removed in
 * 6.0. These stories only show that unmigrated call sites still render; new
 * code uses `Tag` (`tone`, `selected`, `category`).
 *
 * Mapping: `outline` → neutral · `primary` + `solid` → `selected` ·
 * `danger` / `success` / `warning` → that `tone` · everything else → neutral.
 */
const meta = {
  title: 'Components/Chip (deprecated)',
  component: Chip,
  tags: ['autodocs'],
  args: {
    children: 'Chip',
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 4.x props on the left of each pair render as the 5.0 Tag on the right. */
export const LegacyMapping: Story = {
  render: () => (
    <Flex gap={3} wrap="wrap" align="center">
      <Chip colorScheme="primary" variant="soft">
        primary soft → neutral
      </Chip>
      <Chip colorScheme="primary" variant="solid">
        primary solid → selected
      </Chip>
      <Chip colorScheme="danger" variant="soft">
        danger → tone danger
      </Chip>
      <Chip colorScheme="success" variant="solid">
        success → tone success
      </Chip>
      <Chip colorScheme="warning" variant="outline">
        outline → neutral
      </Chip>
    </Flex>
  ),
};
