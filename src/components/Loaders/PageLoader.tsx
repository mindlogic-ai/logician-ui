import { Box, Flex, FlexProps } from '@chakra-ui/react';

import { Spinner } from '@/components/Spinner';

export const PageLoader = ({
  isLoading,
  ...rest
}: FlexProps & { isLoading: boolean }) => {
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
      {...rest}
    >
      <Box position="relative">
        <Spinner boxSize="60px" borderWidth="6px" css={{ zIndex: 999 }} />
      </Box>
    </Flex>
  );
};
