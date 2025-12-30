import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

export interface SliderControlProps {
  children?: ReactNode;
}

export const SliderControl = forwardRef(
  (
    { children, ...rest }: SliderControlProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Slider.Control {...rest} ref={ref}>
        {children}
      </Slider.Control>
    );
  }
);

SliderControl.displayName = 'SliderControl';
