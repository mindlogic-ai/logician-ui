import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { Textarea as ChakraTextarea } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder,
      onChange,
      value: propValue,
      _focusVisible,
      _hover,
      _focus,
      disabled,
      invalid,
      readOnly,
      borderColor,
      css,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<
      string | number | readonly string[] | undefined
    >(propValue);

    useEffect(() => {
      setCurrentValue(propValue);
    }, [propValue]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <ChakraTextarea
        ref={ref}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
        data-invalid={invalid || undefined}
        resize="none"
        bg="white"
        // Chakra v3 `Input` outline variant declares
        // `focusRingColor: var(--focus-color)`, but the matching
        // `Textarea` recipe does not — so the focus ring defaults to
        // `colorPalette.focusRing` (gray.400) and ends up visibly
        // different from Input/Select. Mirror Input's chain explicitly.
        focusRingColor={invalid ? 'danger.main' : 'primary.main'}
        borderColor={borderColor ?? (invalid ? 'danger.main' : 'gray.400')}
        _hover={{
          borderColor: invalid ? 'danger.main' : 'primary.lighter',
          ..._hover,
        }}
        _focus={{
          borderColor: invalid ? 'danger.main' : 'primary.main',
          ..._focus,
        }}
        _invalid={{
          borderColor: 'danger.main',
          _hover: {
            borderColor: 'danger.main',
          },
          _focus: {
            borderColor: 'danger.main',
          },
        }}
        _readOnly={{
          opacity: 1,
          cursor: 'not-allowed',
          bg: 'gray.50',
          color: 'gray.600',
          borderColor: 'gray.200',
        }}
        _disabled={{
          opacity: 1,
          cursor: 'not-allowed',
          bg: 'gray.50',
          color: 'gray.1000',
          fontWeight: 'semibold',
        }}
        {...props}
        css={mergeCss(
          {
            '--focus-color': 'var(--chakra-colors-primary-main)',
            '--error-color': 'var(--chakra-colors-danger-main)',
          },
          css
        )}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
