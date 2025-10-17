import createIcon, { IconProps } from './createIcon';

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
