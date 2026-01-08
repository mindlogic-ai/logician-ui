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
    { value, defaultValue, onValueChange, children, ...rest }: SliderProps,
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
        {wrappedChildren}
      </ChakraSlider.Root>
    );
  }
);

Slider.displayName = 'Slider';
