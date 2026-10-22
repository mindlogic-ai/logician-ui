import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { addMonths, subMonths } from 'date-fns';

import { Text } from '@/components/Typography';

import { FieldRow } from '../Form';
import { MonthPicker } from './MonthPicker';
import { MonthRange } from './MonthPicker.types';

const meta = {
  title: 'Components/MonthPicker',
  component: MonthPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedRange: {
      control: false,
    },
    onChange: {
      control: false,
    },
  },
  decorators: [
    (Story, context) => {
      const [selectedRange, setSelectedRange] = useState<MonthRange | null>(
        context.parameters?.initialRange || null
      );

      return (
        <VStack gap={4} align="start" width="400px">
          {context.parameters?.additionalContent}
          <Story
            args={{
              ...context.args,
              selectedRange,
              onChange: setSelectedRange,
            }}
          />
          {selectedRange && (
            <Box
              p={3}
              bg="success.bg"
              borderRadius="md"
              width="100%"
              border="1px solid"
              borderColor="success.border"
            >
              <Text
                textStyle="subtext"
                fontWeight="semibold"
                color="success.fg"
              >
                ✓ Range Selected:
              </Text>
              <Text textStyle="subtext" color="success.fg">
                {selectedRange.startMonth.toLocaleDateString()}
                {selectedRange.endMonth ? (
                  <> - {selectedRange.endMonth.toLocaleDateString()}</>
                ) : (
                  ' - (selecting...)'
                )}
              </Text>
            </Box>
          )}
        </VStack>
      );
    },
  ],
} satisfies Meta<typeof MonthPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInitialValue: Story = {
  parameters: {
    initialRange: {
      startMonth: subMonths(new Date(), 2),
      endMonth: addMonths(new Date(), 1),
    },
  },
};

export const WithConstraints: Story = {
  args: {
    minMonth: subMonths(new Date(), 6),
    maxMonth: addMonths(new Date(), 6),
  },
  parameters: {
    additionalContent: (
      <Box>
        <Text fontWeight="semibold" mb={2}>
          With Date Constraints
        </Text>
        <Text textStyle="subtext" color="fg.muted" mb={4}>
          Only allows selection 6 months before/after current date
        </Text>
      </Box>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    additionalContent: (
      <Box>
        <Text fontWeight="semibold" mb={2}>
          Disabled State
        </Text>
        <Text textStyle="subtext" color="fg.muted" mb={4}>
          The picker is disabled and cannot be interacted with
        </Text>
      </Box>
    ),
  },
};

export const CustomFormat: Story = {
  args: {
    format: 'MMMM yyyy',
    placeholder: 'Select month range (full month names)',
  },
  parameters: {
    additionalContent: (
      <Box>
        <Text fontWeight="semibold" mb={2}>
          Custom Date Format
        </Text>
        <Text textStyle="subtext" color="fg.muted" mb={4}>
          Uses full month names (MMMM yyyy) instead of abbreviated
        </Text>
      </Box>
    ),
  },
};

export const CrossYearSelection: Story = {
  parameters: {
    additionalContent: (
      <Box>
        <Text fontWeight="semibold" mb={2}>
          Cross-Year Range Selection
        </Text>
        <Text textStyle="subtext" color="fg.muted" mb={4}>
          Demonstrates selecting ranges across different years with immediate
          feedback.
        </Text>
        <Box textStyle="subtext" color="fg.default">
          <Text>
            • Click a month to start selection (shows immediately in input)
          </Text>
          <Text>
            • Use year navigation arrows to navigate to different years
          </Text>
          <Text>• Click a month in another year to complete the range</Text>
          <Text>• Try selecting from Dec 2024 to Mar 2025</Text>
        </Box>
      </Box>
    ),
  },
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `MonthPicker.usage.mdx` with <Canvas of={…} />. Hidden (`!dev`).

export const DoLabelledWindow: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: a label and bounds',
  render: (args) => (
    <FieldRow label="집계 기간">
      <MonthPicker
        {...args}
        minMonth={new Date(2025, 0, 1)}
        maxMonth={new Date(2026, 9, 1)}
      />
    </FieldRow>
  ),
};

export const DoSingleMonth: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: isRange={false} for one month',
  render: (args) => (
    <FieldRow label="정산 월">
      <MonthPicker {...args} isRange={false} />
    </FieldRow>
  ),
};
