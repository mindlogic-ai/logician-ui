import { forwardRef } from 'react';
import { SegmentGroup } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import {
  SegmentedControlOption,
  SegmentedControlProps,
} from './SegmentedControl.types';

// Match font sizes to the equivalent Chakra button sizes
const fontSizeBySize: Record<string, string> = {
  xs: 'xs',
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

// Item heights so that itemHeight + 2×root-padding(p="1") equals the Button height for each size
const itemHeightBySize: Record<string, string> = {
  xs: '6', // 32 - 8 = 24px
  sm: '7', // 36 - 8 = 28px
  md: '8', // 40 - 8 = 32px
  lg: '9', // 44 - 8 = 36px
};

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
    css,
    ...rest
  } = props;

  const fontSize = fontSizeBySize[size as string] ?? 'sm';
  const itemHeight = itemHeightBySize[size as string] ?? '8';

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
      {...rest}
      css={mergeCss(
        {
          '--segment-indicator-bg': `var(--chakra-colors-gray-0)`,
          '--segment-indicator-shadow': `var(--chakra-shadows-md)`,
        },
        css
      )}
    >
      <SegmentGroup.Indicator borderRadius={indicatorRadius} />
      {items.map((item) => (
        <SegmentGroup.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          cursor={item.disabled ? 'not-allowed' : 'pointer'}
          flex="1"
          height={itemHeight}
          _hover={{ bg: 'transparent' }}
        >
          <SegmentGroup.ItemText
            data-text={typeof item.label === 'string' ? item.label : undefined}
            color="fg.muted"
            fontWeight="500"
            fontSize={fontSize}
            whiteSpace="nowrap"
            display="inline-flex"
            flexDirection="column"
            alignItems="center"
            css={{
              '&::after': {
                content: 'attr(data-text)',
                fontWeight: '600',
                height: '0',
                visibility: 'hidden',
                overflow: 'hidden',
                userSelect: 'none',
                pointerEvents: 'none',
              },
              '[data-state="checked"] &': {
                color: 'var(--chakra-colors-gray-1500)',
                fontWeight: '600',
              },
            }}
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
