import {
  AvatarContext,
  AvatarFallback,
  AvatarGroup,
  AvatarIcon,
  AvatarImage,
  AvatarRoot,
  AvatarRootProvider,
} from '@chakra-ui/react';

import { AvatarBase } from './AvatarBase';

export const Avatar = Object.assign(AvatarBase, {
  Root: AvatarRoot,
  RootProvider: AvatarRootProvider,
  Fallback: AvatarFallback,
  Image: AvatarImage,
  Icon: AvatarIcon,
  Group: AvatarGroup,
  Context: AvatarContext,
});
