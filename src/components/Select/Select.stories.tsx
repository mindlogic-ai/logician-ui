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

import { Badge } from '../Badge';
import { IoCall, IoChatbubbleEllipses, IoClose, IoIosMail } from '../Icon';
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

/* -------------------------------------------------------------------------
 * factchat parity
 *
 * factchat still consumes the previous `react-select`-based `Select`. The
 * stories below recreate every custom-UI usage found there with the new
 * compound primitives, so the upcoming update can be visually verified to
 * cover them. Each story names the factchat component it maps to.
 * ---------------------------------------------------------------------- */

const groupTreeCollection = createListCollection({
  items: [
    { label: 'Engineering', value: 'eng', section: 'Department' },
    { label: 'Design', value: 'design', section: 'Department', myGroup: true },
    { label: 'Seoul Office', value: 'seoul', section: 'Location' },
    {
      label: 'Remote (archived)',
      value: 'remote',
      section: 'Location',
      disabled: true,
    },
  ],
  isItemDisabled: (item) => Boolean(item.disabled),
});

const groupTreeSections = ['Department', 'Location'];

/**
 * Tree-style options: non-selectable section headers, indented child rows,
 * an inline `Badge`, and a disabled row.
 *
 * factchat parity: `HierarchicalGroupSelect` (`HierarchicalOption`) and the
 * admin `ModelSelect` (`ModelSelectOption`) — both render group/platform
 * header rows above indented child options via a react-select custom
 * `Option` component.
 */
