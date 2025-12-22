import { ForwardedRef, forwardRef } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

import { ChipButtonPropsTypes } from './Chip.types';

type ChakraButtonProps = React.ComponentProps<typeof ChakraButton>;

export const ChipButton = forwardRef(
  (
    {
      rightIcon,
      leftIcon,
      children,
      ...rest
    }: ChipButtonPropsTypes & ChakraButtonProps & {
      rightIcon?: React.ReactElement;
      leftIcon?: React.ReactElement;
    },
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <ChakraButton
        gap={1}
        border="1px solid"
        width="fit-content"
        {...rest}
        ref={ref}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </ChakraButton>
    );
  }
);

ChipButton.displayName = 'ChipButton';
