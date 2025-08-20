import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { RangeDatePicker } from './RangeDatePicker';
import { formatDateByLocale } from '@/utils/formatDateByLocale';
import { Text } from '../Typography';
import { Box } from '@chakra-ui/react';

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
