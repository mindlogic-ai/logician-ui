import { useState } from 'react';
import {
  Box,
  createListCollection,
  Flex,
  HStack,
  Portal,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Badge } from '../Badge';
import { Radio, RadioGroup } from '../Radio';
import { IoCall, IoChatbubbleEllipses, IoIosMail } from '../Icon';
import { ComboboxField } from './ComboboxField';
import { Select } from './Select';
import {
  contentStyles,
  indicatorStyles,
  itemStyles,
  selectClearTriggerStyles,
  triggerStyles,
} from './Select.styles';
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

/**
 * `variant="ghost"` — no resting border, sized to its content. For dense
 * settings rows where a column of bordered triggers outweighs the card.
 * Hover shows the control border.
 */
export const Ghost = () => {
  const rows = [
    ['크레딧 한도 변경', '관리자가 내 크레딧 한도를 바꾸면 알려드립니다.'],
    ['크레딧 잔량 부족', '내 크레딧이 얼마 남지 않으면 알려드립니다.'],
    ['결제 실패', '결제에 실패하거나 자동으로 환불되면 알려드립니다.'],
  ];
  const channelOptions = [
    { label: '앱 알림', value: 'app' },
    { label: '앱 알림 + 이메일', value: 'app_email' },
    { label: '끄기', value: 'off' },
  ];
  return (
    <Box
      maxW="640px"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="12px"
    >
      {rows.map(([title, description], index) => (
        <Flex
          key={title}
          align="center"
          justify="space-between"
          gap={4}
          px={4}
          py={3}
          borderTopWidth={index === 0 ? 0 : '1px'}
          borderColor="border.subtle"
        >
          <Box>
            <Text fontWeight="semibold">{title}</Text>
            <Text color="fg.muted" fontSize="sm">
              {description}
            </Text>
          </Box>
          <SelectField
            variant="ghost"
            size="sm"
            ariaLabel={title}
            options={channelOptions}
            defaultValue="app"
          />
        </Flex>
      ))}
    </Box>
  );
};

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

/**
 * An optional field the member can empty again. `ClearTrigger` goes before
 * the chevron and shows only while something is selected. It draws its own
 * icon and is named 「선택 지우기」 in the provider's language; pass
 * `aria-label` to say what is cleared. A divider separates it from the
 * chevron, and a long value ends in an ellipsis before it. On a touch screen
 * its hit area widens to 44px toward the value, at the field's own height.
 */
const longValueCollection = createListCollection({
  items: [
    {
      label: 'Engineering / Platform / Developer Experience',
      value: 'dx',
    },
    { label: 'Design', value: 'design' },
  ],
});

