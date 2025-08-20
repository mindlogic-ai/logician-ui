import { ForwardedRef, forwardRef } from 'react';
import { InputGroup, InputLeftAddon, InputProps } from '@chakra-ui/react';

import { Input } from '@/components/Input';

export interface UrlInputProps extends InputProps {
  leftAddon?: string;
  rightAddon?: string;
}

export const UrlInput = forwardRef(
  (
    { leftAddon = 'https://', value, onChange, ...rest }: UrlInputProps,
    ref?: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (onChange) {
        onChange({
          ...e,
          target: {
            ...e.target,
            value: leftAddon + inputValue,
          },
        });
      }
    };

    const displayValue =
      typeof value === 'string' ? value.replace(leftAddon, '') : value;

    return (
      <InputGroup width="100%">
        {leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
        <Input
          name="service_url"
          {...rest}
          value={displayValue}
          onChange={handleChange}
          ref={ref}
        />
      </InputGroup>
    );
  },
);

UrlInput.displayName = 'UrlInput';
