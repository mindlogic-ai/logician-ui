import React, { forwardRef } from 'react';
import { IconType as ReactIconType } from 'react-icons/lib';
import { chakra, useToken } from '@chakra-ui/react';

import { iconStyles } from '@/components/Icon/Icon.styles';

import { IconProps } from './Icon.types';
import { CUSTOM_ICON_MAP, IconType, REACT_ICONS_MAP } from './IconMap';

// 간단한 캐싱 함수
const iconCache = new Map<string, React.ComponentType<any>>();
const getChakraIcon = (
  component: React.ComponentType<any>,
  cacheKey: string
) => {
  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey)!;
  }
  const ChakraIcon = chakra(component);
  iconCache.set(cacheKey, ChakraIcon);
  return ChakraIcon;
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon,
      color,
      boxSize = 'md', // Default to 'md' size
      ...rest
    }: IconProps,
    ref
  ) => {
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

    // Handle JSX element (react-icons style) - 최고 우선순위
    if (React.isValidElement(icon)) {
      const iconProps = typeof icon.props === 'object' ? icon.props : {};
      const mergedProps = {
        ...iconProps,
        size: resolvedBoxSize,
        color: resolvedColor || color,
        ref: ref,
        ...rest,
      };
      return React.cloneElement(icon, mergedProps);
    }

    // Handle no icon provided
    if (!icon) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('No icon provided. Rendering fallback icon.');
      }
      const fallbackIcon = CUSTOM_ICON_MAP['VerticalEllipsis'];
      const ChakraIcon = getChakraIcon(fallbackIcon, 'fallback');
      return (
        <ChakraIcon
          {...iconStyles}
          width={resolvedBoxSize}
          height={resolvedBoxSize}
          fill={resolvedColor || color || 'currentColor'}
          ref={ref}
          {...rest}
        />
      );
    }

    // Handle react-icons (문자열)
    if (typeof icon === 'string' && icon in REACT_ICONS_MAP) {
      const IconComponent = REACT_ICONS_MAP[icon as IconType] as ReactIconType;
      const ChakraIcon = getChakraIcon(IconComponent, `react-${icon}`);
      return (
        <ChakraIcon
          size={resolvedBoxSize}
          color={resolvedColor || color}
          ref={ref}
          {...rest}
        />
      );
    }

    // Handle custom SVG icons (문자열)
    if (typeof icon === 'string') {
      const customIcon = CUSTOM_ICON_MAP[icon];
      if (customIcon) {
        const ChakraIcon = getChakraIcon(customIcon, `custom-${icon}`);
        return (
          <ChakraIcon
            {...iconStyles}
            width={resolvedBoxSize}
            height={resolvedBoxSize}
            fill={resolvedColor || color || 'currentColor'}
            ref={ref}
            {...rest}
          />
        );
      }
    }

    const fallbackIcon = CUSTOM_ICON_MAP['VerticalEllipsis'];
    const ChakraIcon = getChakraIcon(fallbackIcon, 'production-fallback');
    return (
      <ChakraIcon
        {...iconStyles}
        width={resolvedBoxSize}
        height={resolvedBoxSize}
        fill={resolvedColor || color || 'currentColor'}
        ref={ref}
        {...rest}
      />
    );
  }
);

Icon.displayName = 'Icon';
