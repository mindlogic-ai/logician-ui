import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { formatDateByLocale } from '@/utils/formatDateByLocale';

import { Text } from '../Typography';
import { RangeDatePicker } from './RangeDatePicker';

const meta = {
  title: 'Components/DatePicker/RangeDatePicker',
  component: RangeDatePicker,
  render: (args) => {
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
  }
} satisfies Meta<typeof RangeDatePicker>;

export default meta;

type Story = StoryObj<typeof RangeDatePicker>;

export const Basic: Story = {}