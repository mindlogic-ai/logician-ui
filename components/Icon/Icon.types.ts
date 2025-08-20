import { SVGProps } from 'react';
import { BoxProps } from '@chakra-ui/react';

import { IconType } from './IconMap';

export type IconProps = Partial<SVGProps<SVGElement>> &
  // Omit the size prop to avoid confusion. Only the boxSize prop should be used
  Omit<BoxProps, 'size' | 'icon'> & {
    icon: IconType;
  };
