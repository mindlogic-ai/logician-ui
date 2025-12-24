import { ForwardedRef, forwardRef } from 'react';
import {
  Group,
  Input as ChakraInput,
  InputAddon,
  InputProps,
} from '@chakra-ui/react';

export interface UrlInputProps extends InputProps {
  leftAddon?: string;
  rightAddon?: string;
}

export const UrlInput = forwardRef(
  (
    { leftAddon = 'https://', value, onChange, ...rest }: UrlInputProps,
    ref?: ForwardedRef<HTMLInputElement>
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
      <Group width="100%" attached>
        {leftAddon && <InputAddon>{leftAddon}</InputAddon>}
        <ChakraInput
          name="service_url"
          {...rest}
          value={displayValue}
          onChange={handleChange}
          ref={ref}
        />
      </Group>
    );
  }
);

UrlInput.displayName = 'UrlInput';
