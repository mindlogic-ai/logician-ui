import { defaultSystem } from '@chakra-ui/react';
import { describe, expect, it } from 'vitest';

import {
  segmentItemHeight,
  segmentRootPaddingPx,
} from '../components/SegmentedControl/SegmentedControl.styles';
import { getTagSizeStyles } from '../components/Tag/Tag.styles';
import {
  CONTROL_RADIUS,
  CONTROL_SIZES,
  controlHeightToken,
  controlSizes,
  CORE_CONTROL_SIZES,
} from './controlSizes';
import { system } from './index';

/**
 * Every control that takes `size` must resolve it through `controlSizes`.
 *
 * These read the recipes the shipped `system` actually ends up with (Chakra's
 * defaults deep-merged with ours) and the helpers the components call, so a
 * component that grows its own height or type map again fails here — the
 * QA #18 toolbar (SegmentedControl 36px next to Input 28px next to Tag 20px)
 * is what that looked like.
 */

type Variant = Record<string, any>;
const sizeVariants = (recipe: { variants?: { size?: Variant } }) =>
  recipe.variants?.size ?? {};

describe('controlSizes — Button is the reference', () => {
  it('restates Chakra’s own button sizes exactly (no Button changes size)', () => {
    const chakra = sizeVariants(defaultSystem.getRecipe('button'));
    for (const size of CONTROL_SIZES) {
      const s = controlSizes[size];
      expect(chakra[size], size).toMatchObject({
        h: s.height,
        minW: s.height,
        textStyle: s.textStyle,
        px: s.actionPaddingX,
        gap: s.gap,
        _icon: { width: s.iconSize, height: s.iconSize },
      });
    }
  });

  it('the shipped button recipe resolves to the scale', () => {
    const shipped = sizeVariants(system.getRecipe('button'));
    for (const size of CONTROL_SIZES) {
      expect(shipped[size].h, size).toBe(controlSizes[size].height);
      expect(shipped[size].textStyle, size).toBe(controlSizes[size].textStyle);
    }
  });
});

describe('controlSizes — every other control resolves to the same scale', () => {
  it.each(CORE_CONTROL_SIZES)('Input %s', (size) => {
    const v = sizeVariants(system.getRecipe('input'))[size];
    expect(v['--input-height']).toBe(controlHeightToken(size));
    expect(v.textStyle).toBe(controlSizes[size].textStyle);
    expect(v.px).toBe(controlSizes[size].fieldPaddingX);
  });

  it.each(CORE_CONTROL_SIZES)('Textarea %s (type and padding)', (size) => {
    const v = sizeVariants(system.getRecipe('textarea'))[size];
    expect(v.textStyle).toBe(controlSizes[size].textStyle);
    expect(v.px).toBe(controlSizes[size].fieldPaddingX);
  });

  it.each(CORE_CONTROL_SIZES)('Select %s', (size) => {
    const v = sizeVariants(system.getSlotRecipe('select'))[size];
    expect(v.root['--select-trigger-height']).toBe(controlHeightToken(size));
    expect(v.trigger.textStyle).toBe(controlSizes[size].textStyle);
  });

  it.each(CORE_CONTROL_SIZES)('Combobox %s', (size) => {
    const v = sizeVariants(system.getSlotRecipe('combobox'))[size];
    expect(v.root['--combobox-input-height']).toBe(controlHeightToken(size));
    expect(v.input.textStyle).toBe(controlSizes[size].textStyle);
  });

  it.each(['sm', 'md', 'lg'] as const)('Tabs %s', (size) => {
    const v = sizeVariants(system.getSlotRecipe('tabs'))[size];
    expect(v.root['--tabs-height']).toBe(controlHeightToken(size));
    expect(v.trigger.textStyle).toBe(controlSizes[size].textStyle);
  });

  it.each(CORE_CONTROL_SIZES)('Checkbox / Radio / Switch label %s', (size) => {
    const t = controlSizes[size].textStyle;
    expect(
      sizeVariants(system.getSlotRecipe('checkbox'))[size].label.textStyle
    ).toBe(t);
    expect(
      sizeVariants(system.getSlotRecipe('radioGroup'))[size].item.textStyle
    ).toBe(t);
    expect(
      sizeVariants(system.getSlotRecipe('switch'))[size].label.textStyle
    ).toBe(t);
  });

  it.each(CORE_CONTROL_SIZES)(
    'SegmentedControl %s: item + 2 × root padding = the height token',
    (size) => {
      const padding = size === 'xs' ? 2 : 4;
      expect(segmentRootPaddingPx(size)).toBe(padding);
      expect(segmentItemHeight(size)).toBe(
        `calc(var(--chakra-sizes-${controlSizes[size].height}) - ${padding * 2}px)`
      );
    }
  );

  it.each(CORE_CONTROL_SIZES)('interactive Tag %s', (size) => {
    const { sizeStyles } = getTagSizeStyles(size, true);
    expect(sizeStyles).toMatchObject({
      h: controlSizes[size].height,
      textStyle: controlSizes[size].textStyle,
      px: controlSizes[size].actionPaddingX,
      borderRadius: CONTROL_RADIUS,
    });
  });

  it('a static Tag keeps the badge sizes', () => {
    expect(getTagSizeStyles('lg', false).sizeStyles).toEqual({
      fontSize: 'sm',
    });
    expect(getTagSizeStyles('xs', false).recipeSize).toBe('sm');
  });

  it('boxed fields share Button’s corner', () => {
    expect(system.getRecipe('input').base.borderRadius).toBe(CONTROL_RADIUS);
    expect(system.getRecipe('textarea').base.borderRadius).toBe(CONTROL_RADIUS);
    expect(system.getSlotRecipe('select').base.trigger.borderRadius).toBe(
      CONTROL_RADIUS
    );
    expect(system.getSlotRecipe('combobox').base.input.borderRadius).toBe(
      CONTROL_RADIUS
    );
  });
});

describe('slot recipe overrides keep Chakra’s anatomy', () => {
  // Chakra merges configs array-by-index: a partial `slots` list overwrites
  // the first entries of the default list instead of adding to it.
  it.each(['select', 'combobox', 'tabs', 'checkbox', 'radioGroup', 'switch'])(
    '%s',
    (key) => {
      expect(system.getSlotRecipe(key).slots).toEqual(
        defaultSystem.getSlotRecipe(key).slots
      );
    }
  );
});
