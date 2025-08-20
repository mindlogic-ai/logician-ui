import { InputProps } from '../Input';

export interface PhoneNumberInputProps extends InputProps {
  countryCode: string; // +82 South Korea
  name: string; // Require 'name' to satisfy Formik's requirement
  value?: string;
}
