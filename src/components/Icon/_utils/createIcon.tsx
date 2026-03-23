import React, { forwardRef, SVGProps } from 'react';
import { BoxProps, chakra } from '@chakra-ui/react';

// Icon props type
export type IconProps = Partial<SVGProps<SVGElement>> &
  Omit<BoxProps, 'size' | 'icon'>;

// Static size mapping (SSR-safe)
const sizeMapping: Record<string, string> = {
  xs: '4',
  sm: '5',
  md: '6',
  lg: '8',
  xl: '10',
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
  // ✅ FIX: Wrap ONCE at creation time, not on every render
  const ChakraIcon = chakra(IconComponent);

  const WrappedIcon = forwardRef<SVGSVGElement, IconProps>(
    ({ boxSize = 'md', color = 'gray.600', ...props }, ref) => {
      // Map boxSize to actual pixel values
      const resolvedSize =
        typeof boxSize === 'string' && boxSize in sizeMapping
          ? sizeMapping[boxSize]
          : boxSize;

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
 * Type helper for icon components created with createIcon
 */
export type CreatedIcon = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export default createIcon;
