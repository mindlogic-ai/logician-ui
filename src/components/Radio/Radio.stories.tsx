import React, { useState } from 'react';
import { Box, Stack, VStack } from '@chakra-ui/react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Radio, RadioGroup } from '.';
import { RadioOption } from './Radio.types';

const meta: Meta<typeof Radio> = {
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
    value: {
      control: 'text',
      description: 'The value of the radio button',
    },
    isChecked: {
      control: 'boolean',
      description: 'Whether the radio button is checked',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the radio button',
    },
  },
  args: {
    children: 'Radio option',
    value: 'option1',
  },
};

export default meta;
type Story = StoryFn<typeof Radio>;

export const Default: Story = (args) => <Radio {...args} />;

export const Checked: Story = (args) => <Radio {...args} isChecked />;
Checked.args = {
  children: 'Selected option',
};

export const Disabled: Story = (args) => (
  <Stack spacing={3}>
    <Radio {...args} isDisabled>
      Disabled unchecked
    </Radio>
    <Radio {...args} isDisabled isChecked>
      Disabled checked
    </Radio>
  </Stack>
);

export const Sizes: Story = (args) => (
  <Stack spacing={4}>
    <Radio {...args} size="sm">
      Small radio
    </Radio>
    <Radio {...args} size="md">
      Medium radio
    </Radio>
    <Radio {...args} size="lg">
      Large radio
    </Radio>
  </Stack>
);

export const States: Story = (args) => (
  <Stack spacing={3}>
    <Radio {...args}>Default state</Radio>
    <Radio {...args} isChecked>
      Checked state
    </Radio>
    <Radio {...args} isDisabled>
      Disabled state
    </Radio>
    <Radio {...args} isDisabled isChecked>
      Disabled checked state
    </Radio>
  </Stack>
);

export const BasicGroup: StoryFn<typeof RadioGroup> = () => {
  const [value, setValue] = useState<string>('option1');

  const options: RadioOption[] = [
    { value: 'option1', label: 'First option' },
    { value: 'option2', label: 'Second option' },
    { value: 'option3', label: 'Third option' },
  ];

  return (
    <VStack align="flex-start" spacing={4}>
      <Box>Selected value: {value}</Box>
      <RadioGroup options={options} value={value} onChange={setValue} />
    </VStack>
  );
};

export const HorizontalGroup: StoryFn<typeof RadioGroup> = () => {
  const [value, setValue] = useState<string>('email');

  const options: RadioOption[] = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'phone', label: 'Phone call' },
  ];

  return (
    <VStack align="flex-start" spacing={4}>
      <Box>Preferred contact method: {value}</Box>
      <RadioGroup
        options={options}
        value={value}
        onChange={setValue}
        direction="row"
        spacing={6}
      />
    </VStack>
  );
};

export const WithLongLabels: StoryFn<typeof RadioGroup> = () => {
  const [value, setValue] = useState<string>('option1');

  const options: RadioOption[] = [
    {
      value: 'option1',
      label:
        'This is a very long label that demonstrates how radio buttons handle longer text content',
    },
    {
      value: 'option2',
      label:
        'Another option with extended descriptive text that might wrap to multiple lines',
    },
    {
      value: 'option3',
      label: 'A third choice with substantial explanatory content',
    },
  ];

  return (
    <Box maxW="400px">
      <RadioGroup
        options={options}
        value={value}
        onChange={setValue}
        spacing={4}
      />
    </Box>
  );
};

export const FormExample: StoryFn<typeof RadioGroup> = () => {
  const [notifications, setNotifications] = useState<string>('all');
  const [theme, setTheme] = useState<string>('light');

  const notificationOptions: RadioOption[] = [
    { value: 'all', label: 'All notifications' },
    { value: 'important', label: 'Important only' },
    { value: 'none', label: 'No notifications' },
  ];

  const themeOptions: RadioOption[] = [
    { value: 'light', label: 'Light theme' },
    { value: 'dark', label: 'Dark theme' },
    { value: 'auto', label: 'Auto (system preference)' },
  ];

  return (
    <VStack align="flex-start" spacing={6} maxW="300px">
      <Box>
        <Box fontWeight="semibold" mb={2}>
          Notification Preferences
        </Box>
        <RadioGroup
          options={notificationOptions}
          value={notifications}
          onChange={setNotifications}
          spacing={3}
        />
      </Box>

      <Box>
        <Box fontWeight="semibold" mb={2}>
          Theme Preference
        </Box>
        <RadioGroup
          options={themeOptions}
          value={theme}
          onChange={setTheme}
          direction="row"
          spacing={4}
        />
      </Box>

      <Box p={4} bg="gray.50" borderRadius="md" w="100%">
        <Box fontWeight="semibold" mb={2}>
          Current Settings:
        </Box>
        <Box fontSize="sm">
          <Box>Notifications: {notifications}</Box>
          <Box>Theme: {theme}</Box>
        </Box>
      </Box>
    </VStack>
  );
};

