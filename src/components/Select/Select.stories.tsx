import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Badge, Box, Flex, Stack, Text } from '@chakra-ui/react';

import { createListCollection } from './index';
import { SelectTrigger } from './SelectTrigger';
import { SelectContent } from './SelectContent';
import { SelectItem } from './SelectItem';
import { Select } from './index';

const meta: Meta = {
  title: 'Components/Select',
};

export default meta;

// ── Shared collections ──

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
});

const animals = createListCollection({
  items: [
    { label: 'Red Panda', value: 'red-panda' },
    { label: 'Cat', value: 'cat', disabled: true },
    { label: 'Dog', value: 'dog' },
    { label: 'Aardvark', value: 'aardvark', disabled: true },
    { label: 'Kangaroo', value: 'kangaroo' },
    { label: 'Snake', value: 'snake' },
  ],
});

// ── Stories ──

/**
 * Basic single select — simplest usage.
 */
export const Basic: StoryFn = () => (
  <Select.Root collection={frameworks} size="sm" width="320px">
    <SelectTrigger>
      <Select.ValueText placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      {frameworks.items.map(item => (
        <SelectItem key={item.value} item={item}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select.Root>
);

/**
 * Controlled value with state management.
 */
export const Controlled: StoryFn = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Stack gap={4}>
      <Text>Selected: {value.length > 0 ? value.join(', ') : 'None'}</Text>
      <Select.Root
        collection={frameworks}
        value={value}
        onValueChange={e => setValue(e.value)}
        size="sm"
        width="320px"
      >
        <SelectTrigger>
          <Select.ValueText placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map(item => (
            <SelectItem key={item.value} item={item}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select.Root>
    </Stack>
  );
};

/**
 * Multi-select — select multiple items.
 */
export const Multiple: StoryFn = () => (
  <Select.Root
    multiple
    collection={frameworks}
    size="sm"
    width="320px"
  >
    <SelectTrigger>
      <Select.ValueText placeholder="Select frameworks" />
    </SelectTrigger>
    <SelectContent>
      {frameworks.items.map(item => (
        <SelectItem key={item.value} item={item}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select.Root>
);

/**
 * Disabled options — some items cannot be selected.
 */
export const DisabledOptions: StoryFn = () => (
  <Select.Root collection={animals} size="sm" width="320px">
    <SelectTrigger>
      <Select.ValueText placeholder="Select animal" />
    </SelectTrigger>
    <SelectContent>
      {animals.items.map(item => (
        <SelectItem key={item.value} item={item}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select.Root>
);

/**
 * Disabled select — entire select is non-interactive.
 */
export const Disabled: StoryFn = () => (
  <Select.Root
    disabled
    collection={frameworks}
    size="sm"
    width="320px"
    defaultValue={['react']}
  >
    <SelectTrigger>
      <Select.ValueText placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      {frameworks.items.map(item => (
        <SelectItem key={item.value} item={item}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select.Root>
);

/**
 * Invalid state — for form validation errors.
 */
export const Invalid: StoryFn = () => (
  <Select.Root
    invalid
    collection={frameworks}
    size="sm"
    width="320px"
  >
    <SelectTrigger>
      <Select.ValueText placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      {frameworks.items.map(item => (
        <SelectItem key={item.value} item={item}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select.Root>
);

/**
 * Sizes — xs, sm, md, lg variants.
 */
export const Sizes: StoryFn = () => (
  <Stack gap={5} width="320px">
    {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
      <Select.Root key={size} size={size} collection={frameworks}>
        <Select.Label>size = {size}</Select.Label>
        <SelectTrigger>
          <Select.ValueText placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map(item => (
            <SelectItem key={item.value} item={item}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select.Root>
    ))}
  </Stack>
);

/**
 * Clearable — show a clear button when value is selected.
 */
export const Clearable: StoryFn = () => (
  <Select.Root
    collection={frameworks}
    size="sm"
    width="320px"
    defaultValue={['react']}
  >
    <SelectTrigger clearable>
      <Select.ValueText placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      {frameworks.items.map(item => (
        <SelectItem key={item.value} item={item}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select.Root>
);

/**
 * Grouped options — items organized by category.
 */
export const GroupedOptions: StoryFn = () => {
  const groups = [
    {
      label: 'Frontend',
      items: [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
      ],
    },
    {
      label: 'Backend',
      items: [
        { label: 'Express', value: 'express' },
        { label: 'Fastify', value: 'fastify' },
        { label: 'NestJS', value: 'nestjs' },
      ],
    },
  ];

  const allItems = groups.flatMap(g => g.items);
  const collection = createListCollection({ items: allItems });

  return (
    <Select.Root collection={collection} size="sm" width="320px">
      <SelectTrigger>
        <Select.ValueText placeholder="Select framework" />
      </SelectTrigger>
      <SelectContent>
        {groups.map(group => (
          <Select.ItemGroup key={group.label}>
            <Select.ItemGroupLabel>
              {group.label}
            </Select.ItemGroupLabel>
            {group.items.map(item => (
              <SelectItem key={item.value} item={item}>
                {item.label}
              </SelectItem>
            ))}
          </Select.ItemGroup>
        ))}
      </SelectContent>
    </Select.Root>
  );
};

/**
 * Custom item rendering — render rich content inside each option.
 */
export const CustomItemRendering: StoryFn = () => {
  const models = createListCollection({
    items: [
      { label: 'GPT-4o', value: 'gpt4o', platform: 'OpenAI', tier: 'high' },
      {
        label: 'GPT-4o mini',
        value: 'gpt4o-mini',
        platform: 'OpenAI',
        tier: 'low',
      },
      {
        label: 'Claude Sonnet',
        value: 'sonnet',
        platform: 'Anthropic',
        tier: 'high',
      },
      {
        label: 'Claude Haiku',
        value: 'haiku',
        platform: 'Anthropic',
        tier: 'low',
      },
    ],
    itemToString: item => item.label,
    itemToValue: item => item.value,
  });

  return (
    <Select.Root collection={models} size="sm" width="360px">
      <SelectTrigger>
        <Select.ValueText placeholder="Select model" />
      </SelectTrigger>
      <SelectContent>
        {models.items.map(item => (
          <SelectItem key={item.value} item={item}>
            <Flex align="center" gap={2} flex={1}>
              <Text>{item.label}</Text>
              <Badge
                colorPalette={item.tier === 'high' ? 'blue' : 'gray'}
                size="sm"
              >
                {item.platform}
              </Badge>
            </Flex>
          </SelectItem>
        ))}
      </SelectContent>
    </Select.Root>
  );
};

/**
 * Custom value display — customize how the selected value appears.
 */
export const CustomValueDisplay: StoryFn = () => {
  interface StatusOption {
    label: string;
    value: string;
    color: string;
  }

  const statuses = createListCollection<StatusOption>({
    items: [
      { label: 'Active', value: 'active', color: 'green' },
      { label: 'Pending', value: 'pending', color: 'yellow' },
      { label: 'Inactive', value: 'inactive', color: 'red' },
    ],
  });

  return (
    <Select.Root
      collection={statuses}
      size="sm"
      width="240px"
      defaultValue={['active']}
    >
      <SelectTrigger>
        <Select.ValueText placeholder="Select status">
          <Select.Context>
            {select => {
              const items = select.selectedItems as StatusOption[];
              if (items.length === 0) return 'Select status';
              const item = items[0];
              return (
                <Flex align="center" gap={2}>
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg={`${item.color}.500`}
                  />
                  {item.label}
                </Flex>
              );
            }}
          </Select.Context>
        </Select.ValueText>
      </SelectTrigger>
      <SelectContent>
        {statuses.items.map(item => (
          <SelectItem key={item.value} item={item}>
            <Flex align="center" gap={2}>
              <Box
                w="8px"
                h="8px"
                borderRadius="full"
                bg={`${item.color}.500`}
              />
              {item.label}
            </Flex>
          </SelectItem>
        ))}
      </SelectContent>
    </Select.Root>
  );
};

/**
 * With label and form integration.
 */
export const WithLabel: StoryFn = () => (
  <Select.Root collection={frameworks} size="sm" width="320px">
    <Select.HiddenSelect name="framework" />
    <Select.Label>Framework</Select.Label>
    <SelectTrigger>
      <Select.ValueText placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      {frameworks.items.map(item => (
        <SelectItem key={item.value} item={item}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select.Root>
);

/**
 * Many options — demonstrates scrollable dropdown.
 */
export const ManyOptions: StoryFn = () => {
  const countries = createListCollection({
    items: Array.from({ length: 50 }, (_, i) => ({
      label: `Country ${i + 1}`,
      value: `country-${i + 1}`,
    })),
  });

  return (
    <Select.Root collection={countries} size="sm" width="320px">
      <SelectTrigger>
        <Select.ValueText placeholder="Select country" />
      </SelectTrigger>
      <SelectContent maxH="240px" overflowY="auto">
        {countries.items.map(item => (
          <SelectItem key={item.value} item={item}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select.Root>
  );
};
