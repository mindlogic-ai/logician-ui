import { ComponentType, SVGProps } from 'react';
import { IconType as ReactIconType } from 'react-icons/lib';
import { BoxProps } from '@chakra-ui/react';

import { IconType } from './IconMap';

type SVGIconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type ReactIconComponent = ReactIconType;

// Icon props with either a predefined icon key OR a custom icon component
export type IconProps = Partial<SVGProps<SVGElement>> &
  // Omit the size prop to avoid confusion. Only the boxSize prop should be used
  Omit<BoxProps, 'size' | 'icon'> &
  (
    | {
        icon: IconType;
        iconComponent?: never;
      }
    | {
        icon?: never;
        iconComponent: SVGIconComponent | ReactIconComponent;
      }
  );
