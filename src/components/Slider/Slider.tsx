import { Children, ForwardedRef, forwardRef, isValidElement } from 'react';
import { Slider as ChakraSlider } from '@chakra-ui/react';

import { SliderProps } from './Slider.types';
import { SliderControl } from './SliderControl';

/**
 * Slider component with v2 backward compatibility.
 *
 * Supports both v2 and v3 usage patterns:
 * - v2: value={number}, onChange={(value) => ...}
 * - v3: value={[number]}, onValueChange={(details) => ...}
 *
 * Automatically wraps children in SliderControl if not already wrapped.
 */
export const Slider = forwardRef(
  (
    {
      value,
      defaultValue,
      onChange,
      onValueChange,
      focusThumbOnChange,
      children,
      ...rest
    }: SliderProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    // Convert v2 single value to v3 array format
    const normalizedValue =
      value !== undefined
        ? Array.isArray(value)
          ? value
          : [value]
        : undefined;

    const normalizedDefaultValue =
      defaultValue !== undefined
        ? Array.isArray(defaultValue)
          ? defaultValue
          : [defaultValue]
        : undefined;

    // Handle both v2 onChange and v3 onValueChange
    const handleValueChange = (details: { value: number[] }) => {
      // Call v3 handler if provided
      onValueChange?.(details);
      // Call v2 handler with single value
      onChange?.(details.value[0]);
    };

    // Check if children already contains SliderControl
    const hasSliderControl = Children.toArray(children).some(
      (child) =>
        isValidElement(child) &&
        (child.type === SliderControl ||
          (child.type as any)?.displayName === 'SliderControl')
    );

    // Wrap children in SliderControl if not already wrapped
    const wrappedChildren = hasSliderControl ? (
      children
    ) : (
      <SliderControl>{children}</SliderControl>
    );

    return (
      <ChakraSlider.Root
        isolation="isolate"
        ref={ref}
        value={normalizedValue}
        defaultValue={normalizedDefaultValue}
        onValueChange={handleValueChange}
        {...rest}
      >
        {wrappedChildren}
      </ChakraSlider.Root>
    );
  }
);

Slider.displayName = 'Slider';
