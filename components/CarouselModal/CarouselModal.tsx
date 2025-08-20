import { useRef, useState } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

import { Button } from '@/components/Button';
import { Carousel } from '@/components/Carousel';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
} from '@/components/Modal';
import { useTranslate } from '@/hooks/useTranslate';

import { CarouselModalProps } from './CarouselModal.types';

export const CarouselModal = ({
  slides,
  onClose,
  ...rest
}: CarouselModalProps) => {
  const nextButtonRef = useRef(null);
  const translate = useTranslate();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const handleNextClick = () => {
    if (currentSlide === slides.length - 1) {
      onClose();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const handleBackClick = () => {
    const newSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };
  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleEndClick = () => {
    onClose();
  };

  return (
    <Modal
      size="2xl"
      onClose={onClose}
      initialFocusRef={nextButtonRef}
      {...rest}
    >
      <ModalContent overflow="hidden">
        <ModalCloseButton />
        <ModalBody pb={0} pt={12}>
          <Carousel
            showIndicators={false}
            currentSlide={currentSlide}
            onSlideChange={setCurrentSlide}
            mb={4}
            borderRadius="md"
            overflow="hidden"
          >
            {slides.map((_, index) => (
              <Image
                key={`slider-modal-image-${index}`}
                width="100%"
                height="400px"
                src={slides[index].image}
                alt={`Slide ${index}`}
              />
            ))}
          </Carousel>
          <Box mb={5} textAlign="left">
            {slides[currentSlide].text}
          </Box>
        </ModalBody>
        <ModalFooter mt={4} py={8} borderTop="1px solid" borderColor="gray.300">
          <Button px={0} variant="tertiary" onClick={handleBackClick}>
            {translate('previous')}
          </Button>
          <Flex align="center" flex={1} gap={2} justify="center">
            {slides.map((_, index) => (
              <Box
                key={`slider-modal-slide-text-${index}`}
                cursor="pointer"
                boxSize={currentSlide === index ? 3 : 2}
                bg={currentSlide === index ? 'gray.1000' : 'gray.600'}
                borderRadius="full"
                onClick={() => handleIndicatorClick(index)}
                transition="background-color 0.3s, box-size 0.3s"
              />
            ))}
          </Flex>
          {currentSlide === slides.length - 1 ? (
            <Button px={0} onClick={handleEndClick}>
              {translate('get_started')}
            </Button>
          ) : (
            <Button px={0} onClick={handleNextClick} ref={nextButtonRef}>
              {translate('next')}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
