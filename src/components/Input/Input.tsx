import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input as ChakraInput, InputGroup } from '@chakra-ui/react';

import {
  CompositionFieldValue,
  useCompositionSafeValue,
} from '@/hooks/useCompositionSafeValue';
import { noZoomOnFocus } from '@/theme/formControls';
import { formatNumber } from '@/utils/formatNumber';
import { mergeCss } from '@/utils/mergeCss';

import { InputProps } from './Input.types';

// Helper function for unformatting numbers
const unformatNumber = (value: string) => {
  // Remove commas and any non-digit characters except decimal point
  return value.replace(/,/g, '').replace(/[^\d.]/g, '');
};

// Helper function to calculate cursor position after formatting
const calculateCursorPosition = (
  oldValue: string,
  newValue: string,
  oldCursorPos: number
): number => {
  // Count commas before cursor in old value
  const commasBeforeCursorOld = (
    oldValue.slice(0, oldCursorPos).match(/,/g) || []
  ).length;

  // Get the position in the unformatted string
  const unformattedPos = oldCursorPos - commasBeforeCursorOld;

  // Count commas before this position in new value
  let newPos = 0;
  let unformattedCount = 0;

  for (
    let i = 0;
    i < newValue.length && unformattedCount < unformattedPos;
    i++
  ) {
    if (newValue[i] !== ',') {
      unformattedCount++;
    }
    newPos = i + 1;
  }

  return Math.min(newPos, newValue.length);
};