export const HierarchicalOptions = () => (
  <Box maxW="320px">
    <Select.Root collection={groupTreeCollection}>
      <Select.HiddenSelect />
      <Select.Label>Member group</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a group" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {groupTreeSections.map((section) => (
              <Select.ItemGroup key={section}>
                <Select.ItemGroupLabel>{section}</Select.ItemGroupLabel>
                {groupTreeCollection.items
                  .filter((item) => item.section === section)
                  .map((item) => (
                    <Select.Item item={item} key={item.value}>
                      <HStack gap={1}>
                        <Span color="gray.500" fontWeight="bold">
                          ∟
                        </Span>
                        <Select.ItemText>{item.label}</Select.ItemText>
                        {item.myGroup && (
                          <Badge variant="primary">My group</Badge>
                        )}
                      </HStack>
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

const memberCollection = createListCollection({
  items: [
    { label: 'Engineering', value: 'eng', groupType: 'Department' },
    { label: 'Design', value: 'design', groupType: 'Department' },
    { label: 'Seoul Office', value: 'seoul', groupType: 'Location' },
  ],
});

/**
 * Custom collapsed trigger value — render the selected option however you
 * like instead of the plain `Select.ValueText`. Here the value is looked up
 * from a controlled `value`, so no `Select.ValueText` is used in the trigger.
 *
 * factchat parity: `SelectedSingleGroup` ("GroupType > Label") and
 * `ChatbotSelectValue` (model name + badge + warning) — both replace the
 * react-select `SingleValue` component.
 */
export const CustomTriggerValue = () => {
  const [value, setValue] = useState<string[]>(['design']);
  const selected = memberCollection.items.find(
    (item) => item.value === value[0]
  );

  return (
    <Box maxW="320px">
      <Select.Root
        collection={memberCollection}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <Select.HiddenSelect />
        <Select.Label>Member group</Select.Label>
        <Select.Control>
          <Select.Trigger>
            {selected ? (
              <HStack gap={1}>
                <Span color="gray.600">{selected.groupType}</Span>
                <Span color="gray.500">&gt;</Span>
                <Span color="gray.1200" fontWeight="medium">
                  {selected.label}
                </Span>
              </HStack>
            ) : (
              <Span color="gray.500">Select a group</Span>
            )}
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {memberCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  <Select.ItemText>
                    {item.groupType} &gt; {item.label}
                  </Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  );
};

const skillsCollection = createListCollection({
  items: [
    { label: 'TypeScript', value: 'ts' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'node' },
    { label: 'GraphQL', value: 'graphql' },
  ],
});

/**
 * Multi-select rendering the selected options as custom tags inside the
 * trigger, with a remove "×" that disappears once a single tag is left.
 * `closeOnSelect={false}` keeps the dropdown open across multiple picks.
 *
 * factchat parity: `SelectedMultiGroup` (custom react-select `MultiValue`)
 * and the admin `ModelSelect` / audit-log `MultiSelectWidget` — multi-pick
 * keeps the menu open and `MultiValueRemove` is hidden at one selection.
 */
export const MultiSelectCustomTags = () => {
  const [value, setValue] = useState<string[]>(['ts', 'react']);

  return (
    <Box maxW="360px">
      <Select.Root
        multiple
        closeOnSelect={false}
        collection={skillsCollection}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <Select.HiddenSelect />
        <Select.Label>Skills</Select.Label>
        <Select.Control>
          <Select.Trigger>
            {value.length === 0 ? (
              <Span color="gray.500">Select skills</Span>
            ) : (
              <HStack gap={1} flexWrap="wrap">
                {value.map((val) => {
                  const item = skillsCollection.items.find(
                    (option) => option.value === val
                  );
                  if (!item) return null;
                  return (
                    <HStack
                      key={val}
                      gap={1}
                      bg="primary.extralight"
                      color="primary.dark"
                      borderRadius="4px"
                      px={2}
                      py={0.5}
                      fontSize="sm"
                    >
                      <Span>{item.label}</Span>
                      {value.length > 1 && (
                        <Span
                          cursor="pointer"
                          fontWeight="bold"
                          onPointerDown={(event) => event.stopPropagation()}
                          onClick={(event) => {
                            event.stopPropagation();
                            setValue(value.filter((v) => v !== val));
                          }}
                        >
                          ×
                        </Span>
                      )}
                    </HStack>
                  );
                })}
              </HStack>
            )}
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {skillsCollection.items.map((item) => (
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
};

interface InquiryCategory {
  id: number;
  name: string;
}

const inquiryCategories: InquiryCategory[] = [
  { id: 101, name: 'Billing' },
  { id: 102, name: 'Technical issue' },
  { id: 103, name: 'Feature request' },
];

const inquiryCategoryCollection = createListCollection({
  items: inquiryCategories,
  itemToValue: (item) => String(item.id),
  itemToString: (item) => item.name,
});

/**
 * Options sourced from domain objects with no `label` / `value` fields.
 * `createListCollection`'s `itemToValue` / `itemToString` map them — the
 * role `getOptionLabel` / `getOptionValue` played in react-select.
 *
 * factchat parity: `InquiryModal`, which feeds `InquiryCategory`
 * (`{ id, name }`) straight into Select.
 */
export const DomainObjectOptions = () => (
  <Box maxW="320px">
    <Select.Root collection={inquiryCategoryCollection}>
      <Select.HiddenSelect />
      <Select.Label>Category</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a category" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {inquiryCategoryCollection.items.map((item) => (
              <Select.Item item={item} key={item.id}>
                <Select.ItemText>{item.name}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  </Box>
);

/**
 * Select inside an `overflow: auto` container (e.g. a scrollable table
 * row). `Select.Content` renders through a `Portal`, so the dropdown is
 * never clipped by — or scrolled away with — the container.
 *
 * factchat parity: `AdminInquiryTableRow`, which had to set
 * `menuPortalTarget` / `menuPosition="fixed"` / `zIndex: 9999` on
 * react-select to escape the table's overflow.
 */
export const InsideScrollableContainer = () => (
  <Box
    maxW="360px"
    maxH="140px"
    overflow="auto"
    borderWidth="1px"
    borderColor="gray.300"
    borderRadius="8px"
    p={3}
  >
    <Stack gap={3}>
      <Span fontSize="sm" color="gray.600">
        Scrollable container — open the select, it escapes the clip.
      </Span>
      <SelectField options={options} placeholder="Select an option" />
      <Span fontSize="sm" color="gray.600">
        More rows below…
      </Span>
      <Span fontSize="sm" color="gray.600">
        …to force the container to scroll.
      </Span>
      <Span fontSize="sm" color="gray.600">
        …and a little more.
      </Span>
    </Stack>
  </Box>
);

/**
 * Per-part style overrides via the `css` prop. Every visual part of the
 * `Select` namespace (`Trigger`, `Content`, `Item`, `Indicator`) merges a
 * caller `css` on top of the design-system defaults.
 *
 * factchat parity: `HierarchicalGroupSelect` / `ModelSelect`, which passed
 * a react-select `styles` callback to restyle the control, the menu and
 * the options.
 */
export const StyledParts = () => (
  <Box maxW="320px">
    <Select.Root collection={frameworkCollection}>
      <Select.HiddenSelect />
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger css={{ borderRadius: '999px' }}>
          <Select.ValueText placeholder="Pill-shaped trigger" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator css={{ color: 'primary.main' }} />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content css={{ bg: 'gray.50' }}>
            {frameworkCollection.items.map((item) => (
              <Select.Item
                item={item}
                key={item.value}
                css={{ _highlighted: { bg: 'primary.extralight' } }}
              >
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

/**
 * `Select.Root`'s `onOpenChange` reveals an external panel while the menu
 * is open, and per-item `onMouseEnter` / `onMouseLeave` let the panel track
 * the hovered option — selection state never has to be lifted.
 *
 * factchat parity: `LlmModelSelect`, which used react-select's
 * `onMenuOpen` / `onMenuClose` plus a hover-tracking `Option` to reveal a
 * model details panel next to the control.
 */
export const WithOpenChange = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<
    (typeof planCollection.items)[number] | null
  >(null);

  return (
    <HStack align="flex-start" gap={4}>
      <Box w="280px">
        <Select.Root
          collection={planCollection}
          onOpenChange={(details) => {
            setOpen(details.open);
            if (!details.open) setHovered(null);
          }}
        >
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
                  <Select.Item
                    item={item}
                    key={item.value}
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>
      {open && (
        <Box
          w="220px"
          p={3}
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="8px"
          bg="gray.50"
        >
          {hovered ? (
            <Stack gap={1}>
              <Span fontWeight="medium" color="gray.1200">
                {hovered.label}
              </Span>
              <Span fontSize="sm" color="gray.600">
                {hovered.description}
              </Span>
            </Stack>
          ) : (
            <Span fontSize="sm" color="gray.600">
              Hover an option — the panel tracks it, the same way
              `LlmModelSelect` reveals its model details panel.
            </Span>
          )}
        </Box>
      )}
    </HStack>
  );
};

/**
 * A clearable select — `Select.ClearTrigger` renders a reset control in the
 * indicator group that returns the field to its empty state. Use it where a
 * "no selection" state is meaningful.
 *
 * factchat parity: `ResourceCategorySelect`, where a resource's category is
 * optional and must be resettable to "none".
 */
export const ClearableSelect = () => (
  <Box maxW="320px">
    <Select.Root collection={frameworkCollection} defaultValue={['react']}>
      <Select.HiddenSelect />
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a framework" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger>
            <IoClose />
          </Select.ClearTrigger>
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
