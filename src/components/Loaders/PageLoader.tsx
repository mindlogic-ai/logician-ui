import { Box, Flex, FlexProps } from '@chakra-ui/react';

import { Spinner } from '@/components/Spinner';

import { useLoaderStatus } from './LoaderStatus';
import { ThinkingDots } from './ThinkingDots';

export type LoaderVariant = 'default' | 'thinking';

export type LoaderProps = FlexProps & {
  isLoading: boolean;
  variant?: LoaderVariant;
  /**
   * What a screen reader announces while loading. Defaults to the translated
   * "loading" string (`로딩 중`).
   */
  label?: string;
};

export const PageLoader = ({
  isLoading,
  variant = 'default',
  label,
  ...rest
}: LoaderProps) => {
  const { statusProps, statusText } = useLoaderStatus(isLoading, label);
  return (
    <Flex
      position="fixed"
      w="100vw"
      // `dvh`, not `vh`: on mobile `100vh` is the largest viewport, so the
      // overlay ran under the URL bar.
      h="100dvh"
      top={0}
      left={0}
      align="center"
      justify="center"
      opacity={isLoading ? 0.5 : 0}
      animationStyle="feedback"
      transitionProperty="opacity"
      bg="bg.canvas"
      zIndex={9999}
      {...statusProps}
      {...rest}
    >
      {statusText}
      {variant === 'thinking' ? (
        <ThinkingDots />
      ) : (
        <Box position="relative">
          <Spinner boxSize="60px" borderWidth="6px" css={{ zIndex: 999 }} />
        </Box>
      )}
    </Flex>
  );
};
