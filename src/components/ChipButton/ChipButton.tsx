import { ForwardedRef, forwardRef } from 'react';
import { Button as ChakraButton, ButtonProps, Group } from '@chakra-ui/react';

import { ChipButtonPropsTypes } from './Chip.types';

export const ChipButton = forwardRef(
  (
    {
      rightIcon,
      leftIcon,
      children,
      ...rest
    }: ChipButtonPropsTypes & ButtonProps,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <ChakraButton border="1px solid" width="fit-content" {...rest} ref={ref}>
        <Group gap={1}>
          {leftIcon}
          {children}
          {rightIcon}
        </Group>
      </ChakraButton>
    );
  }
);

ChipButton.displayName = 'ChipButton';
