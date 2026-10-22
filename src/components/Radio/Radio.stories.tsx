import { Box, HStack, Stack, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Text } from '../Typography';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radio components allow users to select a single option from a set of mutually exclusive options. Use RadioGroup to manage a collection of related Radio components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The label text for the radio button',
    },
  },
  args: {
    value: 'option1',
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option1">
      <Radio {...args}>
        <Radio.Control />
        <Radio.Text>Radio option</Radio.Text>
      </Radio>
    </RadioGroup>
  ),
};

export const Checked: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option1">
      <Radio {...args} value="option1">
        <Radio.Control />
        <Radio.Text>Selected option</Radio.Text>
      </Radio>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup defaultValue="disabled-checked">
      <Stack gap={3}>
        <Radio {...args} value="disabled-unchecked" disabled>
          <Radio.Control />
          <Radio.Text>Disabled unchecked</Radio.Text>
        </Radio>
        <Radio {...args} value="disabled-checked" disabled>
          <Radio.Control />
          <Radio.Text>Disabled checked</Radio.Text>
        </Radio>
      </Stack>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap={4}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <RadioGroup key={size} size={size} defaultValue={size}>
          <Radio {...args} value={size}>
            <Radio.Control />
            <Radio.Text>{size.toUpperCase()} radio</Radio.Text>
          </Radio>
        </RadioGroup>
      ))}
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <RadioGroup defaultValue="checked">
      <Stack gap={3}>
        {[
          { value: 'default', label: 'Default state' },
          { value: 'checked', label: 'Checked state' },
          { value: 'disabled', label: 'Disabled state', disabled: true },
          {
            value: 'disabled-checked',
            label: 'Disabled checked state',
            disabled: true,
          },
        ].map(({ value, label, disabled }) => (
          <Radio key={value} {...args} value={value} disabled={disabled}>
            <Radio.Control />
            <Radio.Text>{label}</Radio.Text>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  ),
};

type RadioGroupStory = StoryObj<typeof RadioGroup>;

export const BasicGroup: RadioGroupStory = {
  render: () => {
    const [value, setValue] = useState<string>('option1');

    return (
      <VStack align="flex-start" gap={4}>
        <Box>Selected value: {value}</Box>
        <RadioGroup value={value} onValueChange={(e) => setValue(e.value)}>
          <Stack gap={3}>
            {['First option', 'Second option', 'Third option'].map(
              (label, i) => (
                <Radio key={`option${i + 1}`} value={`option${i + 1}`}>
                  <Radio.Control />
                  <Radio.Text>{label}</Radio.Text>
                </Radio>
              )
            )}
          </Stack>
        </RadioGroup>
      </VStack>
    );
  },
};

export const HorizontalGroup: RadioGroupStory = {
  render: () => {
    const [value, setValue] = useState<string>('email');

    return (
      <VStack align="flex-start" gap={4}>
        <Box>Preferred contact method: {value}</Box>
        <RadioGroup value={value} onValueChange={(e) => setValue(e.value)}>
          <HStack gap={6}>
            {[
              { value: 'email', label: 'Email' },
              { value: 'sms', label: 'SMS' },
              { value: 'phone', label: 'Phone call' },
            ].map(({ value, label }) => (
              <Radio key={value} value={value}>
                <Radio.Control />
                <Radio.Text>{label}</Radio.Text>
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
      </VStack>
    );
  },
};

export const WithLongLabels: RadioGroupStory = {
  render: () => {
    const [value, setValue] = useState<string>('option1');

    return (
      <Box maxW="400px">
        <RadioGroup value={value} onValueChange={(e) => setValue(e.value)}>
          <Stack gap={4}>
            <Radio value="option1">
              <Radio.Control />
              <Radio.Text>
                This is a very long label that demonstrates how radio buttons
                handle longer text content
              </Radio.Text>
            </Radio>
            <Radio value="option2">
              <Radio.Control />
              <Radio.Text>
                Another option with extended descriptive text that might wrap to
                multiple lines
              </Radio.Text>
            </Radio>
            <Radio value="option3">
              <Radio.Control />
              <Radio.Text>
                A third choice with substantial explanatory content
              </Radio.Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
    );
  },
};

export const FormExample: RadioGroupStory = {
  render: () => {
    const [notifications, setNotifications] = useState<string>('all');
    const [theme, setTheme] = useState<string>('light');

    return (
      <VStack align="flex-start" gap={6} maxW="300px">
        <Box>
          <Box fontWeight="semibold" mb={2}>
            Notification Preferences
          </Box>
          <RadioGroup
            value={notifications}
            onValueChange={(e) => setNotifications(e.value)}
          >
            <Stack gap={3}>
              {[
                { value: 'all', label: 'All notifications' },
                { value: 'important', label: 'Important only' },
                { value: 'none', label: 'No notifications' },
              ].map(({ value, label }) => (
                <Radio key={value} value={value}>
                  <Radio.Control />
                  <Radio.Text>{label}</Radio.Text>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>

        <Box>
          <Box fontWeight="semibold" mb={2}>
            Theme Preference
          </Box>
          <RadioGroup value={theme} onValueChange={(e) => setTheme(e.value)}>
            <HStack gap={4}>
              {[
                { value: 'light', label: 'Light theme' },
                { value: 'dark', label: 'Dark theme' },
                { value: 'auto', label: 'Auto (system preference)' },
              ].map(({ value, label }) => (
                <Radio key={value} value={value}>
                  <Radio.Control />
                  <Radio.Text>{label}</Radio.Text>
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
        </Box>

        <Box p={4} bg="bg.subtle" borderRadius="md" w="100%">
          <Box fontWeight="semibold" mb={2}>
            Current Settings:
          </Box>
          <Box textStyle="subtext">
            <Box>Notifications: {notifications}</Box>
            <Box>Theme: {theme}</Box>
          </Box>
        </Box>
      </VStack>
    );
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Radio.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`); `tags`
// is written out on each story because the indexer reads CSF statically.

const PLANS = [
  {
    value: 'member',
    label: '멤버별 한도',
    hint: '멤버마다 같은 크레딧을 나눠 줍니다.',
  },
  {
    value: 'group',
    label: '그룹 공용',
    hint: '그룹 안에서 크레딧을 함께 씁니다.',
  },
  { value: 'none', label: '제한 없음', hint: '조직 전체 한도만 적용합니다.' },
];

export const DoNamedGroup: StoryObj = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a named group with a default',
  render: () => (
    <Stack gap={3} maxW="420px">
      <Text id="usage-credit-mode" fontWeight="semibold">
        크레딧 배분 방식
      </Text>
      <RadioGroup defaultValue="member" aria-labelledby="usage-credit-mode">
        <Stack gap={3}>
          {PLANS.map((plan) => (
            <Radio key={plan.value} value={plan.value} alignItems="flex-start">
              <Radio.Control />
              <Radio.Text>
                {plan.label}
                <Text as="span" display="block" color="fg.muted" fontSize="sm">
                  {plan.hint}
                </Text>
              </Radio.Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Stack>
  ),
};

export const DontRadioForMany: StoryObj = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a long list of radios",
  render: () => (
    <RadioGroup defaultValue="1" aria-label="시간대">
      <Stack gap={2}>
        {[
          '서울',
          '도쿄',
          '싱가포르',
          '시드니',
          '런던',
          '파리',
          '뉴욕',
          '로스앤젤레스',
        ].map((city, i) => (
          <Radio key={city} value={String(i)}>
            <Radio.Control />
            <Radio.Text>{city}</Radio.Text>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  ),
};

export const DontSingleRadio: StoryObj = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: one radio on its own",
  render: () => (
    <RadioGroup aria-label="약관">
      <Radio value="agree">
        <Radio.Control />
        <Radio.Text>이용약관에 동의합니다</Radio.Text>
      </Radio>
    </RadioGroup>
  ),
};

/** Tokens `RadioControl` reads, as written in `RadioControl.tsx`. */
export const UsageTokens: StoryObj = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={[
        {
          token: 'bg.surface',
          use: <T en="Unselected ring fill" ko="선택 전 원 안쪽" />,
        },
        {
          token: 'border.control',
          use: <T en="Unselected ring (3:1)" ko="선택 전 테두리(3:1)" />,
        },
        { token: 'primary.main', use: <T en="Selected fill" ko="선택 채움" /> },
        { token: 'fg.onPrimary', use: <T en="Selected dot" ko="선택 점" /> },
        { token: 'disabled.bg', use: <T en="Disabled ring" ko="비활성 원" /> },
        { token: 'disabled.fg', use: <T en="Disabled dot" ko="비활성 점" /> },
        {
          token: 'focus.ring',
          use: <T en="Keyboard focus ring" ko="키보드 초점 링" />,
        },
      ]}
    />
  ),
};
