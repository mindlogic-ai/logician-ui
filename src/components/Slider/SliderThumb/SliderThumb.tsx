import { ForwardedRef, forwardRef } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderThumbProps } from './SliderThumb.types';

export const SliderThumb = forwardRef(
  (
    { index = 0, ...rest }: SliderThumbProps & { index?: number },
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Slider.Thumb
        index={index}
        boxSize={4}
        bg="white"
        borderColor="primary.main"
        borderWidth={3}
        borderStyle="solid"
        _disabled={{
          bg: 'gray.100',
          borderColor: 'gray.400',
          cursor: 'not-allowed',
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

SliderThumb.displayName = 'SliderThumb';
