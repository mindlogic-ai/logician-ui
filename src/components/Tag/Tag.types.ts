import { Tag } from '@chakra-ui/react';

type ChakraTagRootProps = React.ComponentProps<typeof Tag.Root>;

// Omit Chakra's variant and define our own custom variants
export interface TagProps extends Omit<ChakraTagRootProps, 'variant'> {
  variant?: 'default' | 'active';
}
