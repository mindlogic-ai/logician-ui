import {
  Button,
  MenuButtonProps as ChakraMenuButtonProps,
} from '@chakra-ui/react';

import { IconButton } from '@/components/IconButton';

// as 속성에 들어갈 `Button`과 `IconButton`에 따른 조건부 타입
export interface ButtonMenuButtonProps extends ChakraMenuButtonProps {
  as: typeof Button;
  rightIcon?: React.ReactNode;
  icon?: never;
}

export interface IconButtonMenuButtonProps extends ChakraMenuButtonProps {
  as: typeof IconButton;
  icon?: React.ReactNode;
  rightIcon?: never;
}

export type CustomMenuButtonProps =
  | ButtonMenuButtonProps
  | IconButtonMenuButtonProps;
