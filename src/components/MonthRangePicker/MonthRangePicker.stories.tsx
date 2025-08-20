import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';

import { Text } from '@/components/Typography';
import { subMonths, addMonths } from 'date-fns';
import useUserStore from '@/store/user';

import { MonthRangePicker } from './MonthRangePicker';
import { MonthRange } from './MonthRangePicker.types';

const meta: Meta<typeof MonthRangePicker> = {
  title: 'Components/MonthRangePicker',
  component: MonthRangePicker,
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
        context.parameters?.initialRange || null,
      );

      return (
        <VStack spacing={4} align="start" width="400px">
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
              bg="green.50"
              borderRadius="md"
              width="100%"
              border="1px solid"
              borderColor="green.200"
            >
              <Text fontSize="sm" fontWeight="semibold" color="green.700">
                ✓ Range Selected:
              </Text>
              <Text fontSize="sm" color="green.600">
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
};

export default meta;
type Story = StoryObj<typeof MonthRangePicker>;

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
        <Text fontSize="md" fontWeight="semibold" mb={2}>
          With Date Constraints
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
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
        <Text fontSize="md" fontWeight="semibold" mb={2}>
          Disabled State
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
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
        <Text fontSize="md" fontWeight="semibold" mb={2}>
          Custom Date Format
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
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
        <Text fontSize="md" fontWeight="semibold" mb={2}>
          Cross-Year Range Selection
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Demonstrates selecting ranges across different years with immediate
          feedback.
        </Text>
        <Box fontSize="sm" color="gray.700">
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

export const KoreanLocale: Story = {
  render: args => {
    const [selectedRange, setSelectedRange] = useState<MonthRange | null>(null);
    const { setLanguage } = useUserStore();

    // Temporarily set Korean locale for this story
    useEffect(() => {
      setLanguage('ko');
    }, []);

    return (
      <VStack spacing={4} align="start" width="400px">
        <Box>
          <Text fontSize="md" fontWeight="semibold" mb={2}>
            Korean Localization (한국어)
          </Text>
          <Text fontSize="sm" color="gray.600" mb={4}>
            Month names, UI text, and date format are automatically localized to
            Korean. No format prop needed - it automatically uses "yyyy년 MMM"
            format.
          </Text>
        </Box>

        <MonthRangePicker
          {...args}
          selectedRange={selectedRange}
          onChange={setSelectedRange}
          // Note: No format prop specified - uses Korean default automatically
        />

        {selectedRange && (
          <Box
            p={3}
            bg="green.50"
            borderRadius="md"
            width="100%"
            border="1px solid"
            borderColor="green.200"
          >
            <Text fontSize="sm" fontWeight="semibold" color="green.700">
              ✓ 선택된 범위:
            </Text>
            <Text fontSize="sm" color="green.600">
              {selectedRange.startMonth.toLocaleDateString('ko-KR')}
              {selectedRange.endMonth ? (
                <> - {selectedRange.endMonth.toLocaleDateString('ko-KR')}</>
              ) : (
                ' - (선택 중...)'
              )}
            </Text>
          </Box>
        )}
      </VStack>
    );
  },
};
