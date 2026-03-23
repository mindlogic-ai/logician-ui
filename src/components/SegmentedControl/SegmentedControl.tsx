import { forwardRef } from 'react';
import { SegmentGroup } from '@chakra-ui/react';

import {
  SegmentedControlOption,
  SegmentedControlProps,
} from './SegmentedControl.types';

export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(props, ref) {
  const {
    options,
    value,
    onSelect,
    defaultValue,
    size = 'md',
    borderRadius = 'md',
    ...rest
  } = props;

  // Normalize options to the format expected by SegmentGroup.Items
  const items = options.map((option: SegmentedControlOption) => ({
    value: option.value,
    label: option.label,
    disabled: option.disabled,
  }));

  // Use theme borderRadius token directly via CSS variable
  const indicatorRadius =
    typeof borderRadius === 'string'
      ? `var(--chakra-radii-${borderRadius})`
      : borderRadius;

  return (
    <SegmentGroup.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue ?? options[0]?.value}
      onValueChange={(details: { value: string }) => {
        if (onSelect) {
          onSelect(details.value);
        }
      }}
      size={size}
      bg="gray.50"
      p="1"
      borderRadius={borderRadius}
      boxShadow="none"
      w="100%"
      css={{
        // Chakra v3 CSS variables for styling
        '--segment-indicator-bg': `var(--chakra-colors-gray-0)`,
        '--segment-indicator-shadow': `var(--chakra-shadows-md)`,
        // Apply borderRadius to indicator
        '& [data-part="indicator"]': {
          borderRadius: indicatorRadius,
        },
        // Make all items equal width
        '& [data-part="item"]': {
          flex: 1,
          _hover: {
            bg: 'transparent',
          },
        },
        // Item text colors - matching original design
        '& [data-part="item-text"]': {
          color: 'gray.600',
          fontWeight: '500',
        },
        '& [data-part="item"][data-state="checked"] [data-part="item-text"]': {
          color: 'gray.1300',
          fontWeight: '600',
        },
      }}
      {...rest}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={items} />
    </SegmentGroup.Root>
  );
});

SegmentedControl.displayName = 'SegmentedControl';
