import DotLoader from 'react-spinners/DotLoader';
import { Flex, FlexProps, useToken } from '@chakra-ui/react';

import theme from '../../theme';

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
      bg="white"
      transition="0.3 opacity ease"
      zIndex={9999}
      {...rest}
    >
      <DotLoader
        color={useToken('colors', theme.semanticTokens.colors.primary.main)}
      />
    </Flex>
  );
};
