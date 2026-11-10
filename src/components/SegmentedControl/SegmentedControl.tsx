import { forwardRef } from 'react';
import { SegmentGroup } from '@chakra-ui/react';

import { getControlSize } from '@/theme/controlSizes';
import { mergeCss } from '@/utils/mergeCss';

import {
  indicatorTravel,
  segmentItemHeight,
  segmentRootPaddingPx,
} from './SegmentedControl.styles';
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
    css,
    ...rest
  } = props;

  // Same textStyle as every other control at this size (see controlSizes):
  // the item height is em inside a ScaledContext, so equal type is what keeps
  // the outer height equal to Button's there too.
  const spec = getControlSize(size);

  // Root padding in px, not the `1` spacing token: that token is 0.25em, so at
  // a 14px font it is 3.5px, and Ark positions the indicator from the item's
  // integer offsetTop/offsetLeft (3.5 rounds to 4). The thumb then sat 0.5px
  // low and its bottom gap was a pixel narrower than its top.
  const rootPadding = `${segmentRootPaddingPx(size)}px`;

  // Normalize options to the format expected by SegmentGroup.Items
  const items = options.map((option: SegmentedControlOption) => ({
    value: option.value,
    label: option.label,
    disabled: option.disabled,
  }));

  // Concentric with the root: inner radius = outer radius − root padding
  // (rootPadding), floored at 0, so the gap between the two curves stays even.
  const indicatorRadius =
    typeof borderRadius === 'string'
      ? `max(0px, calc(var(--chakra-radii-${borderRadius}) - ${rootPadding}))`
      : typeof borderRadius === 'number'
        ? `max(0px, calc(${borderRadius}px - ${rootPadding}))`
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
      // Track is bg.subtle and the selected indicator rides on `bg.raised` — a
      // raised neutral surface that resolves white in light and a lighter
      // neutral than the track in dark, so the thumb reads as lifted
      // above the track in both modes. The indicator also gains a shadow: an xs drop
      // shadow in light (md's 4px/8px drop filled the 4px track padding below the
      // thumb and made it read as sagging), and in dark — where a drop shadow is invisible on a
      // dark canvas — a soft ambient shadow + a translucent-white hairline edge.
      //
      // The track itself only contrasts where the page wash is darker (light) or
      // lighter (dark) than the fill. It vanishes when the page matches the
      // track: a `bg.sunken` list/overview page has the same light value as
      // the bg.subtle track — and a `bg.surface` card is lighter than the
      // track in dark. In either case the control would read as floating text,
      // so a hairline ring defines its bounds on *any* background: a neutral
      // `border.default` ring in light, a translucent-white ring in dark. (The
      // ring — not the track fill — does the work here: the selected thumb is a
      // raised white surface lifted by its shadow, a relationship that depends
      // on the track staying light, so we outline the group rather than darken
      // it. `border.default` keeps the edge present but light — `border.strong`
      // reads as a heavy box for a control that normally has no outline.) Both
      // rings are box-shadows (not borders) so the matched item-height math is
      // preserved, and both are inset: an outer ring sits 1px outside the box,
      // so any `overflow` ancestor flush with the control (a horizontal scroll
      // row) clipped its straight edges and left only the rounded corners.
      // Inset, it is drawn inside the root padding, where the indicator never
      // reaches.
      bg="bg.subtle"
      p={rootPadding}
      borderRadius={borderRadius}
      w="fit-content"
      {...rest}
      css={mergeCss(
        {
          '--segment-indicator-bg': `var(--chakra-colors-bg-raised)`,
          '--segment-indicator-shadow': `var(--chakra-shadows-xs)`,
          boxShadow: 'inset 0 0 0 1px var(--chakra-colors-border-default)',
          '.dark &': {
            '--segment-indicator-shadow':
              '0 1px 2px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
          },
        },
        css
      )}
    >
      <SegmentGroup.Indicator
        borderRadius={indicatorRadius}
        // `travel`, delivered through custom properties — see the comment on
        // `indicatorTravel` for why the ordinary preset cannot reach this part.
        css={indicatorTravel}
      />
      {items.map((item) => (
        <SegmentGroup.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          cursor={item.disabled ? 'not-allowed' : 'pointer'}
          flex="1"
          height={segmentItemHeight(size)}
          textStyle={spec.textStyle}
          px={spec.actionPaddingX}
          gap={spec.gap}
          _hover={{ bg: 'transparent' }}
        >
          <SegmentGroup.ItemText
            data-text={typeof item.label === 'string' ? item.label : undefined}
            color="fg.muted"
            fontWeight="500"
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
