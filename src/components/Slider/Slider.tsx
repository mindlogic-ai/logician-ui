import { Children, ForwardedRef, forwardRef, isValidElement } from 'react';
import { Slider as ChakraSlider } from '@chakra-ui/react';

import { SliderProps } from './Slider.types';
import { SliderControl } from './SliderControl';

/**
 * Slider component using Chakra UI v3 API.
 *
 * Uses v3 API pattern:
 * - value: number[]
 * - onValueChange: (details) => void
 *
 * Automatically wraps children in SliderControl if not already wrapped.
 */
export const Slider = forwardRef(
  (
    {
      value,
      defaultValue,
      onValueChange,
      ariaLabel,
      children,
      ...rest
    }: SliderProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
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
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...rest}
      >
        {/* The label part is what each thumb's `aria-labelledby` points at, and
            the reference is emitted whether or not the part is rendered — so a
            slider composed without one is not merely unlabelled, it is unnamed
            (KWCAG 5.3.4.1 레이블 제공). Hidden, because these call sites carry
            their label as an adjacent icon or time display. */}
        {ariaLabel && (
          <ChakraSlider.Label srOnly>{ariaLabel}</ChakraSlider.Label>
        )}
        {wrappedChildren}
      </ChakraSlider.Root>
    );
  }
);

Slider.displayName = 'Slider';
