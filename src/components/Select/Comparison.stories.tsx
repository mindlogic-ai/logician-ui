import { Box, Stack, Text } from '@chakra-ui/react';
import { Meta } from '@storybook/react';
import { useState } from 'react';

import { Input } from '../Input';

import { Select } from '.';

/**
 * Temporary visual comparison between Input and Select.
 * Used to verify the two controls share the same default look
 * (border, hover, focus, font, padding, disabled/invalid states).
 * Safe to delete once the unified style is no longer being iterated on.
 */
const meta = {
  title: 'Components/InputSelectComparison',
} satisfies Meta;

export default meta;

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

export const SideBySide = () => {
  const [text, setText] = useState('');

  return (
    <Stack gap={6} width="400px">
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — placeholder
        </Text>
        <Input
          placeholder="Placeholder text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Select — placeholder
        </Text>
        <Select options={options} placeholder="Placeholder text" />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — with value
        </Text>
        <Input defaultValue="Some value" />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Select — with value
        </Text>
        <Select options={options} defaultValue={options[0]} />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — invalid
        </Text>
        <Input placeholder="Invalid input" invalid />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Select — invalid
        </Text>
        <Select options={options} placeholder="Invalid select" invalid />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — disabled
        </Text>
        <Input disabled defaultValue="Disabled" />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Select — disabled
        </Text>
        <Select options={options} defaultValue={options[0]} isDisabled />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — readOnly
        </Text>
        <Input readOnly defaultValue="Read only" />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Select — readOnly (no native equivalent — disabled shown)
        </Text>
        <Select options={options} defaultValue={options[0]} isDisabled />
      </Box>
    </Stack>
  );
};
