import { useState } from 'react';
import { Box, createListCollection, Portal, Stack } from '@chakra-ui/react';
import { Meta } from '@storybook/react';

import { Select } from './Select';
import { SelectField } from './SelectField';

const meta = {
  title: 'Components/Select',
} satisfies Meta;

export default meta;

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Disabled option', value: 'option4', disabled: true },
];

export const Basic = () => {
  const [value, setValue] = useState<string | null>('option1');

  return (
    <Box maxW="320px">
      <SelectField options={options} value={value} onChange={setValue} />
    </Box>
  );
};

export const Placeholder = () => (
  <Box maxW="320px">
    <SelectField options={options} placeholder="Select an option" />
  </Box>
);

export const WithLabel = () => (
  <Box maxW="320px">
    <SelectField
      label="Favorite option"
      options={options}
      placeholder="Choose one"
    />
  </Box>
);

export const Sizes = () => (
  <Stack maxW="320px" gap={4}>
    {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
      <SelectField
        key={size}
        size={size}
        options={options}
        placeholder={`Size: ${size}`}
      />
    ))}
  </Stack>
);

export const Invalid = () => (
  <Box maxW="320px">
    <SelectField options={options} placeholder="Invalid select" invalid />
  </Box>
);

export const Disabled = () => (
  <Box maxW="320px">
    <SelectField options={options} defaultValue="option1" disabled />
  </Box>
);

export const ManyOptions = () => {
  const manyOptions = Array.from({ length: 100 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `option${i + 1}`,
  }));

  return (
    <Box maxW="320px">
      <SelectField options={manyOptions} placeholder="100 options" />
    </Box>
  );
};

const frameworkCollection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
  ],
});

/**
 * Multi-select composed directly from the `Select` primitives — the styling
 * is identical to `SelectField` since both consume the same parts.
 */
export const MultiSelect = () => (
  <Box maxW="320px">
    <Select.Root multiple collection={frameworkCollection}>
      <Select.HiddenSelect />
      <Select.Label>Frameworks</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select frameworks" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworkCollection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  </Box>
);
