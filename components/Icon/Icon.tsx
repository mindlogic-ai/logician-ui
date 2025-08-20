import React, { forwardRef } from 'react';
import { IconType as ReactIconType } from 'react-icons/lib';
import { chakra, useToken } from '@chakra-ui/react';

import { modeStyles } from '@/components/Icon/Icon.styles';
import ColorModeStore from '@/store/colorMode';

import { IconProps } from './Icon.types';
import { CUSTOM_ICON_MAP, REACT_ICONS_MAP } from './IconMap';

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon,
      color,
      boxSize = 'md', // Default to 'md' size
      ...rest
    }: IconProps,
    ref,
  ) => {
    const { colorMode } = ColorModeStore();

    // Map `boxSize` to Chakra size tokens using `useToken`
    const sizeMapping = {
      xs: '4',
      sm: '5',
      md: '6',
      lg: '8',
      xl: '10',
    };

    const mappedBoxSize =
      sizeMapping[boxSize as keyof typeof sizeMapping] || boxSize;
    const [resolvedBoxSize] = useToken('sizes', [
      mappedBoxSize as string | number,
    ]);
    const [resolvedColor] = useToken('colors', [color || '']);

    // Handle react-icons
    if (icon in REACT_ICONS_MAP) {
      const IconComponent = chakra(REACT_ICONS_MAP[icon] as ReactIconType);
      return (
        <IconComponent
          size={resolvedBoxSize}
          color={resolvedColor || color}
          ref={ref}
          {...rest}
        />
      );
    }

    // Handle custom SVG icons
    let IconComponent = CUSTOM_ICON_MAP[icon];
    if (!IconComponent) {
      console.warn(
        `No icon component found for ${icon}. Rendering fallback icon.`,
      );
      IconComponent = CUSTOM_ICON_MAP['VerticalEllipsis'];
    }

    // Wrap the custom icon in Chakra's `chakra` for compatibility
    const ChakraIcon = chakra(IconComponent);

    return (
      <ChakraIcon
        {...modeStyles[colorMode]}
        color={resolvedColor}
        boxSize={resolvedBoxSize}
        ref={ref}
        {...rest}
      />
    );
  },
);

Icon.displayName = 'Icon';
