import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { addMonths, subMonths } from 'date-fns';
import { userEvent, waitFor } from '@storybook/test';

import { Text } from '@/components/Typography';

import { MonthPicker } from './MonthPicker';
import { MonthRange } from './MonthPicker.types';

const meta: Meta<typeof MonthPicker> = {
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
type Story = StoryObj<typeof MonthPicker>;

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

/**
 * Component Test: MonthPicker 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 월 리스트가 올바르게 표시되는지
 */
export const InteractionTest: Story = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<MonthRange | null>(null);

    return (
      <div>
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>
          MonthPicker
        </div>
        <MonthPicker
          selectedRange={selectedRange}
          onChange={setSelectedRange}
          name="test-month-picker"
        />
        {selectedRange && (
          <div style={{ marginTop: '8px', fontSize: '14px' }}>
            Selected: {selectedRange.startMonth.toLocaleDateString()}
            {selectedRange.endMonth && ` - ${selectedRange.endMonth.toLocaleDateString()}`}
          </div>
        )}
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step('월 리스트가 올바르게 표시되는지 확인', async () => {
      // Input 찾기 (캘린더 아이콘이 있는)
      const input = canvasElement.querySelector('input[name="test-month-picker"]') as HTMLInputElement;

      if (!input) {
        throw new Error('MonthPicker input not found');
      }

      // Input 클릭하여 팝오버 열기
      await userEvent.click(input);

      // 팝오버가 나타날 때까지 대기
      await waitFor(() => {
        const popover = document.querySelector('[role="dialog"]');
        if (!popover) {
          throw new Error('Month picker popover not found');
        }
      }, { timeout: 3000 });

      // 월 버튼들이 렌더링될 때까지 대기 (12개월)
      await waitFor(() => {
        const monthButtons = document.querySelectorAll('[role="dialog"] button');
        // 12개의 월 버튼 + 년도 네비게이션 버튼 (이전/다음) + Clear 버튼
        if (monthButtons.length < 12) {
          throw new Error(`Month buttons not yet rendered (found ${monthButtons.length} buttons)`);
        }
      }, { timeout: 3000 });

      // 현재 년도가 표시되는지 확인
      const currentYear = new Date().getFullYear();
      await waitFor(() => {
        const yearText = document.querySelector('[role="dialog"]')?.textContent;
        if (!yearText?.includes(currentYear.toString())) {
          throw new Error('Current year not displayed');
        }
      });
    });
  },
};
