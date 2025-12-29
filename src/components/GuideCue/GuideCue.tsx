import { RefObject, useEffect, useRef, useState } from 'react';
import { Box, Flex, Popover, Portal } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

import { Button } from '../Button';
import { FaCheck, IoChevronForward } from '../Icon';
import { Subtext, Subtitle } from '../Typography';
import { useGuideCue } from './GuideCueContext';

const PULSE_TIME = 950;

/**
 * The GuideCue component is designed to highlight a specific element on the page.
 *
 * It takes in a containerRef, and renders a Popover over it.
 */

const pulseRing = keyframes`
  0% {
    transform: scale(0.33);
  }
  80%, 100% {
    opacity: 0;
  }
`;

const pulseDot = keyframes`
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
`;

export const GuideCue = ({
  index,
  page: pageProp,
  containerRef,
  title,
  description,
  placement = 'bottom',
  top,
  left,
}: {
  index: number;
  page: string;
  containerRef: RefObject<HTMLElement>;
  title: string;
  description: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  top?: number | string;
  left?: number | string;
}) => {
  const {
    cueRefs,
    page,
    currentIndex,
    setCurrentIndex,
    isDisabled,
    onComplete,
  } = useGuideCue();
  const [isRendered, setIsRendered] = useState(false);
  // Determines if the popover is rendering
  const [isOpen, setIsOpen] = useState(false);
  // Once the popover is closed, it will not open again
  const [isClosed, setIsClosed] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    setIsClosed(true);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    handleClose();
    if (currentIndex === cueRefs.length - 1) {
      onComplete?.();
    }
  };

  useEffect(() => {
    if (
      !isDisabled &&
      page === pageProp &&
      index === currentIndex &&
      cueRefs[index] &&
      containerRef.current
    ) {
      cueRefs[index]?.current?.focus();
      // Set a timeout if it's the first step, but otherwise render immediately
      if (currentIndex === 0) {
        setTimeout(() => {
          setIsRendered(true);
          setTimeout(() => {
            setIsOpen(true);
          }, PULSE_TIME * 2);
        }, 300);
      } else {
        setIsRendered(true);
        setIsOpen(true);
      }
    }
  }, [cueRefs, index, pageProp, currentIndex, containerRef]);

  if (isClosed || isDisabled) {
    return null;
  }

  const pulseRingAnimation = `${pulseRing} ${PULSE_TIME}ms cubic-bezier(0.215, 0.61, 0.355, 1) infinite`;
  const pulseDotAnimation = `${pulseDot} ${PULSE_TIME}ms cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`;

  return (
    <Portal container={containerRef}>
      <Popover.Root
        open={isOpen}
        onOpenChange={(e) => {
          if (!e.open) handleClose();
        }}
        initialFocusEl={() => ctaRef.current}
        positioning={{ placement }}
      >
        {isRendered && (
          <Popover.Trigger {...({ asChild: true } as any)}>
            <button
              style={{
                position: 'absolute',
                top: typeof top === 'number' ? `${top}px` : (top ?? '50%'),
                left: typeof left === 'number' ? `${left}px` : (left ?? '50%'),
                transform: 'translate(-50%, -50%)',
                width: '16px',
                height: '16px',
                opacity: 0.7,
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                zIndex: 2,
              }}
              tabIndex={0}
              ref={(el: HTMLButtonElement | null) => {
                if (cueRefs[index] && el) {
                  (
                    cueRefs[index] as React.MutableRefObject<HTMLButtonElement>
                  ).current = el;
                }
              }}
            >
              <Box
                _before={{
                  content: '""',
                  position: 'absolute',
                  display: 'block',
                  width: '300%',
                  height: '300%',
                  boxSizing: 'border-box',
                  marginLeft: '-100%',
                  marginTop: '-100%',
                  borderRadius: 'full',
                  bgColor: 'primary.main',
                  animation: pulseRingAnimation,
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  bgColor: 'primary.main',
                  borderRadius: 'full',
                  boxShadow: '0 0 8px rgba(0,0,0,.3)',
                  animation: pulseDotAnimation,
                }}
                w={4}
                h={4}
              />
            </button>
          </Popover.Trigger>
        )}
        <Popover.Content {...({ asChild: true } as any)}>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '0',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <Popover.Arrow />
            <Box
              textAlign="left"
              p={0}
              w="fit-content"
              minW="200px"
              maxW="400px"
            >
              <Box color="gray.600">
                <Popover.CloseTrigger {...({ asChild: true } as any)}>
                  <button style={{ all: 'unset', cursor: 'pointer' }}>
                    &times;
                  </button>
                </Popover.CloseTrigger>
              </Box>
              <Box py={4} px={2} color="black">
                {cueRefs.length > 1 && (
                  <Subtext
                    color="primary.dark"
                    opacity={0.5}
                    mb={2}
                    fontSize="subtext"
                  >{`${index + 1} / ${cueRefs.length}`}</Subtext>
                )}
                <Subtitle color="primary.dark" fontWeight="bold" mb={1}>
                  {title}
                </Subtitle>
                <Subtext color="gray.800" fontWeight="normal">
                  {description}
                </Subtext>
              </Box>
              <Flex justifyContent="flex-end" gap={2} w="100%" p={3} pt={0}>
                <Button
                  size="xs"
                  data-testid="guideCue-nextButton"
                  onClick={handleNext}
                  w="fit-content"
                  colorPalette="primary"
                  variant="soft"
                  ref={ctaRef}
                >
                  {currentIndex < cueRefs.length - 1 ? 'Next' : `Got it!`}{' '}
                  {currentIndex < cueRefs.length - 1 ? (
                    <IoChevronForward boxSize="xs" />
                  ) : (
                    <FaCheck boxSize="xs" />
                  )}
                </Button>
              </Flex>
            </Box>
          </div>
        </Popover.Content>
      </Popover.Root>
    </Portal>
  );
};
