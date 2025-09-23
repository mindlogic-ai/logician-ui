import { SVGProps } from 'react';
import { BoxProps } from '@chakra-ui/react';

import { IconType } from './IconMap';

// Icon props: 문자열 방식 또는 JSX element 방식
export type IconProps = Partial<SVGProps<SVGElement>> &
  // Omit the size prop to avoid confusion. Only the boxSize prop should be used
  Omit<BoxProps, 'size' | 'icon'> & {
    icon: IconType | React.ReactElement; // 문자열 또는 JSX 요소
  };
