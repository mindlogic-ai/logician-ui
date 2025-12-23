import { Menu } from '@chakra-ui/react';
import { ComponentProps } from 'react';

import { Button } from '@/components/Button';
import type { ButtonProps } from '@/components/Button/Button.types';
import { IconButton } from '@/components/IconButton';
import type { IconButtonProps as CustomIconButtonProps } from '@/components/IconButton/IconButton.types';

// as 속성에 들어갈 `Button`과 `IconButton`에 따른 조건부 타입
interface ButtonMenuButtonProps extends Omit<ButtonProps, 'as'> {
  as: typeof Button;
  rightIcon?: React.ReactElement;
  icon?: never;
  children?: React.ReactNode;
}

interface IconButtonMenuButtonProps extends Omit<CustomIconButtonProps, 'as'> {
  as: typeof IconButton;
  icon?: React.ReactElement;
  rightIcon?: never;
  'aria-label': string;
  children?: React.ReactNode;
}

export type CustomMenuButtonProps =
  | ButtonMenuButtonProps
  | IconButtonMenuButtonProps;
