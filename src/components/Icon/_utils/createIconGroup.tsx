import createIcon, { CreatedIcon } from './createIcon';

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
): Record<keyof T, CreatedIcon> => {
  const result = {} as Record<keyof T, CreatedIcon>;

  Object.entries(iconMap).forEach(([name, IconComponent]) => {
    result[name as keyof T] = createIcon(IconComponent, name);
  });

  return result;
};
