import { Box, Flex } from '@chakra-ui/react';

import { useTranslate } from '@/hooks/useTranslate';

import { Button } from '../Button';
import { Card } from '../Card';
import { FaRegCopy } from '../Icon';
import { CopyableCodeProps } from './CopyableCode.types';
/**
 * Intended for a quick one-click copy of one-liner code snippets.
 *
 * @example
 * <CopyableCode onCopy={() => {}}>
 *   {`const example = 'This is a code example';
 *    console.log(example);`}
 * </CopyableCode>
 */
export const CopyableCode = ({
  children,
  onCopy,
  containerProps,
}: CopyableCodeProps) => {
  const translate = useTranslate();
  return (
    <Flex position="relative" width="100%" {...containerProps}>
      <Card overflow="hidden" maxW="100%" p={0} width="100%">
        <Box as="pre" whiteSpace="nowrap" overflowX="scroll" p={4} pr={20}>
          {children}
        </Box>
        <Box
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          w={24}
          bg="linear-gradient(to right, transparent, #fff 15%)"
          pointerEvents="none"
        />
      </Card>
      <Button
        colorScheme="primary"
        variant="solid"
        size="xs"
        onClick={onCopy}
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
      >
        <FaRegCopy boxSize="xs" /> {translate('copy')}
      </Button>
    </Flex>
  );
};
