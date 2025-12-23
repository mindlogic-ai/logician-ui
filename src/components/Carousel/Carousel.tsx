// src/components/Carousel.tsx

import React, { Children, useEffect, useRef, useState } from 'react';
import { Box, Flex, HStack, useBreakpointValue } from '@chakra-ui/react';

import { IoChevronForward, IoIosArrowBack } from '../Icon';
import { IconButton } from '../IconButton';
import { CarouselProps } from './Carousel.types';

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoplayDuration,
  currentSlide: controlledCurrentSlide,
  onSlideChange,
  defaultSlide = 0,
  showIndicators = true,
  showArrows = true,
  ...rest
}) => {
  const slides = Children.toArray(children);
  const slidesCount = slides.length;

  // Determine button size based on screen size
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' }) as 'sm' | 'md';

  // Controlled vs Uncontrolled
  const isControlled = controlledCurrentSlide !== undefined;

  // Internal state for uncontrolled usage
  const [internalCurrentSlide, setInternalCurrentSlide] = useState<number>(
    defaultSlide >= 0 && defaultSlide < slidesCount ? defaultSlide : 0
  );

  // Determine the current slide
  const currentSlide = isControlled
    ? controlledCurrentSlide!
    : internalCurrentSlide;

  // Create a ref to store the timer ID
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoplay = () => {
    if (autoplayDuration && autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, autoplayDuration);
    }
  };

  const changeSlide = (newSlide: number) => {
    if (isControlled) {
      onSlideChange?.(newSlide);
    } else {
      setInternalCurrentSlide(newSlide);
    }
    resetAutoplay();
  };

  const handlePrev = () => {
    const newSlide = currentSlide === 0 ? slidesCount - 1 : currentSlide - 1;
    changeSlide(newSlide);
  };

  const handleNext = () => {
    const newSlide = currentSlide === slidesCount - 1 ? 0 : currentSlide + 1;
    changeSlide(newSlide);
  };

  const handleIndicatorClick = (index: number) => {
    changeSlide(index);
  };

  useEffect(() => {
    if (autoplayDuration) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, autoplayDuration);

      // Cleanup on unmount
      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [slidesCount, autoplayDuration, currentSlide]); // Added currentSlide to dependencies

  if (!slides) return null;

  return (
    <Box position="relative" width="full" overflow="hidden" {...rest}>
      {/* Slides Container */}
      <Flex
        width={`${slidesCount * 100}%`}
        transition="transform 0.5s ease-in-out"
        transform={`translateX(-${currentSlide * (100 / slidesCount)}%)`}
      >
        {slides.map((child, index) => (
          <Box flex={1} key={`slide-${index}`}>
            {child}
          </Box>
        ))}
      </Flex>

      {/* Previous Button */}
      {showArrows && (
        <IconButton
          aria-label="Previous Slide"
          icon={<IoIosArrowBack />}
          position="absolute"
          left={3}
          top="50%"
          transform="translateY(-50%)"
          zIndex="1"
          onClick={handlePrev}
          size={buttonSize}
        />
      )}

      {/* Next Button */}
      {showArrows && (
        <IconButton
          aria-label="Next Slide"
          icon={<IoChevronForward />}
          position="absolute"
          right={3}
          top="50%"
          transform="translateY(-50%)"
          zIndex="1"
          onClick={handleNext}
          size={buttonSize}
        />
      )}

      {/* Indicators */}
      {showIndicators && (
        <HStack
          position="absolute"
          bottom={3}
          width="full"
          justifyContent="center"
          gap={2}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              cursor="pointer"
              boxSize={currentSlide === index ? 3 : 2}
              bg={currentSlide === index ? 'gray.600' : 'gray.300'}
              borderRadius="full"
              onClick={() => handleIndicatorClick(index)}
              transition="background-color 0.3s, box-size 0.3s"
            />
          ))}
        </HStack>
      )}
    </Box>
  );
};
