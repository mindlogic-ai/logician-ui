import { BoxProps } from '@chakra-ui/react';

export interface CarouselProps extends BoxProps {
  /**
   * Will autoplay if defined
   */
  autoplayDuration?: number;
  currentSlide?: number;
  onSlideChange?: (newSlide: number) => void;
  /**
   * @default 0
   */
  defaultSlide?: number;
  /**
   * @default true
   */
  showIndicators?: boolean;
  /**
   * @default true
   */
  showArrows?: boolean;
}
