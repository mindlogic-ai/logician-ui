import { Box, HStack, Stack, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Radio, RadioGroup } from '.';

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
    children: 'Radio option',
    value: 'option1',
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option1">
      <Radio {...args} />
    </RadioGroup>
  ),
};

export const Checked: Story = {
  args: {
    children: 'Selected option',
  },
  render: (args) => (
    <RadioGroup defaultValue="option1">
      <Radio {...args} value="option1" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup defaultValue="disabled-checked">
      <Stack gap={3}>
        <Radio {...args} value="disabled-unchecked" disabled>
          Disabled unchecked
        </Radio>
        <Radio {...args} value="disabled-checked" disabled>
          Disabled checked
        </Radio>
      </Stack>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap={4}>
      <RadioGroup size="sm" defaultValue="sm">
        <Radio {...args} value="sm">
          Small radio
        </Radio>
      </RadioGroup>
      <RadioGroup size="md" defaultValue="md">
        <Radio {...args} value="md">
          Medium radio
        </Radio>
      </RadioGroup>
      <RadioGroup size="lg" defaultValue="lg">
        <Radio {...args} value="lg">
          Large radio
        </Radio>
      </RadioGroup>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <RadioGroup defaultValue="checked">
      <Stack gap={3}>
        <Radio {...args} value="default">
          Default state
        </Radio>
        <Radio {...args} value="checked">
          Checked state
        </Radio>
        <Radio {...args} value="disabled" disabled>
          Disabled state
        </Radio>
        <Radio {...args} value="disabled-checked" disabled>
          Disabled checked state
        </Radio>
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
            <Radio value="option1">First option</Radio>
            <Radio value="option2">Second option</Radio>
            <Radio value="option3">Third option</Radio>
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
            <Radio value="email">Email</Radio>
            <Radio value="sms">SMS</Radio>
            <Radio value="phone">Phone call</Radio>
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
              This is a very long label that demonstrates how radio buttons
              handle longer text content
            </Radio>
            <Radio value="option2">
              Another option with extended descriptive text that might wrap to
              multiple lines
            </Radio>
            <Radio value="option3">
              A third choice with substantial explanatory content
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
              <Radio value="all">All notifications</Radio>
              <Radio value="important">Important only</Radio>
              <Radio value="none">No notifications</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Box>
          <Box fontWeight="semibold" mb={2}>
            Theme Preference
          </Box>
          <RadioGroup value={theme} onValueChange={(e) => setTheme(e.value)}>
            <HStack gap={4}>
              <Radio value="light">Light theme</Radio>
              <Radio value="dark">Dark theme</Radio>
              <Radio value="auto">Auto (system preference)</Radio>
            </HStack>
          </RadioGroup>
        </Box>

        <Box p={4} bg="gray.50" borderRadius="md" w="100%">
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
