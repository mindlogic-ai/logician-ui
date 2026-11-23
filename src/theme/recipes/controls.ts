import { defineRecipe, defineSlotRecipe } from '@chakra-ui/react';
import {
  checkboxAnatomy,
  comboboxAnatomy,
  radioGroupAnatomy,
  selectAnatomy,
  switchAnatomy,
  tabsAnatomy,
} from '@chakra-ui/react/anatomy';

import {
  CONTROL_RADIUS,
  CONTROL_SIZES,
  controlHeightToken,
  type ControlSize,
  controlSizes,
  CORE_CONTROL_SIZES,
} from '../controlSizes';

/**
 * Chakra recipe overrides that put every control's `size` variant on the
 * shared scale in `../controlSizes`. Chakra deep-merges these into its own
 * recipes, so only the keys written here change.
 *
 * Nothing here holds a literal: every height, textStyle, padding and icon size
 * comes from `controlSizes`, so a change to the scale lands everywhere at once
 * and `controlSizes.test.ts` can check the resolved recipes against it.
 *
 * **Slot recipes pass Chakra's full anatomy, never a partial `slots` list.**
 * Chakra merges configs array-by-index, so `slots: ['label']` does not add
 * to the default list — it overwrites its first entry. For Checkbox that
 * dropped the `root` slot (the label lost its line box); the old
 * `['root', 'trigger', 'content']` Select override had been overwriting
 * Select's `label` and `positioner` slots the same way.
 */

const bySize = <T>(
  sizes: readonly ControlSize[],
  build: (size: ControlSize) => T
): Record<string, T> =>
  Object.fromEntries(sizes.map((size) => [size, build(size)]));

/**
 * Button (and IconButton, which uses the same recipe). These are Chakra's own
 * values — Button is the reference — restated from the scale so the scale is
 * the single source and the test can prove nothing else drifted from it.
 */
export const buttonRecipe = defineRecipe({
  variants: {
    size: bySize(CONTROL_SIZES, (size) => {
      const s = controlSizes[size];
      return {
        h: s.height,
        minW: s.height,
        textStyle: s.textStyle,
        px: s.actionPaddingX,
        gap: s.gap,
        _icon: { width: s.iconSize, height: s.iconSize },
      };
    }),
  },
});

/**
 * Field sizes, xs–xl. `2xs` is left on Chakra's own value (a 24.5px field):
 * no field ships a 2xs today and shrinking it to Button's 21px would put a text
 * box under the 24px target.
 */
const FIELD_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const inputRecipe = defineRecipe({
  base: { borderRadius: CONTROL_RADIUS },
  variants: {
    size: bySize(FIELD_SIZES, (size) => ({
      textStyle: controlSizes[size].textStyle,
      px: controlSizes[size].fieldPaddingX,
      '--input-height': controlHeightToken(size),
    })),
  },
});

/** Textarea: same type and inline padding as Input; its height is its rows. */
export const textareaRecipe = defineRecipe({
  base: { borderRadius: CONTROL_RADIUS },
  variants: {
    size: bySize(FIELD_SIZES, (size) => ({
      textStyle: controlSizes[size].textStyle,
      px: controlSizes[size].fieldPaddingX,
    })),
  },
});

export const selectSlotRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  base: { trigger: { borderRadius: CONTROL_RADIUS } },
  variants: {
    size: bySize(CORE_CONTROL_SIZES, (size) => ({
      root: {
        '--select-trigger-height': controlHeightToken(size),
        '--select-trigger-padding-x': `spacing.${controlSizes[size].fieldPaddingX}`,
      },
      trigger: {
        textStyle: controlSizes[size].textStyle,
        // Chakra's lg `py: 3` is em-based and alone pushes the trigger past
        // the height token; let the token decide (637d0fe).
        ...(size === 'lg' && { py: '1.5' }),
      },
      content: { textStyle: controlSizes[size].textStyle },
    })),
  },
});

export const comboboxSlotRecipe = defineSlotRecipe({
  slots: comboboxAnatomy.keys(),
  base: { input: { borderRadius: CONTROL_RADIUS } },
  variants: {
    size: bySize(CORE_CONTROL_SIZES, (size) => ({
      root: {
        '--combobox-input-height': controlHeightToken(size),
        '--combobox-input-padding-x': `spacing.${controlSizes[size].fieldPaddingX}`,
      },
      input: { textStyle: controlSizes[size].textStyle },
      content: { textStyle: controlSizes[size].textStyle },
    })),
  },
});

/**
 * Tabs: the trigger height is the tab list's `--tabs-height`, set by the
 * `Tabs` root's `size` (sm / md / lg — Chakra's tabs have no xs). A `size` on
 * a single `Tab` does not reach it.
 */
const TAB_SIZES = ['sm', 'md', 'lg'] as const;

export const tabsSlotRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  variants: {
    size: bySize(TAB_SIZES, (size) => ({
      root: { '--tabs-height': controlHeightToken(size) },
      trigger: { textStyle: controlSizes[size].textStyle },
    })),
  },
});

/** Checkbox / Radio / Switch: the label takes the control type per size. */
export const checkboxSlotRecipe = defineSlotRecipe({
  slots: checkboxAnatomy.keys(),
  variants: {
    size: bySize(CORE_CONTROL_SIZES, (size) => ({
      label: { textStyle: controlSizes[size].textStyle },
    })),
  },
});

export const radioGroupSlotRecipe = defineSlotRecipe({
  slots: radioGroupAnatomy.keys(),
  variants: {
    size: bySize(CORE_CONTROL_SIZES, (size) => ({
      item: { textStyle: controlSizes[size].textStyle },
    })),
  },
});

export const switchSlotRecipe = defineSlotRecipe({
  slots: switchAnatomy.keys(),
  variants: {
    size: bySize(CORE_CONTROL_SIZES, (size) => ({
      label: { textStyle: controlSizes[size].textStyle },
    })),
  },
});
