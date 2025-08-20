import { ForwardedRef, forwardRef } from 'react';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

import { ChipButtonPropsTypes } from './Chip.types';

export const ChipButton = forwardRef(
  (
    { rightIcon, leftIcon, ...rest }: ChipButtonPropsTypes & ButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <ChakraButton
        rightIcon={rightIcon ?? undefined}
        leftIcon={leftIcon ?? undefined}
        iconSpacing={1}
        border="1px solid"
        width="fit-content"
        {...rest}
        ref={ref}
      />
    );
  },
);

ChipButton.displayName = 'ChipButton';
