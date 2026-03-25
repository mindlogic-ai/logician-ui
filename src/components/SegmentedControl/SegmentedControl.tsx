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
      w="fit-content"
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
          cursor: 'pointer',
          flex: 1,
          _hover: {
            bg: 'transparent',
          },
        },
        // Item text colors - matching original design
        '& [data-part="item-text"]': {
          color: 'gray.800',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          '&::after': {
            content: 'attr(data-text)',
            fontWeight: '600',
            height: '0',
            visibility: 'hidden',
            overflow: 'hidden',
            userSelect: 'none',
            pointerEvents: 'none',
          },
        },
        '& [data-part="item"][data-state="checked"] [data-part="item-text"]': {
          color: 'gray.1500',
          fontWeight: '600',
        },
      }}
      {...rest}
    >
      <SegmentGroup.Indicator />
      {items.map((item) => (
        <SegmentGroup.Item key={item.value} value={item.value} disabled={item.disabled}>
          <SegmentGroup.ItemText
            data-text={typeof item.label === 'string' ? item.label : undefined}
          >
            {item.label}
          </SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  );
});

SegmentedControl.displayName = 'SegmentedControl';
