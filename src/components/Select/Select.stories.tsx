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

export const CustomWidth: Story = {
  render: () => {
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];

    return (
      <Box>
        <Text mb={2} fontWeight="semibold">
          Width: 200px
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={{
            container: (base) => ({
              ...base,
              width: 200,
            }),
          }}
        />

        <Text mb={2} mt={6} fontWeight="semibold">
          Width: 300px
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={{
            container: (base) => ({
              ...base,
              width: 300,
            }),
          }}
        />

        <Text mb={2} mt={6} fontWeight="semibold">
          Width: 400px
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={{
            container: (base) => ({
              ...base,
              width: 400,
            }),
          }}
        />

        <Text mb={2} mt={6} fontWeight="semibold">
          Width: 50%
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={{
            container: (base) => ({
              ...base,
              width: '50%',
            }),
          }}
        />
      </Box>
    );
  },
};

export const CustomHeight: Story = {
  render: () => {
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];

    return (
      <Box>
        <Text mb={2} fontWeight="semibold">
          Height: 32px (Compact)
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: '32px',
              height: '32px',
            }),
            valueContainer: (base) => ({
              ...base,
              height: '32px',
              padding: '0 8px',
            }),
            input: (base) => ({
              ...base,
              margin: '0px',
            }),
            indicatorsContainer: (base) => ({
              ...base,
              height: '32px',
            }),
          }}
        />

        <Text mb={2} mt={6} fontWeight="semibold">
          Height: 48px (Default)
        </Text>
        <Select options={options} defaultValue={options[0]} />

        <Text mb={2} mt={6} fontWeight="semibold">
          Height: 64px (Large)
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: '64px',
              height: '64px',
            }),
            valueContainer: (base) => ({
              ...base,
              height: '64px',
              padding: '0 16px',
            }),
            input: (base) => ({
              ...base,
              margin: '0px',
            }),
            indicatorsContainer: (base) => ({
              ...base,
              height: '64px',
            }),
          }}
        />
      </Box>
    );
  },
};

export const CustomFontSize: Story = {
  render: () => {
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];

    return (
      <Box>
        <Text mb={2} fontWeight="semibold">
          Font Size: 12px (Small)
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={{
            control: (base) => ({
              ...base,
              fontSize: '12px',
            }),
            menu: (base) => ({
              ...base,
              fontSize: '12px',
            }),
            option: (base) => ({
              ...base,
              fontSize: '12px',
            }),
          }}
        />

        <Text mb={2} mt={6} fontWeight="semibold">
          Font Size: 14px (Default)
        </Text>
        <Select options={options} defaultValue={options[0]} />

        <Text mb={2} mt={6} fontWeight="semibold">
          Font Size: 18px (Large)
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={{
            control: (base) => ({
              ...base,
              fontSize: '18px',
            }),
            menu: (base) => ({
              ...base,
              fontSize: '18px',
            }),
            option: (base) => ({
              ...base,
              fontSize: '18px',
            }),
          }}
        />

        <Text mb={2} mt={6} fontWeight="semibold">
          Font Size: 24px (Extra Large)
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={{
            control: (base) => ({
              ...base,
              fontSize: '24px',
              minHeight: '56px',
            }),
            menu: (base) => ({
              ...base,
              fontSize: '24px',
            }),
            option: (base) => ({
              ...base,
              fontSize: '24px',
              padding: '12px',
            }),
            valueContainer: (base) => ({
              ...base,
              padding: '0 16px',
            }),
          }}
        />
      </Box>
    );
  },
};

export const FullyCustomized: Story = {
  render: () => {
    const options = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Date', value: 'date' },
    ];

    return (
      <Box>
        <Text mb={2} fontWeight="semibold">
          Compact Select with Custom Styling
        </Text>
        <Select
          options={options}
          defaultValue={options[0]}
          placeholder="Select a fruit..."
          styles={{
            container: (base) => ({
              ...base,
              width: '250px',
            }),
            control: (base) => ({
              ...base,
              minHeight: '36px',
              height: '36px',
              fontSize: '13px',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa',
            }),
            valueContainer: (base) => ({
              ...base,
              height: '36px',
              padding: '0 12px',
            }),
            input: (base) => ({
              ...base,
              margin: '0px',
            }),
            indicatorsContainer: (base) => ({
              ...base,
              height: '36px',
            }),
            menu: (base) => ({
              ...base,
              fontSize: '13px',
              borderRadius: '8px',
              marginTop: '4px',
            }),
            option: (base) => ({
              ...base,
              fontSize: '13px',
              padding: '8px 12px',
            }),
          }}
        />

        <Text mb={2} mt={8} fontWeight="semibold">
          Large Select with Bold Typography
        </Text>
        <Select
          options={options}
          defaultValue={options[1]}
          styles={{
            container: (base) => ({
              ...base,
              width: '100%',
            }),
            control: (base) => ({
              ...base,
              minHeight: '60px',
              height: '60px',
              fontSize: '20px',
              fontWeight: '600',
              borderRadius: '12px',
              borderWidth: '2px',
            }),
            valueContainer: (base) => ({
              ...base,
              height: '60px',
              padding: '0 20px',
            }),
            input: (base) => ({
              ...base,
              margin: '0px',
              fontWeight: '600',
            }),
            indicatorsContainer: (base) => ({
              ...base,
              height: '60px',
            }),
            menu: (base) => ({
              ...base,
              fontSize: '18px',
              borderRadius: '12px',
              marginTop: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }),
            option: (base) => ({
              ...base,
              fontSize: '18px',
              fontWeight: '500',
              padding: '14px 20px',
            }),
          }}
        />
      </Box>
    );
  },
};
