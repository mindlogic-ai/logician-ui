import { MenuButtonProps as ChakraMenuButtonProps } from '@chakra-ui/react';

import { Button } from '@/components/Button';
import type { ButtonProps } from '@/components/Button/Button.types';
import { IconButton } from '@/components/IconButton';
import type { IconButtonProps as CustomIconButtonProps } from '@/components/IconButton/IconButton.types';

// as 속성에 들어갈 `Button`과 `IconButton`에 따른 조건부 타입
interface ButtonMenuButtonProps
  extends ChakraMenuButtonProps,
    Omit<ButtonProps, 'children'> {
  as: typeof Button;
  rightIcon?: React.ReactElement;
  icon?: never;
}

interface IconButtonMenuButtonProps
  extends Omit<ChakraMenuButtonProps, 'aria-label'>,
    Omit<CustomIconButtonProps, 'children'> {
  as: typeof IconButton;
  icon?: React.ReactElement;
  rightIcon?: never;
  'aria-label': string;
}

export type CustomMenuButtonProps =
  | ButtonMenuButtonProps
  | IconButtonMenuButtonProps;
