import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { Textarea as ChakraTextarea } from '@chakra-ui/react';

import { noZoomOnFocus } from '@/theme/formControls';
import { disabledControl } from '@/utils/disabledControl';
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
        bg="bg.surface"
        color="fg.default"
        // Chakra v3 `Input` outline variant declares
        // `focusRingColor: var(--focus-color)`, but the matching
        // `Textarea` recipe does not — so the focus ring defaults to
        // `colorPalette.focusRing` (gray.400) and ends up visibly
        // different from Input/Select. Mirror Input's chain explicitly.
        focusRingColor={invalid ? 'danger.solid' : 'primary.main'}
        borderColor={
          borderColor ?? (invalid ? 'danger.solid' : 'border.control')
        }
        _hover={{
          borderColor: invalid ? 'danger.solid' : 'fg.icon',
          ..._hover,
        }}
        _focus={{
          borderColor: invalid ? 'danger.solid' : 'primary.main',
          boxShadow: invalid
            ? 'none'
            : '0 0 0 1px var(--chakra-colors-primary-main)',
          ..._focus,
        }}
        _invalid={{
          borderColor: 'danger.solid',
          _hover: {
            borderColor: 'danger.solid',
          },
          _focus: {
            borderColor: 'danger.solid',
          },
        }}
        _readOnly={{
          opacity: 1,
          cursor: 'not-allowed',
          bg: 'bg.subtle',
          color: 'fg.muted',
          borderColor: 'border.subtle',
        }}
        _disabled={{
          ...disabledControl,
          cursor: 'not-allowed',
          fontWeight: 'semibold',
        }}
        {...props}
        css={mergeCss(
          noZoomOnFocus,
          {
            '--focus-color': 'var(--chakra-colors-primary-main)',
            '--error-color': 'var(--chakra-colors-danger-solid)',
          },
          css
        )}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
