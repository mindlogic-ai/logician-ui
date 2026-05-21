import { useState } from 'react';
import {
  Box,
  createListCollection,
  HStack,
  Portal,
  Span,
  Stack,
} from '@chakra-ui/react';
import { Meta } from '@storybook/react';

import { IoCall, IoChatbubbleEllipses, IoIosMail } from '../Icon';
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

/* -------------------------------------------------------------------------
 * Custom children
 *
 * `SelectField` takes a flat `options` array; for richer option content
 * (icons, descriptions, groups) compose the `Select` primitives directly.
 * `Select.Item` accepts any children — keep `Select.ItemText` so the
 * trigger's `ValueText` and type-ahead still resolve the option label.
 * ---------------------------------------------------------------------- */

const contactCollection = createListCollection({
  items: [
    { label: 'Email', value: 'email', icon: <IoIosMail /> },
    { label: 'Phone call', value: 'phone', icon: <IoCall /> },
    { label: 'Live chat', value: 'chat', icon: <IoChatbubbleEllipses /> },
  ],
});

/** Options with a leading icon. */
export const OptionsWithIcons = () => (
  <Box maxW="320px">
    <Select.Root collection={contactCollection}>
      <Select.HiddenSelect />
      <Select.Label>Preferred contact</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a contact method" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {contactCollection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                <HStack gap={2}>
                  {item.icon}
                  <Select.ItemText>{item.label}</Select.ItemText>
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  </Box>
);

const planCollection = createListCollection({
  items: [
    {
      label: 'Starter',
      value: 'starter',
      description: 'Up to 1,000 messages / month',
    },
    {
      label: 'Growth',
      value: 'growth',
      description: 'Up to 50,000 messages / month',
    },
    { label: 'Scale', value: 'scale', description: 'Unlimited messages' },
  ],
});

/** Two-line options — a primary label with a muted description. */
export const OptionsWithDescription = () => (
  <Box maxW="360px">
    <Select.Root collection={planCollection}>
      <Select.HiddenSelect />
      <Select.Label>Plan</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a plan" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {planCollection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                <Stack gap={0}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Span fontSize="xs" color="gray.600">
                    {item.description}
                  </Span>
                </Stack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  </Box>
);

const techCollection = createListCollection({
  items: [
    { label: 'React', value: 'react', group: 'Frontend' },
    { label: 'Vue', value: 'vue', group: 'Frontend' },
    { label: 'Node.js', value: 'node', group: 'Backend' },
    { label: 'Django', value: 'django', group: 'Backend' },
  ],
});

const techGroups = ['Frontend', 'Backend'];

/** Grouped options using `Select.ItemGroup` and `Select.ItemGroupLabel`. */
export const GroupedOptions = () => (
  <Box maxW="320px">
    <Select.Root collection={techCollection}>
      <Select.HiddenSelect />
      <Select.Label>Technology</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a technology" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {techGroups.map((group) => (
              <Select.ItemGroup key={group}>
                <Select.ItemGroupLabel>{group}</Select.ItemGroupLabel>
                {techCollection.items
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <Select.Item item={item} key={item.value}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
              </Select.ItemGroup>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  </Box>
);
