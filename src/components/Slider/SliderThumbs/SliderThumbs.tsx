import { forwardRef } from 'react';
import { Slider } from '@chakra-ui/react';

/**
 * SliderThumbs - Convenience component that automatically renders thumbs
 * based on the slider value array length.
 *
 * This is a thin wrapper around Chakra UI's Slider.Thumbs.
 * Colors are inherited from Slider root component via CSS variables.
 * For individual thumb customization, use SliderThumb with explicit index prop.
 *
 * @example
 * Single slider:
 * <Slider defaultValue={[50]}>
 *   <SliderThumbs />
 * </Slider>
 *
 * Range slider:
 * <Slider defaultValue={[20, 80]}>
 *   <SliderThumbs />
 * </Slider>
 */
export const SliderThumbs = forwardRef((props, _ref) => {
  return (
    <Slider.Thumbs
      boxSize={4}
      bg="white"
      borderColor="primary.main"
      borderWidth={3}
      borderStyle="solid"
      {...props}
    />
  );
});

SliderThumbs.displayName = 'SliderThumbs';
