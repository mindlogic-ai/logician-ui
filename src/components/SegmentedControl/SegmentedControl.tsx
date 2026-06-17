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
      // Light mode: track is bg.subtle (gray.50) and the selected indicator is
      // bg.surface (white) lifted by an md shadow — a classic raised thumb.
      //
      // Selected indicator rides on `bg.raised` — a raised neutral surface that
      // resolves white in light and the lightest neutral (gray.1100) in dark,
      // so the thumb reads as lifted above the `bg.subtle` track in both modes
      // (`bg.surface` could not: its dark value is darker than the track). Dark
      // mode also needs two things light mode doesn't, and neither
      // maps to a token: a drop shadow is invisible on a dark canvas, so the
      // indicator gains a soft ambient shadow + a translucent-white hairline
      // edge; and the track only contrasts against the app canvas — on a
      // same-or-lighter dark surface (e.g. a bg.surface card) it would vanish
      // and leave the control looking like floating text, so a translucent
      // hairline ring defines its bounds on any dark background. Both rings are
      // box-shadows (not borders) so the matched item-height math is preserved.
      bg="bg.subtle"
      p="1"
      borderRadius={borderRadius}
      boxShadow="none"
      w="fit-content"
      {...rest}
      css={mergeCss(
        {
          '--segment-indicator-bg': `var(--chakra-colors-bg-raised)`,
          '--segment-indicator-shadow': `var(--chakra-shadows-md)`,
          '.dark &': {
            '--segment-indicator-shadow':
              '0 1px 2px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.12)',
          },
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
                color: 'var(--chakra-colors-fg-default)',
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
