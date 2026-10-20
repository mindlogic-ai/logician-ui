import { FocusEvent, forwardRef } from 'react';
import { Textarea as ChakraTextarea } from '@chakra-ui/react';

import { useCompositionSafeValue } from '@/hooks/useCompositionSafeValue';
import { noZoomOnFocus } from '@/theme/formControls';
import { mergeCss } from '@/utils/mergeCss';

import { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder,
      onChange,
      onBlur,
      onCompositionStart,
      onCompositionEnd,
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
    // 한글·일본어·중국어 IME 조합 중에는 밖에서 들어오는 value 를 노드에 쓰지 않고
    // (쓰면 조합이 끊겨 `학사ㅈ지원` 이 된다), onChange 는 키 입력마다 그대로
    // 내보낸다. 규칙은 useCompositionSafeValue 의 docstring.
    const field = useCompositionSafeValue<HTMLTextAreaElement>({
      value: propValue,
      // No transform here, so the event's own target already carries the
      // emitted text — hand the consumer the original event, as before.
      emit: (e) => onChange?.(e),
      onCompositionStart,
      onCompositionEnd,
    });

    const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
      // A keyboard that never sent `compositionend` (seen on Android) must not
      // leave the field ignoring outside values after it loses focus.
      field.finishOnBlur(e);
      onBlur?.(e);
    };

    return (
      <ChakraTextarea
        ref={ref}
        placeholder={placeholder}
        value={field.value}
        onChange={field.onChange}
        onBlur={handleBlur}
        onCompositionStart={field.onCompositionStart}
        onCompositionEnd={field.onCompositionEnd}
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
        focusRingColor={invalid ? 'danger.main' : 'primary.main'}
        borderColor={
          borderColor ?? (invalid ? 'danger.main' : 'border.default')
        }
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
          bg: 'bg.subtle',
          color: 'fg.muted',
          borderColor: 'border.subtle',
        }}
        _disabled={{
          opacity: 1,
          cursor: 'not-allowed',
          bg: 'bg.subtle',
          color: { base: 'gray.1000', _dark: 'gray.400' },
          fontWeight: 'semibold',
        }}
        {...props}
        css={mergeCss(
          noZoomOnFocus,
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
