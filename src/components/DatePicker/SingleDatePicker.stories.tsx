import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

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
