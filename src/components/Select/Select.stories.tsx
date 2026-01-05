import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

import { Select } from '.';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Disabled', value: 'option4', isDisabled: true },
    ],
    defaultValue: { label: 'Option 1', value: 'option1' },
  },
  argTypes: {
    isMulti: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {};

export const Multiselect: Story = {
  args: {
    isMulti: true,
  },
};

export const Combobox: Story = {
  args: {
    isMulti: true,
    isSearchable: true,
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 100 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option${i + 1}`,
    })),
  },
};

export const WithValueDisplay = () => {
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>({ label: 'Option 1', value: 'option1' });

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
  ];

  return (
    <Box>
      <Select
        options={options}
        value={selectedOption}
        onChange={(newValue) => setSelectedOption(newValue)}
      />
      <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
        <Text fontWeight="semibold" mb={2}>
          Selected Value:
        </Text>
        <Text color="primary.dark" fontWeight="bold">
          {selectedOption
            ? `${selectedOption.label} (${selectedOption.value})`
            : 'None selected'}
        </Text>
      </Box>
    </Box>
  );
};
