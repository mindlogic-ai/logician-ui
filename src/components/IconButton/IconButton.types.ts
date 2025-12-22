import { IconButton } from '@chakra-ui/react';

type ChakraIconButtonProps = React.ComponentProps<typeof IconButton>;

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'link';

export type IconButtonProps = Omit<ChakraIconButtonProps, 'variant'> & {
  variant?: IconButtonVariant;
  /**
   * @deprecated Use children instead
   */
  icon?: React.ReactElement;
  /**
   * @deprecated Use disabled instead
   */
  isDisabled?: boolean;
};
