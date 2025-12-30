import { Stack, Box, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { IoCall, IoSearch, IoIosMail } from '@/components/Icon';
import { MaxLengthIndicator } from '../MaxLengthIndicator';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    disabled: { control: 'boolean' },
    maxLength: { control: 'number' },
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {};

export const ControlledWithValue: Story = {
  args: {
    placeholder: 'Type something...',
  },
  render: (args) => {
    const [value, setValue] = useState('Initial value');

    return (
      <Stack gap={4}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Text fontSize="sm" color="gray.600">
          Current value: "{value}"
        </Text>
      </Stack>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    return (
      <Stack gap={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Small
          </Text>
          <Input size="sm" placeholder="Small input" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Medium (default)
          </Text>
          <Input size="md" placeholder="Medium input" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Large
          </Text>
          <Input size="lg" placeholder="Large input" />
        </Box>
      </Stack>
    );
  },
};

export const WithStates: Story = {
  render: () => {
    return (
      <Stack gap={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Normal
          </Text>
          <Input placeholder="Normal state" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Disabled
          </Text>
          <Input placeholder="Disabled state" disabled value="Disabled" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Read Only
          </Text>
          <Input placeholder="Read only" readOnly value="Read only value" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            Invalid (with error border)
          </Text>
          <Input placeholder="Invalid state" aria-invalid="true" />
        </Box>
      </Stack>
    );
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Max 20 characters',
    maxLength: 20,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Stack gap={2}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MaxLengthIndicator value={value.length} maxLength={20} />
      </Stack>
    );
  },
};

export const LeftIcon: Story = {
  args: {
    placeholder: 'Phone number',
    size: 'md',
    disabled: false,
    leftIcon: <IoCall color="gray.300" />,
  },
};

export const RightIcon: Story = {
  args: {
    placeholder: 'Search...',
    size: 'md',
    disabled: false,
    rightIcon: <IoSearch color="gray.300" />,
  },
};

export const BothIcons: Story = {
  args: {
    placeholder: 'Email address',
    leftIcon: <IoIosMail color="gray.300" />,
    rightIcon: <IoSearch color="gray.300" />,
  },
};

export const NumberWithMask: Story = {
  args: {
    placeholder: 'Enter amount',
    type: 'number',
    maskNumber: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Stack gap={2}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Text fontSize="sm" color="gray.600">
          Raw value: {value}
        </Text>
        <Text fontSize="xs" color="gray.500">
          Numbers are automatically formatted with commas
        </Text>
      </Stack>
    );
  },
};

export const TrimWhiteSpace: Story = {
  args: {
    placeholder: 'No leading/trailing spaces allowed',
    trimWhiteSpace: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Stack gap={2}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Text fontSize="xs" color="gray.500">
          Try typing spaces at the beginning or end
        </Text>
      </Stack>
    );
  },
};

export const NoSpaces: Story = {
  args: {
    placeholder: 'No spaces allowed at all',
    noSpaces: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Stack gap={2}>
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Text fontSize="xs" color="gray.500">
          Try typing spaces - they will be removed
        </Text>
      </Stack>
    );
  },
};

export const FocusState: Story = {
  args: {
    placeholder: 'Click to see focus border (primary.main)',
  },
  render: (args) => {
    return (
      <Stack gap={2}>
        <Input {...args} />
        <Text fontSize="xs" color="gray.500">
          Focus border should be primary.main color
        </Text>
      </Stack>
    );
  },
};
