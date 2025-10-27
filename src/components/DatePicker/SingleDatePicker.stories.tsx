import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from '@storybook/test';

import { formatDateByLocale } from '@/utils/formatDateByLocale';

import { Text } from '../Typography';
import { SingleDatePicker } from './SingleDatePicker';

const meta: Meta<typeof SingleDatePicker> = {
  title: 'Components/DatePicker/SingleDatePicker',
  component: SingleDatePicker,
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryFn<typeof SingleDatePicker>;

export const Basic: Story = ({ date: dateProp, onDateChange, ...args }) => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Box mb={2}>
        <SingleDatePicker {...args} date={date} onDateChange={setDate} />
      </Box>
      <Text>Selected Date: {formatDateByLocale(date)}</Text>
    </>
  );
};

export const WithMinMaxDates: Story = () => {
  const [date, setDate] = useState(new Date());
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 7); // 7 days ago
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7); // 7 days from now

  return (
    <>
      <Box mb={2}>
        <SingleDatePicker
          date={date}
          onDateChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Box>
      <Text>Selected Date: {formatDateByLocale(date)}</Text>
      <Text fontSize="sm" color="gray.600" mt={2}>
        Date range: {formatDateByLocale(minDate)} - {formatDateByLocale(maxDate)}
      </Text>
    </>
  );
};

/**
 * Component Test: SingleDatePicker 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 캘린더가 열리는지
 */
type SingleDatePickerStory = StoryObj<typeof SingleDatePicker>;

export const InteractionTest: SingleDatePickerStory = {
  render: () => {
    const [date, setDate] = useState(new Date());

    return (
      <div>
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>
          DatePicker
        </div>
        <SingleDatePicker
          name="test-datepicker"
          date={date}
          onDateChange={setDate}
        />
        <div style={{ marginTop: '8px', fontSize: '14px' }}>
          Selected: {formatDateByLocale(date)}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    await step('캘린더가 열리는지 확인', async () => {
      // DatePicker의 trigger button 찾기
      const buttons = canvasElement.querySelectorAll('button');
      const triggerButton = Array.from(buttons).find((btn) => {
        const hasSvg = btn.querySelector('svg');
        const hasDateText = btn.textContent?.includes('/');
        return hasSvg && hasDateText;
      }) as HTMLElement;

      if (!triggerButton) {
        throw new Error('DatePicker trigger button not found');
      }

      // 캘린더 열기
      await userEvent.click(triggerButton);

      // 캘린더 팝업이 나타날 때까지 대기
      await waitFor(() => {
        const popover = document.querySelector('[role="dialog"]');
        if (!popover) {
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