export const Input = forwardRef(
  (
    {
      leftIcon,
      rightIcon,
      onKeyDown,
      onBlur,
      onCompositionEnd,
      onCompositionStart,
      maxLength,
      value: propValue,
      onChange,
      size,
      wrapperProps,
      maskNumber = false,
      type,
      _hover,
      _focus,
      trimWhiteSpace = false,
      noSpaces = false,
      disabled,
      invalid,
      readOnly,
      borderColor,
      css,
      ...rest
    }: InputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const rightElementRef = useRef<HTMLDivElement>(null);
    const [rightElementWidth, setRightElementWidth] = useState(0);
    const cursorPosition = useRef<number | null>(null);
    const [shouldRestoreCursor, setShouldRestoreCursor] = useState(false);

    useEffect(() => {
      if (rightElementRef.current) {
        setRightElementWidth(rightElementRef.current.offsetWidth);
      }
    }, [rightElementRef.current]);

    // Restore cursor position after formatting
    useEffect(() => {
      if (
        shouldRestoreCursor &&
        cursorPosition.current !== null &&
        maskNumber &&
        type === 'number'
      ) {
        const inputElement = ref && 'current' in ref ? ref.current : null;
        if (inputElement) {
          inputElement.setSelectionRange(
            cursorPosition.current,
            cursorPosition.current
          );
          cursorPosition.current = null;
          setShouldRestoreCursor(false);
        }
      }
    }, [shouldRestoreCursor, maskNumber, type, ref]);

    const isMaskedNumber = maskNumber && type === 'number';

    // Format the value if maskNumber is true and type is number
    const getFormattedValue = (val: CompositionFieldValue) => {
      if (isMaskedNumber && val !== undefined && val !== null && val !== '') {
        const numVal = typeof val === 'string' ? parseFloat(val) : val;
        if (!isNaN(numVal as number)) {
          return formatNumber(numVal as number);
        }
      }
      return val;
    };

    // The value handed to the consumer for a given node text.
    const normalize = (raw: string) => {
      let processedValue = raw;

      // Handle trimWhiteSpace: prevent initial spaces and trim pasted content
      if (trimWhiteSpace) {
        // If input becomes entirely whitespace, clear it
        if (processedValue.trim() === '') return '';
        // Trim leading and trailing spaces from non-empty content
        processedValue = processedValue.trim();
      }

      // Handle noSpaces: remove all spaces
      // prevent whitespace insertion on copy paste bug
      if (noSpaces) {
        processedValue = processedValue.replace(/\s/g, '');
      }

      // Pass the raw numeric value (commas removed) to onChange
      if (isMaskedNumber) {
        processedValue = unformatNumber(processedValue);
      }

      return processedValue;
    };

    // Helper function to create synthetic event with filtered value
    const createSyntheticEvent = (
      originalEvent: React.ChangeEvent<HTMLInputElement>,
      newValue: string
    ) => {
      // Create a new native event to ensure Formik properly updates
      const nativeEvent = Object.create(originalEvent.nativeEvent);
      const newTarget = {
        ...originalEvent.target,
        value: newValue,
        name: originalEvent.target.name,
      };

      // Create a new synthetic event that Formik will recognize
      const syntheticEvent = {
        ...originalEvent,
        nativeEvent,
        target: newTarget,
        currentTarget: newTarget,
      } as React.ChangeEvent<HTMLInputElement>;

      return syntheticEvent;
    };

    // 한글·일본어·중국어 IME 조합 중에는 밖에서 들어오는 value 를 노드에 쓰지 않고
    // (쓰면 조합이 끊겨 `학사ㅈ지원` 이 된다), onChange 는 키 입력마다 그대로
    // 내보낸다. trimWhiteSpace·noSpaces·maskNumber 는 조합 중에는 내보내는 값에만
    // 적용하고 화면(노드)에는 compositionend 에서 적용한다. 자세한 규칙은
    // useCompositionSafeValue 의 docstring.
    const field = useCompositionSafeValue<HTMLInputElement>({
      value: propValue,
      normalize,
      toDisplay: getFormattedValue,
      emit: (e, next) => onChange?.(createSyntheticEvent(e, next)),
      onCompositionStart,
      onCompositionEnd,
    });
    const currentValue = field.value;

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        // Enter during a composition means "commit this syllable", never
        // "submit". `nativeEvent.isComposing` / keyCode 229 also cover
        // WebKit, which fires `compositionend` *before* this keydown.
        if (
          field.isComposing() ||
          e.nativeEvent.isComposing ||
          e.keyCode === 229
        ) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (onKeyDown) onKeyDown(e);
      }

      // trimWhiteSpace prop이 존재하고, 입력된 값이 아예 없는 경우만 스페이스바를 통한 공백 입력 금지
      // noSpaces prop이 존재하고, 스페이스바를 통한 공백 일체 입력 금지
      if (
        (noSpaces || (trimWhiteSpace && currentValue === '')) &&
        e.key.match(/\s/)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Caret restore for the comma formatting. Skipped while composing: the
      // display is not reformatted then, so there is nothing to restore.
      if (isMaskedNumber && !field.isComposing()) {
        const oldValue = String(currentValue || '');
        const oldCursorPos = e.target.selectionStart || 0;
        const unformatted = normalize(e.target.value);

        if (unformatted === '') {
          cursorPosition.current = 0;
        } else if (!isNaN(parseFloat(unformatted))) {
          cursorPosition.current = calculateCursorPosition(
            oldValue,
            formatNumber(parseFloat(unformatted)),
            oldCursorPos
          );
        } else {
          cursorPosition.current = oldCursorPos;
        }
        setShouldRestoreCursor(true);
      }

      field.onChange(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // A keyboard that never sent `compositionend` (seen on Android) must not
      // leave the field ignoring outside values after it loses focus.
      field.finishOnBlur(e);

      // Kept exactly as it behaved before this handler was reachable with a
      // consumer `onBlur` (it used to be overridden by `{...rest}`): the
      // consumer gets the original event, and the blur-time comma reformat
      // only happens when there is no consumer handler.
      if (onBlur) {
        onBlur(e);
        return;
      }
      if (isMaskedNumber && e.target.value) {
        const numericValue = parseFloat(unformatNumber(e.target.value));
        if (!isNaN(numericValue)) {
          field.setValue(formatNumber(numericValue));
        }
      }
    };

    // If maskNumber is true and type is number, we need to use text type
    // to allow for comma formatting
    const inputType = maskNumber && type === 'number' ? 'text' : type;

    return (
      <InputGroup
        startElement={leftIcon}
        endElement={
          rightIcon ? <div ref={rightElementRef}>{rightIcon}</div> : undefined
        }
        {...wrapperProps}
      >
        <ChakraInput
          ref={ref}
          size={size}
          maxLength={maxLength}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onCompositionStart={field.onCompositionStart}
          onCompositionEnd={field.onCompositionEnd}
          onKeyDown={handleKeyDown}
          type={inputType}
          disabled={disabled}
          readOnly={readOnly}
          data-invalid={invalid || undefined}
          bg="bg.surface"
          color="fg.default"
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
          {...rest}
          css={mergeCss(
            noZoomOnFocus,
            {
              paddingInlineEnd: rightElementWidth,
              '--focus-color': 'var(--chakra-colors-primary-main)',
              '--error-color': 'var(--chakra-colors-danger-main)',
            },
            css
          )}
        />
      </InputGroup>
    );
  }
);

Input.displayName = 'Input';
