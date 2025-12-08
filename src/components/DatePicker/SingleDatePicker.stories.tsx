import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { formatDateByLocale } from '@/utils/formatDateByLocale';

import { Text } from '../Typography';
import { SingleDatePicker } from './SingleDatePicker';

const meta = {
  title: 'Components/DatePicker/SingleDatePicker',
  component: SingleDatePicker,
  render: (args) => {
    const [date, setDate] = useState(new Date());

    return (
      <>
        <Box mb={2}>
          <SingleDatePicker {...args} date={date} onDateChange={setDate} />
        </Box>
        <Text>Selected Date: {formatDateByLocale(date)}</Text>
      </>
    );
  },
} satisfies Meta<typeof SingleDatePicker>;

export default meta;
type Story = StoryObj<typeof SingleDatePicker>;

export const Basic: Story = {};
