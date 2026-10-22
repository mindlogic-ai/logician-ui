import { useState } from 'react';
import { Box, chakra, Flex } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Textarea } from '../Textarea';
import { MaxLengthIndicator } from '.';

const meta = {
  title: 'Components/MaxLengthIndicator',
  component: MaxLengthIndicator,
  args: {
    value: 1,
    maxLength: 50,
  },
  argTypes: {
    value: {
      control: 'number',
    },
    maxLength: {
      control: 'number',
    },
  },
} satisfies Meta<typeof MaxLengthIndicator>;

export default meta;

type Story = StoryObj<typeof MaxLengthIndicator>;

export const Basic: Story = {};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `MaxLengthIndicator.usage.mdx` with <Canvas of={…} />. Hidden
// from the sidebar (`!dev`).

const LIMIT = 200;

export const DoUnderField: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: under the field, tied to it, with the real limit',
  render: function DoUnderFieldStory() {
    const [text, setText] = useState('신입 사원을 위한 사내 규정 안내 챗봇입니다.');
    return (
      <Box w="360px">
        <chakra.label
          display="block"
          htmlFor="bot-description"
          fontSize="sm"
          fontWeight="semibold"
          mb={1}
        >
          설명
        </chakra.label>
        <Textarea
          id="bot-description"
          value={text}
          maxLength={LIMIT}
          aria-describedby="bot-description-count"
          onChange={(event) => setText(event.target.value)}
        />
        <Flex justify="flex-end" mt={1}>
          <MaxLengthIndicator
            id="bot-description-count"
            value={text.length}
            maxLength={LIMIT}
          />
        </Flex>
      </Box>
    );
  },
};

/** Tokens the indicator reads, from `MaxLengthIndicator.tsx`. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable rows={[{ token: 'fg.subtle', use: <T en="count text" ko="개수 글자" /> }]} />
  ),
};
