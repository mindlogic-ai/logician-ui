import BounceLoader from 'react-spinners/BounceLoader';
import { Box, Flex, FlexProps } from '@chakra-ui/react';

export const PageLoader = ({
  isLoading,
  ...rest
}: FlexProps & { isLoading: boolean }) => {
  return (
    <Flex
      position="fixed"
      w="100vw"
      h="100vh"
      top={0}
      left={0}
      align="center"
      justify="center"
      opacity={isLoading ? 0.5 : 0}
      transition="0.3s opacity ease"
      bg="white"
      zIndex={9999}
      {...rest}
    >
      <Box position="relative">
        <BounceLoader color="var(--chakra-colors-blue-500)" style={{ zIndex: 999 }} />
      </Box>
    </Flex>
  );
};
