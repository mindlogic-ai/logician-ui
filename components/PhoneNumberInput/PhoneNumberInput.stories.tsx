import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { PhoneNumberInput } from './PhoneNumberInput';
import { PhoneNumberInputProps } from './PhoneNumberInput.types';
import countryCodesList, { CountryProperty } from 'country-codes-list';

const countryCodeOptions = Object.values(
  countryCodesList.customList(
    'countryCode' as CountryProperty,
    '+{countryCallingCode} {countryNameEn}',
  ),
);

const meta: Meta<typeof PhoneNumberInput> = {
  title: 'Components/PhoneNumberInput',
  component: PhoneNumberInput,
  argTypes: {
    countryCode: {
      control: 'select',
      options: countryCodeOptions,
      defaultValue: countryCodeOptions[0],
    },
  },
  args: {
    name: 'phone',
  },
};

export default meta;
type Story = StoryFn<typeof PhoneNumberInput>;

export const Basic: Story = (props: PhoneNumberInputProps) => {
  return <PhoneNumberInput {...props} />;
};
