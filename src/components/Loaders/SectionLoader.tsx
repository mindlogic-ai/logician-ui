import { Flex, FlexProps } from '@chakra-ui/react';

import { Spinner } from '@/components/Spinner';

export const SectionLoader = ({
  isLoading,
  ...rest
}: FlexProps & { isLoading: boolean }) => {
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
      {...rest}
    >
      <Spinner boxSize="60px" borderWidth="6px" />
    </Flex>
  );
};
