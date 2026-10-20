import { Flex, FlexProps } from '@chakra-ui/react';

import { Spinner } from '@/components/Spinner';

import type { LoaderVariant } from './PageLoader';
import { ThinkingDots } from './ThinkingDots';

export const SectionLoader = ({
  isLoading,
  variant = 'default',
  ...rest
}: FlexProps & { isLoading: boolean; variant?: LoaderVariant }) => {
  if (!isLoading) return;
  return (
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      top={0}
      left={0}
      align="center"
      justify="center"
      bg="bg.canvas"
      animationStyle="feedback"
      transitionProperty="opacity"
      zIndex={9999}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      {...rest}
    >
      {variant === 'thinking' ? (
        <ThinkingDots />
      ) : (
        <Spinner boxSize="60px" borderWidth="6px" />
      )}
    </Flex>
  );
};
