import { Box, HStack } from '@chakra-ui/react';

import { THINKING_DOT_STAGGER, thinkingDotAnimation } from './Loaders.styles';

/**
 * Three coral (`action.mark`) dots pulsing in sequence — the `thinking`
 * loader variant. ARIA lives on the loader shell that renders this, not
 * here, so it stays a pure decoration.
 */
export const ThinkingDots = () => (
  <HStack gap="1.5" aria-hidden="true">
    {[0, 1, 2].map((index) => (
      <Box
        key={index}
        boxSize="8px"
        borderRadius="full"
        bg="action.mark"
        css={{
          ...thinkingDotAnimation,
          animationDelay: `calc(${THINKING_DOT_STAGGER} * ${index})`,
        }}
      />
    ))}
  </HStack>
);

ThinkingDots.displayName = 'ThinkingDots';
