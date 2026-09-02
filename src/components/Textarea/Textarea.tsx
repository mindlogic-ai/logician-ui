import {
  ChangeEvent,
  CompositionEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Textarea as ChakraTextarea } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder,
      onChange,
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
    const [currentValue, setCurrentValue] = useState<
      string | number | readonly string[] | undefined
    >(propValue);

    const isComposing = useRef(false);
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
      setCurrentValue(propValue);
    }, [propValue]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      // The trailing `input` a browser fires right after `compositionend`
      // carries text this component has already emitted.
      const alreadyEmitted = textAtCompositionEnd.current;
      textAtCompositionEnd.current = null;
      if (!isComposing.current && alreadyEmitted === e.target.value) return;

      setCurrentValue(e.target.value);

      // Mid-composition: display only. Emitting would let the consumer write
      // the value back and end the composition.
      if (isComposing.current) return;

      if (onChange) {
        onChange(e);
      }
    };

    const handleCompositionStart = (
      e: CompositionEvent<HTMLTextAreaElement>
    ) => {
      isComposing.current = true;
      externalValueAtCompositionStart.current = externalValue.current;
      if (onCompositionStart) onCompositionStart(e);
    };

    const handleCompositionEnd = (e: CompositionEvent<HTMLTextAreaElement>) => {
      isComposing.current = false;
      const node = e.currentTarget;
      textAtCompositionEnd.current = node.value;

      if (externalValue.current !== externalValueAtCompositionStart.current) {
        // Something outside moved the value while the syllable was in flight —
        // a form reset, a filter clear. Refusing it during the composition was
        // about not breaking the IME, not about ignoring it, so apply it now.
        setCurrentValue(externalValue.current);
      } else {
        setCurrentValue(node.value);
        // `compositionend`'s target is the same textarea node, so
        // `event.target.value` / `event.currentTarget.value` are the finished
        // text the consumer needs.
        if (onChange) {
          onChange(e as unknown as ChangeEvent<HTMLTextAreaElement>);
        }
      }

      if (onCompositionEnd) onCompositionEnd(e);
    };

    return (
      <ChakraTextarea
        ref={ref}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
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
