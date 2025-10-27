import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { userEvent, waitFor } from '@storybook/test';

import { formatDateByLocale } from '@/utils/formatDateByLocale';

import { Text } from '../Typography';
import { RangeDatePicker } from './RangeDatePicker';

const meta: Meta<typeof RangeDatePicker> = {
  title: 'Components/DatePicker/RangeDatePicker',
  component: RangeDatePicker,
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryFn<typeof RangeDatePicker>;

export const Basic: Story = ({
  selectedDates: datesProp,
  onDateChange,
  ...args
}) => {
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([
    new Date(),
    new Date(),
  ]);

  return (
    <>
      <Box mb={2}>
        <RangeDatePicker
          {...args}
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
        />
      </Box>
      <Text>
        {formatDateByLocale(selectedDates[0])} -{' '}
        {formatDateByLocale(selectedDates[1])}
      </Text>
    </>
  );
};

export const WithMinMaxDates: Story = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 3);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 3);

  const [selectedDates, setSelectedDates] = useState<Array<Date>>([
    startDate,
    endDate,
  ]);

  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 14);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14);

  return (
    <>
      <Box mb={2}>
        <RangeDatePicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Box>
      <Text>
        {formatDateByLocale(selectedDates[0])} -{' '}
        {formatDateByLocale(selectedDates[1])}
      </Text>
      <Text fontSize="sm" color="gray.600" mt={2}>
        Date range: {formatDateByLocale(minDate)} - {formatDateByLocale(maxDate)}
      </Text>
    </>
  );
};

/**
 * Component Test: RangeDatePicker 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 캘린더가 열리는지
 */
type RangeDatePickerStory = StoryObj<typeof RangeDatePicker>;

export const InteractionTest: RangeDatePickerStory = {
  render: () => {
    const today = new Date();
    const startDate = new Date(today);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);

    const [selectedDates, setSelectedDates] = useState<Array<Date>>([
      startDate,
      endDate,
    ]);

    return (
      <div>
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>
          Range DatePicker
        </div>
        <RangeDatePicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
        />
        <div style={{ marginTop: '8px', fontSize: '14px' }}>
          Selected: {formatDateByLocale(selectedDates[0])} -{' '}
          {formatDateByLocale(selectedDates[1])}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step('캘린더가 열리는지 확인', async () => {
      // RangeDatePicker의 trigger button 찾기
      const buttons = canvasElement.querySelectorAll('button');
      const triggerButton = Array.from(buttons).find((btn) => {
        const hasSvg = btn.querySelector('svg');
        const hasDateText = btn.textContent?.includes('-');
        return hasSvg && hasDateText;
      }) as HTMLElement;

      if (!triggerButton) {
        throw new Error('RangeDatePicker trigger button not found');
      }

      // 캘린더 열기
      await userEvent.click(triggerButton);

      // 캘린더 팝업이 나타날 때까지 대기
      await waitFor(() => {
        const calendar = document.querySelector('[role="dialog"]');
        if (!calendar) {
          throw new Error('Calendar popover not found');
        }
      }, { timeout: 3000 });

      // 날짜 버튼들이 렌더링될 때까지 대기
      await waitFor(() => {
        let dayButtons = document.querySelectorAll('button[aria-label*="day"]');
        if (dayButtons.length === 0) {
          dayButtons = document.querySelectorAll('[role="dialog"] button[type="button"]');
          if (dayButtons.length < 7) {
            throw new Error(`Day buttons not yet rendered (found ${dayButtons.length} buttons)`);
          }
        }
      }, { timeout: 5000 });
    });
  },
};