export const Clearable = () => (
  <Stack maxW="320px" gap={4}>
    <Box maxW="180px">
      <Select.Root collection={longValueCollection} defaultValue={['dx']}>
        <Select.HiddenSelect />
        <Select.Label>Team (180px)</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a team" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
      </Select.Root>
    </Box>
    {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
      <Select.Root
        key={size}
        size={size}
        collection={frameworkCollection}
        defaultValue={['react']}
      >
        <Select.HiddenSelect />
        <Select.Label>{`Framework (${size})`}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a framework" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger />
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
    ))}
  </Stack>
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
                  <Span fontSize="xs" color="fg.muted">
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
                        <Span color="fg.subtle" fontWeight="bold">
                          ∟
                        </Span>
                        <Select.ItemText>{item.label}</Select.ItemText>
                        {item.myGroup && (
                          <Badge variant="neutral">My group</Badge>
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
                <Span color="fg.muted">{selected.groupType}</Span>
                <Span color="fg.subtle">&gt;</Span>
                <Span color="fg.default" fontWeight="medium">
                  {selected.label}
                </Span>
              </HStack>
            ) : (
              <Span color="fg.subtle">Select a group</Span>
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
 *
 * factchat parity: `SelectedMultiGroup` (custom react-select `MultiValue`)
 * and the admin `ModelSelect`, which hides `MultiValueRemove` when only one
 * model remains selected.
 */
export const MultiSelectCustomTags = () => {
  const [value, setValue] = useState<string[]>(['ts', 'react']);

  return (
    <Box maxW="360px">
      <Select.Root
        multiple
        collection={skillsCollection}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <Select.HiddenSelect />
        <Select.Label>Skills</Select.Label>
        <Select.Control>
          <Select.Trigger>
            {value.length === 0 ? (
              <Span color="fg.subtle">Select skills</Span>
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
                      bg="primary.selected"
                      color="fg.default"
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
    borderColor="border.default"
    borderRadius="8px"
    p={3}
  >
    <Stack gap={3}>
      <Span fontSize="sm" color="fg.muted">
        Scrollable container — open the select, it escapes the clip.
      </Span>
      <SelectField options={options} placeholder="Select an option" />
      <Span fontSize="sm" color="fg.muted">
        More rows below…
      </Span>
      <Span fontSize="sm" color="fg.muted">
        …to force the container to scroll.
      </Span>
      <Span fontSize="sm" color="fg.muted">
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
          <Select.Content css={{ bg: 'bg.subtle' }}>
            {frameworkCollection.items.map((item) => (
              <Select.Item
                item={item}
                key={item.value}
                css={{ _highlighted: { bg: 'primary.wash' } }}
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
 * `Select.Root`'s `onOpenChange` drives an external panel — the menu open
 * state is observable without lifting selection state.
 *
 * factchat parity: `LlmModelSelect`, which used react-select's
 * `onMenuOpen` / `onMenuClose` to reveal a model details panel next to the
 * control while the dropdown is open.
 */
export const WithOpenChange = () => {
  const [open, setOpen] = useState(false);

  return (
    <HStack align="flex-start" gap={4}>
      <Box w="280px">
        <Select.Root
          collection={planCollection}
          onOpenChange={(details) => setOpen(details.open)}
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
      {open && (
        <Box
          w="220px"
          p={3}
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="8px"
          bg="bg.subtle"
        >
          <Span fontSize="sm" color="fg.muted">
            Side panel — visible only while the dropdown is open, the same way
            `LlmModelSelect` reveals its model details panel.
          </Span>
        </Box>
      )}
    </HStack>
  );
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Select.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

type UsageStory = StoryObj;

const LANGUAGES = [
  { label: '한국어', value: 'ko' },
  { label: 'English', value: 'en' },
  { label: '日本語', value: 'ja' },
];

const GROUPS = [
  '경영지원팀',
  '고객성공팀',
  '데이터팀',
  '디자인팀',
  '마케팅팀',
  '백엔드팀',
  '법무팀',
  '보안팀',
  '사업개발팀',
  '세일즈팀',
  '인사팀',
  '재무팀',
  '프론트엔드팀',
].map((name) => ({ label: name, value: name }));

export const DoLabelled: UsageStory = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a visible label',
  render: () => (
    <Box maxW="320px">
      <SelectField label="답변 언어" options={LANGUAGES} defaultValue="ko" />
    </Box>
  ),
};

export const DontNameless: UsageStory = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: no label, ariaLabel or placeholder",
  render: () => (
    <Flex maxW="480px" align="center" justify="space-between" gap={4}>
      <Text fontWeight="semibold">답변 언어</Text>
      <Box w="180px">
        <SelectField options={LANGUAGES} defaultValue="ko" />
      </Box>
    </Flex>
  ),
};

export const DoComboboxForLongList: UsageStory = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: ComboboxField for a long list',
  render: () => (
    <Box maxW="320px">
      <ComboboxField
        label="그룹"
        placeholder="그룹 이름으로 찾기"
        options={GROUPS}
        emptyText="일치하는 그룹이 없습니다"
      />
    </Box>
  ),
};

export const DontSelectForTwo: UsageStory = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a dropdown for two options",
  render: () => (
    <Box maxW="320px">
      <SelectField
        label="공개 범위"
        options={[
          { label: '전체 공개', value: 'public' },
          { label: '그룹만', value: 'group' },
        ]}
        defaultValue="public"
      />
    </Box>
  ),
};

export const DoRadioForTwo: UsageStory = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: Radio for two visible options',
  render: () => (
    <Stack gap={2} maxW="320px">
      <Text id="usage-visibility" fontWeight="semibold">
        공개 범위
      </Text>
      <RadioGroup
        defaultValue="public"
        aria-labelledby="usage-visibility"
        display="flex"
        gap={4}
      >
        <Radio value="public">
          <Radio.Control />
          <Radio.Text>전체 공개</Radio.Text>
        </Radio>
        <Radio value="group">
          <Radio.Control />
          <Radio.Text>그룹만</Radio.Text>
        </Radio>
      </RadioGroup>
    </Stack>
  ),
};

/**
 * Tokens the trigger, list and options read, taken from the style objects in
 * `Select.styles.ts` (shared by Select and Combobox).
 */
export const UsageTokens: UsageStory = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: triggerStyles.bg,
          use: <T en="Trigger background" ko="트리거 배경" />,
        },
        {
          token: triggerStyles.color,
          use: <T en="Selected value" ko="선택한 값" />,
        },
        {
          token: triggerStyles.borderColor,
          use: <T en="Trigger border at rest" ko="트리거 평소 테두리" />,
        },
        {
          token: triggerStyles._hover.borderColor,
          use: <T en="Border on hover" ko="마우스를 올렸을 때 테두리" />,
        },
        {
          token: triggerStyles._focus.borderColor,
          use: (
            <T
              en="Border and ring on focus or open"
              ko="초점을 받거나 열렸을 때 테두리와 링"
            />
          ),
        },
        {
          token: triggerStyles._invalid.borderColor,
          use: <T en="Border when invalid" ko="오류 상태 테두리" />,
        },
        {
          token: triggerStyles._disabled.bg,
          use: <T en="Disabled background" ko="비활성 배경" />,
        },
        {
          token: triggerStyles._disabled.color,
          use: <T en="Disabled text" ko="비활성 글자" />,
        },
        {
          token: indicatorStyles.color,
          use: <T en="Chevron" ko="펼침 화살표" />,
        },
        {
          token: selectClearTriggerStyles.color,
          use: <T en="Clear (×) button" ko="선택 지우기(×) 버튼" />,
        },
        {
          token: selectClearTriggerStyles._hover.color,
          use: (
            <T en="Clear button on hover" ko="마우스를 올렸을 때 지우기 버튼" />
          ),
        },
        {
          token: contentStyles.bg,
          use: <T en="List background" ko="목록 배경" />,
        },
        {
          token: contentStyles.borderColor,
          use: <T en="List border" ko="목록 테두리" />,
        },
        {
          token: itemStyles._highlighted.bg,
          use: (
            <T
              en="Option under the pointer or keyboard"
              ko="포인터나 키보드가 가리키는 항목"
            />
          ),
        },
        {
          token: itemStyles._checked.bg,
          use: <T en="Selected option" ko="선택된 항목" />,
        },
        {
          token: itemStyles._disabled.color,
          use: <T en="Disabled option" ko="선택할 수 없는 항목" />,
        },
      ]}
    />
  ),
};
