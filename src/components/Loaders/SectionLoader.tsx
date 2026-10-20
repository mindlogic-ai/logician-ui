import { Flex } from '@chakra-ui/react';

import { Spinner } from '@/components/Spinner';

import { useLoaderStatus } from './LoaderStatus';
import type { LoaderProps } from './PageLoader';
import { ThinkingDots } from './ThinkingDots';

export const SectionLoader = ({
  isLoading,
  variant = 'default',
  label,
  ...rest
}: LoaderProps) => {
  const { statusProps, statusText } = useLoaderStatus(isLoading, label);
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
      {...statusProps}
      {...rest}
    >
      {statusText}
      {variant === 'thinking' ? (
        <ThinkingDots />
      ) : (
        <Spinner boxSize="60px" borderWidth="6px" />
      )}
    </Flex>
  );
};
