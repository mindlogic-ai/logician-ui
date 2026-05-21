import { useState } from 'react';
import {
  Box,
  Portal,
  Span,
  Stack,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import { Meta } from '@storybook/react';

import { Combobox } from './Combobox';
import { ComboboxField } from './ComboboxField';

const meta = {
  title: 'Components/Combobox',
} satisfies Meta;

export default meta;

const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Strawberry', value: 'strawberry', disabled: true },
];

/**
 * Type to filter the option list. Clear text to see every option again,
 * type something with no match to see the empty state.
 */
export const Basic = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Box maxW="320px">
      <ComboboxField
        options={fruitOptions}
        value={value}
        onChange={setValue}
        placeholder="Search a fruit"
      />
    </Box>
  );
};

export const WithLabel = () => (
  <Box maxW="320px">
    <ComboboxField
      label="Favorite fruit"
      options={fruitOptions}
      placeholder="Search a fruit"
    />
  </Box>
);

export const Sizes = () => (
  <Stack maxW="320px" gap={4}>
    {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
      <ComboboxField
        key={size}
        size={size}
        options={fruitOptions}
        placeholder={`Size: ${size}`}
      />
    ))}
  </Stack>
);

export const Invalid = () => (
  <Box maxW="320px">
    <ComboboxField
      options={fruitOptions}
      placeholder="Invalid combobox"
      invalid
    />
  </Box>
);

export const Disabled = () => (
  <Box maxW="320px">
    <ComboboxField options={fruitOptions} defaultValue="apple" disabled />
  </Box>
);

export const CustomEmptyText = () => (
  <Box maxW="320px">
    <ComboboxField
      options={fruitOptions}
      placeholder="Type 'xyz' to see the empty state"
      emptyText="해당하는 항목이 없습니다"
    />
  </Box>
);

export const ManyOptions = () => {
  const manyOptions = Array.from({ length: 100 }, (_, i) => ({
    label: `Item ${i + 1}`,
    value: `item${i + 1}`,
  }));

  return (
    <Box maxW="320px">
      <ComboboxField options={manyOptions} placeholder="Search 100 items" />
    </Box>
  );
};

/* -------------------------------------------------------------------------
 * Custom children
 *
 * `ComboboxField` takes a flat `options` array; for richer option content
 * compose the `Combobox` primitives directly with `useListCollection` and
 * `useFilter`. Keep `Combobox.ItemText` so filtering and the selected
 * input value still resolve the option label.
 * ---------------------------------------------------------------------- */

const teamMembers = [
  { label: 'Alice Kim', value: 'alice', role: 'Product Designer' },
  { label: 'Brian Lee', value: 'brian', role: 'Frontend Engineer' },
  { label: 'Chloe Park', value: 'chloe', role: 'Backend Engineer' },
  { label: 'David Choi', value: 'david', role: 'Engineering Manager' },
];

/** Two-line options inside a filterable combobox. */
export const CustomItems = () => {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: teamMembers,
    filter: contains,
  });

  return (
    <Box maxW="320px">
      <Combobox.Root
        collection={collection}
        onInputValueChange={(details) => filter(details.inputValue)}
      >
        <Combobox.Label>Assignee</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input placeholder="Search team members" />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.Empty>No members found</Combobox.Empty>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value}>
                  <Stack gap={0}>
                    <Combobox.ItemText>{item.label}</Combobox.ItemText>
                    <Span fontSize="xs" color="gray.600">
                      {item.role}
                    </Span>
                  </Stack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </Box>
  );
};
