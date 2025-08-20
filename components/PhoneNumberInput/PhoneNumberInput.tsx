import React, { useEffect, useState } from 'react';
import countryCodesList, { CountryProperty } from 'country-codes-list';
import {
  formatIncompletePhoneNumber,
  getExampleNumber,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';
import { CountryCode } from 'libphonenumber-js/types';

import { findKeyByValue } from '@/utils/findKeyByValue';

import { Input } from '../Input';
import { PhoneNumberInputProps } from './PhoneNumberInput.types';

// Generate a dial code to ISO country code mapping
const generateDialCodeToCountryCodeMap = () => {
  const countryCodes = countryCodesList.customList(
    'countryCode' as CountryProperty,
    '+{countryCallingCode} {countryNameEn}',
  );
  return countryCodes;
};

const dialCodeToCountryCode = generateDialCodeToCountryCodeMap();

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  countryCode: dialCodeString, // +82 South Korea
  name,
  onChange,
  value,
  ...rest
}) => {
  const [placeholder, setPlaceholder] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>(value || '');

  useEffect(() => {
    const countryCode = findKeyByValue(
      dialCodeToCountryCode,
      dialCodeString,
    ) as CountryCode;
    // Set placeholder based on the selected country code
    const exampleNumber = getExampleNumber(countryCode, examples);
    if (exampleNumber) {
      setPlaceholder(exampleNumber.formatNational());
    }
  }, [dialCodeString]);

  useEffect(() => {
    // Update phoneNumber when external value changes
    if (value !== phoneNumber) {
      setPhoneNumber(value || '');
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedNumber = formatIncompletePhoneNumber(
      inputValue,
      findKeyByValue(dialCodeToCountryCode, dialCodeString) as CountryCode,
    );

    setPhoneNumber(formattedNumber); // Update local state with formatted number

    // Call Formik's onChange with the updated event
    onChange?.({
      ...event,
      target: { ...event.target, value: formattedNumber, name },
    });
  };

  return (
    <Input
      {...rest}
      type="tel"
      name={name}
      inputMode="tel"
      value={phoneNumber}
      onChange={handleChange}
      placeholder={placeholder} // Dynamic placeholder based on country code
    />
  );
};
