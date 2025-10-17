import React, { forwardRef, SVGProps } from 'react';
import { BoxProps, chakra } from '@chakra-ui/react';

// Icon props type
export type IconProps = Partial<SVGProps<SVGElement>> &
  Omit<BoxProps, 'size' | 'icon'>;

// Static size mapping (SSR-safe)
const sizeMapping: Record<string, string> = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '40px',
};

/**
 * Creates a reusable icon component from any React component (SVG, React Icons, etc.)
 *
 * @param IconComponent - The source icon component (SVG import or React Icon)
 * @param displayName - Optional display name for debugging
 * @returns A chakra-wrapped icon component with consistent API
 *
 * @example
 * ```tsx
 * // With SVG import
 * import MyIcon from './my-icon.svg';
 * const CustomIcon = createIcon(MyIcon, 'CustomIcon');
 *
 * // With React Icons
 * import { FaBuildingUser } from 'react-icons/fa6';
 * const BuildIcon = createIcon(FaBuildingUser, 'BuildIcon');
 *
 * // Usage
 * <CustomIcon boxSize="lg" color="blue.500" />
 * <BuildIcon boxSize="md" color="red.500" />
 * ```
 */
export const createIcon = (
  IconComponent: React.ComponentType<any>,
  displayName?: string
) => {
  const WrappedIcon = forwardRef<SVGSVGElement, IconProps>(
    ({ boxSize = 'md', ...props }, ref) => {
      // Map boxSize to actual pixel values
      const resolvedSize =
        typeof boxSize === 'string' && boxSize in sizeMapping
          ? sizeMapping[boxSize]
          : boxSize;

      const ChakraIcon = chakra(IconComponent);
      return (
        <ChakraIcon
          ref={ref}
          width={resolvedSize}
          height={resolvedSize}
          {...props}
        />
      );
    }
  );

  WrappedIcon.displayName =
    displayName || IconComponent.displayName || 'CreatedIcon';
  return WrappedIcon;
};

/**
 * Creates multiple icon components at once
 *
 * @param iconMap - Object mapping names to icon components
 * @returns Object with the same keys but wrapped icon components
 *
 * @example
 * ```tsx
 * import { FaHome, FaUser } from 'react-icons/fa';
 * import CustomSvg from './custom.svg';
 *
 * const icons = createIconGroup({
 *   Home: FaHome,
 *   User: FaUser,
 *   Custom: CustomSvg,
 * });
 *
 * // Usage
 * <icons.Home boxSize="lg" />
 * <icons.User color="blue.500" />
 * <icons.Custom boxSize="md" />
 * ```
 */
export const createIconGroup = <
  T extends Record<string, React.ComponentType<any>>,
>(
  iconMap: T
): {
  [K in keyof T]: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
} => {
  const result = {} as any;

  Object.entries(iconMap).forEach(([name, IconComponent]) => {
    result[name] = createIcon(IconComponent, name);
  });

  return result;
};

/**
 * Type helper for icon components created with createIcon
 */
export type CreatedIcon = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export default createIcon;
