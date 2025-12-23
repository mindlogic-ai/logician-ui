import { Box, Stack, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Radio, RadioGroup } from '.';
import { RadioOption } from './Radio.types';

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
    // value: {
    //   control: 'text',
    //   description: 'The value of the radio button',
    // },
    // checked: {
    //   control: 'boolean',
    //   description: 'Whether the radio button is checked',
    // },
    // disabled: {
    //   control: 'boolean',
    //   description: 'Whether the radio button is disabled',
    // },
    // size: {
    //   control: { type: 'select' },
    //   options: ['sm', 'md', 'lg'],
    //   description: 'The size of the radio button',
    // },
  },
  args: {
    children: 'Radio option',
    value: 'option1',
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    children: 'Selected option',
    // checked: true,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Stack gap={3}>
      <Radio {...args}>
        Disabled unchecked
      </Radio>
      <Radio {...args}>
        Disabled checked
      </Radio>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap={4}>
      <Radio {...args}>
        Small radio
      </Radio>
      <Radio {...args}>
        Medium radio
      </Radio>
      <Radio {...args}>
        Large radio
      </Radio>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack gap={3}>
      <Radio {...args}>Default state</Radio>
      <Radio {...args}>
        Checked state
      </Radio>
      <Radio {...args}>
        Disabled state
      </Radio>
      <Radio {...args}>
        Disabled checked state
      </Radio>
    </Stack>
  ),
};

type RadioGroupStory = StoryObj<typeof RadioGroup>;

export const BasicGroup: RadioGroupStory = {
  render: () => {
    const [value, setValue] = useState<string>('option1');

    const options: RadioOption[] = [
      { value: 'option1', label: 'First option' },
      { value: 'option2', label: 'Second option' },
      { value: 'option3', label: 'Third option' },
    ];

    return (
      <VStack align="flex-start" gap={4}>
        <Box>Selected value: {value}</Box>
        <RadioGroup options={options} value={value} />
      </VStack>
    );
  },
};

export const HorizontalGroup: RadioGroupStory = {
  render: () => {
    const [value, setValue] = useState<string>('email');

    const options: RadioOption[] = [
      { value: 'email', label: 'Email' },
      { value: 'sms', label: 'SMS' },
      { value: 'phone', label: 'Phone call' },
    ];

    return (
      <VStack align="flex-start" gap={4}>
        <Box>Preferred contact method: {value}</Box>
        <RadioGroup
          options={options}
          value={value}
          direction="row"
          gap={6}
        />
      </VStack>
    );
  },
};

export const WithLongLabels: RadioGroupStory = {
  render: () => {
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
          gap={4}
        />
      </Box>
    );
  },
};

export const FormExample: RadioGroupStory = {
  render: () => {
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
      <VStack align="flex-start" gap={6} maxW="300px">
        <Box>
          <Box fontWeight="semibold" mb={2}>
            Notification Preferences
          </Box>
          <RadioGroup
            options={notificationOptions}
            value={notifications}
            gap={3}
          />
        </Box>

        <Box>
          <Box fontWeight="semibold" mb={2}>
            Theme Preference
          </Box>
          <RadioGroup
            options={themeOptions}
            value={theme}
            direction="row"
            gap={4}
          />
        </Box>

        <Box p={4} bg="gray.50" borderRadius="md" w="100%">
          <Box fontWeight="semibold" mb={2}>
            Current Settings:
          </Box>
          <Box fontSize="subtext">
            <Box>Notifications: {notifications}</Box>
            <Box>Theme: {theme}</Box>
          </Box>
        </Box>
      </VStack>
    );
  },
};
