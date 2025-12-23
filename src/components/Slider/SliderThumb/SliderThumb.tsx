import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Slider } from '@chakra-ui/react';

import { SliderThumbProps } from './SliderThumb.types';

type SliderThumbBaseProps = React.ComponentProps<typeof Slider.Thumb>;
type ExtendedSliderThumbProps = SliderThumbBaseProps & {
  w?: number | string;
  h?: number | string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  boxShadow?: string;
  children?: ReactNode;
};
const SliderThumbComponent = Slider.Thumb as React.FC<ExtendedSliderThumbProps & React.RefAttributes<HTMLDivElement>>;

export const SliderThumb = forwardRef(
  ({ ...rest }: SliderThumbProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return (
      <SliderThumbComponent
        w={4}
        h={4}
        borderWidth="3px"
        borderStyle="solid"
        borderColor="primary.main"
        boxShadow="none"
        {...rest}
        ref={ref}
      />
    );
  }
);

SliderThumb.displayName = 'SliderThumb';
