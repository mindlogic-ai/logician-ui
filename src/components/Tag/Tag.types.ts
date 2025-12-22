import { Tag } from '@chakra-ui/react';

type ChakraTagRootProps = React.ComponentProps<typeof Tag.Root>;

export interface TagProps extends ChakraTagRootProps {
  variant?: 'default' | 'active';
}
