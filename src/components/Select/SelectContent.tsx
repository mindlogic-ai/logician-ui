import { ForwardedRef, forwardRef } from 'react';
import { Portal, Select } from '@chakra-ui/react';

export interface SelectContentProps extends Select.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
}

/**
 * SelectContent — wraps Portal + Select.Positioner + Select.Content.
 *
 * Renders the dropdown menu with portal support and design system defaults.
 */
export const SelectContent = forwardRef(
  (
    { portalled = true, portalRef, children, ...rest }: SelectContentProps,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <Select.Positioner>
          <Select.Content
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="0 5px 20px 1px var(--chakra-colors-gray-50)"
            ref={ref}
            {...rest}
          >
            {children}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    );
  }
);

SelectContent.displayName = 'SelectContent';
