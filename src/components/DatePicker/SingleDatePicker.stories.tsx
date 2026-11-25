import { useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { formatDateByLocale } from '@/utils/formatDateByLocale';

import { SelectField } from '../Select';
import { Text } from '../Typography';
import { RangeDatePicker } from './RangeDatePicker';
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

/** Nothing picked: the placeholder, in `fg.placeholder`, as on a Select. */
export const Empty: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <SingleDatePicker
        {...args}
        date={date}
        onDateChange={setDate}
        placeholder="만료일"
      />
    );
  },
};

const SIZES = ['xs', 'sm', 'md', 'lg'] as const;
const PERIODS = [
  { label: '최근 7일', value: '7d' },
  { label: '최근 30일', value: '30d' },
];
const OCT_1 = new Date(2026, 9, 1);
const OCT_22 = new Date(2026, 9, 22);

/**
 * Both pickers, empty and with a value, beside a `SelectField` of the same
 * size. The trigger is a `FieldTrigger`: Select's height, field padding,
 * type and outline, with the calendar ahead of the date (chevron-sized, in
 * the chevron's colour) and no chevron.
 */
export const BesideSelect: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Grid
      templateColumns="max-content repeat(5, max-content)"
      columnGap={3}
      rowGap={4}
      alignItems="center"
      data-testid="beside-select"
    >
      <span />
      {[
        'SelectField',
        'Single · empty',
        'Single',
        'Range · empty',
        'Range',
      ].map((label) => (
        <Text key={label} fontSize="sm" color="fg.muted">
          {label}
        </Text>
      ))}
      {SIZES.map((size) => (
        <Box key={size} display="contents">
          <Text fontSize="sm" color="fg.muted">
            {size}
          </Text>
          <Box w="12rem">
            <SelectField size={size} options={PERIODS} placeholder="기간" />
          </Box>
          <SingleDatePicker size={size} onDateChange={() => {}} />
          <SingleDatePicker size={size} date={OCT_1} onDateChange={() => {}} />
          <RangeDatePicker
            size={size}
            selectedDates={[]}
            onDateChange={() => {}}
          />
          <RangeDatePicker
            size={size}
            selectedDates={[OCT_1, OCT_22]}
            onDateChange={() => {}}
          />
        </Box>
      ))}
    </Grid>
  ),
};