/**
 * Component Test: Radio 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 라디오 버튼 선택 시 다른 버튼들이 해제되는지
 * - RadioGroup 내에서 하나만 선택 가능한지
 * - 초기 defaultValue가 올바르게 선택되는지
 *
 * Bad Path:
 * - disabled 라디오는 선택 불가능한지
 */
type RadioStory = StoryObj<typeof RadioGroup>;

export const InteractionTest: RadioStory = {
  render: () => {
    const [value, setValue] = useState('option1');

    const options: RadioOption[] = [
      { value: 'option1', label: 'First Option' },
      { value: 'option2', label: 'Second Option' },
      { value: 'option3', label: 'Third Option' },
    ];

    return (
      <VStack align="flex-start" spacing={8}>
        <Box>
          <Box fontWeight="semibold" mb={2}>
            Radio Group (defaultValue: option1)
          </Box>
          <RadioGroup
            data-testid="radio-group"
            options={options}
            value={value}
            onChange={setValue}
          />
        </Box>

        <Box>
          <Box fontWeight="semibold" mb={2}>
            With Disabled Radio
          </Box>
          <Stack spacing={3}>
            <Radio value="disabled1" isDisabled>
              Disabled Option 1
            </Radio>
            <Radio value="disabled2">Enabled Option 2</Radio>
          </Stack>
        </Box>
      </VStack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('초기 defaultValue가 올바르게 선택되는지 확인', async () => {
      const firstOption = canvas.getByRole('radio', { name: 'First Option' });
      await expect(firstOption).toBeChecked();
    });

    await step('두 번째 라디오 버튼 선택', async () => {
      const secondOption = canvas.getByRole('radio', { name: 'Second Option' });
      await userEvent.click(secondOption);
      await expect(secondOption).toBeChecked();
    });

    await step('라디오 버튼 선택 시 다른 버튼들이 해제되는지 확인', async () => {
      const firstOption = canvas.getByRole('radio', { name: 'First Option' });
      const secondOption = canvas.getByRole('radio', { name: 'Second Option' });

      // 첫 번째는 해제되어야 함
      await expect(firstOption).not.toBeChecked();
      // 두 번째만 선택되어야 함
      await expect(secondOption).toBeChecked();
    });

    await step('세 번째 라디오 버튼 선택 시 이전 선택이 해제되는지 확인', async () => {
      const secondOption = canvas.getByRole('radio', { name: 'Second Option' });
      const thirdOption = canvas.getByRole('radio', { name: 'Third Option' });

      await userEvent.click(thirdOption);

      // 세 번째만 선택되어야 함
      await expect(thirdOption).toBeChecked();
      // 두 번째는 해제되어야 함
      await expect(secondOption).not.toBeChecked();
    });

    await step('RadioGroup 내에서 하나만 선택 가능한지 확인', async () => {
      const allRadios = canvas.getAllByRole('radio');
      const firstGroupRadios = allRadios.slice(0, 3); // First 3 are from first group

      // 첫 번째 그룹에서 체크된 라디오가 하나만 있는지 확인
      const checkedCount = firstGroupRadios.filter(
        (radio) => (radio as HTMLInputElement).checked
      ).length;

      await expect(checkedCount).toBe(1);
    });

    await step('disabled 라디오는 선택 불가능한지 확인', async () => {
      const disabledOption = canvas.getByRole('radio', { name: 'Disabled Option 1' });

      await expect(disabledOption).toBeDisabled();

      // disabled 라디오 클릭 시도
      await userEvent.click(disabledOption);

      // 여전히 체크되지 않아야 함
      await expect(disabledOption).not.toBeChecked();
    });
  },
};
