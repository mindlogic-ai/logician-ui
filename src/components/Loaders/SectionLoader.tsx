import DotLoader from 'react-spinners/DotLoader';
import { Flex, FlexProps } from '@chakra-ui/react';

export const SectionLoader = ({
  isLoading,
  ...rest
}: FlexProps & { isLoading: boolean }) => {
  if (!isLoading) return null;
  return (
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      top={0}
      left={0}
      align="center"
      justify="center"
      bg="white"
      transition="0.3s opacity ease"
      zIndex={9999}
      {...rest}
    >
      <DotLoader color="var(--chakra-colors-primary-main)" />
    </Flex>
  );
};
