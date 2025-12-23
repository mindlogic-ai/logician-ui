import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { Box, Flex, Popover, Portal } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

type PopoverRootProps = React.ComponentProps<typeof Popover.Root>;
type PopoverCloseTriggerBaseProps = React.ComponentProps<typeof Popover.CloseTrigger>;

// Extended types for Chakra v3 compound components
type PopoverTriggerProps = React.ComponentProps<typeof Popover.Trigger> & {
  children?: ReactNode;
  asChild?: boolean;
};
type PopoverPositionerProps = React.ComponentProps<typeof Popover.Positioner> & {
  children?: ReactNode;
};
type PopoverContentProps = React.ComponentProps<typeof Popover.Content> & {
  children?: ReactNode;
  w?: string;
  minW?: string;
  maxW?: string;
};
type PopoverArrowProps = React.ComponentProps<typeof Popover.Arrow> & {
  children?: ReactNode;
};

// Cast Popover components to extended types
const PopoverTrigger = Popover.Trigger as React.FC<PopoverTriggerProps>;
const PopoverPositioner = Popover.Positioner as React.FC<PopoverPositionerProps>;
const PopoverContent = Popover.Content as React.FC<PopoverContentProps>;
const PopoverArrow = Popover.Arrow as React.FC<PopoverArrowProps>;

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

// Styled close trigger
const CloseButton = (props: PopoverCloseTriggerBaseProps) => (
  <Box
    as={Popover.CloseTrigger}
    position="absolute"
    top={2}
    right={2}
    color="gray.600"
    {...props}
  />
);

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
  placement?: PopoverRootProps['positioning'];
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
    <Portal containerRef={containerRef}>
      <Popover.Root
        open={isOpen}
        onOpenChange={(details) => !details.open && handleClose()}
        initialFocusEl={() => ctaRef.current}
        positioning={placement}
        autoFocus
      >
        {isRendered && (
          <PopoverTrigger asChild>
            <Box
              position="absolute"
              top={top ?? '50%'}
              left={left ?? '50%'}
              transform="translate(-50%, -50%)"
              width={4}
              height={4}
              opacity={0.7}
              tabIndex={0}
              _focus={{
                outline: 'none',
              }}
              ref={(el: HTMLDivElement | null) => {
                if (cueRefs[index] && el) {
                  (
                    cueRefs[index] as React.MutableRefObject<HTMLDivElement>
                  ).current = el;
                }
              }}
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
              zIndex={2}
            />
          </PopoverTrigger>
        )}
        <PopoverPositioner>
          <PopoverContent w="fit-content" minW="200px" maxW="400px">
            <PopoverArrow>
              <Popover.ArrowTip />
            </PopoverArrow>
            <Box textAlign="left" p={0}>
              <CloseButton />
              <Box py={4} px={2} color="black">
                {cueRefs.length > 1 && (
                  <Subtext
                    color="primary.dark"
                    opacity={0.5}
                    mb={2}
                    fontSize="xs"
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
                  variant="secondary"
                  ref={ctaRef}
                >
                  {currentIndex < cueRefs.length - 1 ? 'Next' : `Got it!`}
                  {currentIndex < cueRefs.length - 1 ? (
                    <IoChevronForward boxSize="xs" />
                  ) : (
                    <FaCheck boxSize="xs" />
                  )}
                </Button>
              </Flex>
            </Box>
          </PopoverContent>
        </PopoverPositioner>
      </Popover.Root>
    </Portal>
  );
};
