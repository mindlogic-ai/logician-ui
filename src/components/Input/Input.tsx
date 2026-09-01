import {
  CompositionEvent,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input as ChakraInput, InputGroup } from '@chakra-ui/react';

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
    const isComposing = useRef(false);
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

    // Format the value if maskNumber is true and type is number
    const getFormattedValue = (val: typeof propValue) => {
      if (
        maskNumber &&
        type === 'number' &&
        val !== undefined &&
        val !== null &&
        val !== ''
      ) {
        const numVal = typeof val === 'string' ? parseFloat(val) : val;
        if (!isNaN(numVal as number)) {
          return formatNumber(numVal as number);
        }
      }
      return val;
    };

    const [currentValue, setCurrentValue] = useState<
      string | number | readonly string[] | undefined
    >(getFormattedValue(propValue));

    /** The latest value from outside, including one that arrives mid-composition. */
    const externalValue = useRef(propValue);
    /** What the outside value was when the current composition opened. */
    const externalValueAtCompositionStart = useRef(propValue);
    /**
     * The text the node held when a composition just ended. Browsers often fire
     * a trailing `input` carrying exactly that text, which would emit the same
     * change twice; the next change matching this is swallowed.
     */
    const textAtCompositionEnd = useRef<string | null>(null);

    // Adopt the outside value only *between* compositions. Writing `.value`
    // onto the node while an IME composition is open ends that composition:
    // the half-built jamo is left behind as literal text and the finished
    // syllable lands on top of it (`학사지원` typed → `학사ㅈ지원`). A write
    // that lands mid-composition is deferred, not discarded — see
    // handleCompositionEnd.
    useEffect(() => {
      externalValue.current = propValue;
      if (isComposing.current) return;
      setCurrentValue(getFormattedValue(propValue));
    }, [propValue]);

    // 한글 타이핑 관련 버그 해결을 위해 composition event handler들을 사용합니다
    const handleCompositionStart = (e: CompositionEvent<HTMLInputElement>) => {
      isComposing.current = true;
      externalValueAtCompositionStart.current = externalValue.current;
      if (onCompositionStart) onCompositionStart(e);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (isComposing.current) {
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

    // Applies the formatting/filtering rules and emits outward. Only ever
    // called when no composition is open, so the value it writes back onto the
    // node cannot interrupt an IME.
    const commitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let processedValue = e.target.value;

      // Handle trimWhiteSpace: prevent initial spaces and trim pasted content
      if (trimWhiteSpace) {
        // If input becomes entirely whitespace, clear it
        if (processedValue.trim() === '') {
          setCurrentValue('');
          if (onChange) {
            onChange(createSyntheticEvent(e, ''));
          }
          return;
        }
        // Trim leading and trailing spaces from non-empty content
        processedValue = processedValue.trim();
      }

      // Handle noSpaces: remove all spaces
      // prevent whitespace insertion on copy paste bug
      if (noSpaces) {
        processedValue = processedValue.replace(/\s/g, '');
      }

      if (maskNumber && type === 'number') {
        const oldValue = String(currentValue || '');
        const oldCursorPos = e.target.selectionStart || 0;

        // Remove commas for processing
        const unformatted = unformatNumber(processedValue);

        // Update display value with formatting
        if (unformatted === '') {
          setCurrentValue('');
          cursorPosition.current = 0;
          setShouldRestoreCursor(true);
        } else {
          const num = parseFloat(unformatted);
          if (!isNaN(num)) {
            const newFormattedValue = formatNumber(num);
            setCurrentValue(newFormattedValue);

            // Calculate and store new cursor position
            cursorPosition.current = calculateCursorPosition(
              oldValue,
              newFormattedValue,
              oldCursorPos
            );
            setShouldRestoreCursor(true);
          } else {
            setCurrentValue(unformatted);
            cursorPosition.current = oldCursorPos;
            setShouldRestoreCursor(true);
          }
        }

        // Pass the raw numeric value to onChange
        if (onChange) {
          onChange(createSyntheticEvent(e, unformatted));
        }
      } else {
        setCurrentValue(processedValue);
        if (onChange) {
          onChange(createSyntheticEvent(e, processedValue));
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // The trailing `input` a browser fires right after `compositionend`
      // carries text this component has already committed. Emitting it again
      // would double the change for the consumer.
      const alreadyCommitted = textAtCompositionEnd.current;
      textAtCompositionEnd.current = null;
      if (!isComposing.current && alreadyCommitted === e.target.value) return;

      if (isComposing.current) {
        // Mid-composition: show exactly what the IME put in the node and emit
        // nothing. Any transform here would be written back onto the node and
        // end the composition. The rules are applied to the finished text in
        // handleCompositionEnd instead.
        setCurrentValue(e.target.value);
        return;
      }

      commitChange(e);
    };

    const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
      isComposing.current = false;
      const node = e.currentTarget;
      textAtCompositionEnd.current = node.value;

      if (externalValue.current !== externalValueAtCompositionStart.current) {
        // Something outside moved the value while the syllable was in flight —
        // a form reset, a filter clear. Refusing it during the composition was
        // about not breaking the IME, not about ignoring it, so apply it now.
        setCurrentValue(getFormattedValue(externalValue.current));
      } else {
        // `compositionend`'s target is the same input node, so the fields
        // commitChange reads (`value`, `name`, `selectionStart`) are all there.
        commitChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
      }

      if (onCompositionEnd) onCompositionEnd(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (maskNumber && type === 'number' && e.target.value) {
        const numericValue = parseFloat(unformatNumber(e.target.value));
        if (!isNaN(numericValue)) {
          setCurrentValue(formatNumber(numericValue));

          if (rest.onBlur) {
            // Create a new native event to ensure Formik properly updates
            const nativeEvent = Object.create(e.nativeEvent);
            const newTarget = {
              ...e.target,
              value: numericValue.toString(),
              name: e.target.name,
            };

            // Create a new synthetic event that Formik will recognize
            const syntheticEvent = {
              ...e,
              nativeEvent,
              target: newTarget,
              currentTarget: newTarget,
            };

            rest.onBlur(syntheticEvent as React.FocusEvent<HTMLInputElement>);
          }
        }
      } else if (rest.onBlur) {
        rest.onBlur(e);
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
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
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
