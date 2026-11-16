import type { ReactNode } from 'react';
import {
  type ButtonProps as ChakraButtonProps,
  chakra,
  Popover,
  type SystemStyleObject,
  useSlotRecipe,
} from '@chakra-ui/react';

import {
  controlHeightToken,
  type ControlSize,
  controlSizes,
  getControlSize,
} from '@/theme/controlSizes';
import { mergeCss } from '@/utils/mergeCss';

import type { ButtonProps } from '../Button';
import { MdOutlineCalendarToday } from '../Icon';
import { triggerStyles as selectTriggerStyles } from '../Select/Select.styles';

/** `Button`-only props that must not reach a plain `<button>` as attributes. */
const BUTTON_ONLY_PROPS = [
  'size',
  'variant',
  'loading',
  'loadingText',
  'spinner',
  'spinnerPlacement',
  // logician-ui Button extras, in case a caller typed against it.
  'isDestructive',
  'lift',
  'focusableWhenDisabled',
  'onDisabledClick',
] as const;

const isControlSize = (size: unknown): size is ControlSize =>
  typeof size === 'string' && size in controlSizes;

/**
 * The closed `Select` trigger's look for a given `size`, read from the theme
 * rather than restated: Chakra's `select` slot recipe (as overridden in
 * `theme/recipes/controls.ts`) for the size variables, height, padding and
 * type, then the design-system layer `Select.Trigger` puts on top
 * (`Select.styles.ts` — `border.control`, hover, focus ring, open, invalid,
 * disabled). A change to either lands here without touching the date pickers.
 *
 * Only layout differs from a Select: a date trigger sizes to its value and
 * starts with an icon instead of ending in a chevron.
 */
const useSelectTriggerCss = (size: unknown): SystemStyleObject => {
  const recipe = useSlotRecipe({ key: 'select' });
  const styles = recipe({ size, variant: 'outline' } as Parameters<
    typeof recipe
  >[0]);

  // The trigger's height and padding are `--select-trigger-*` variables the
  // recipe sets on Select's root; a date trigger is its own root.
  const rootVars = Object.fromEntries(
    Object.entries(styles.root ?? {}).filter(([key]) => key.startsWith('--'))
  );

  // Select ships xs–lg. A `2xs` / `xl` date trigger keeps its height from the
  // shared control scale instead of falling back to Chakra's default.
  const selectSizes = Object.keys(recipe.variantMap?.size ?? {});
  const offScale =
    isControlSize(size) && !selectSizes.includes(size)
      ? {
          '--select-trigger-height': controlHeightToken(size),
          '--select-trigger-padding-x': `spacing.${controlSizes[size].fieldPaddingX}`,
          textStyle: controlSizes[size].textStyle,
        }
      : undefined;

  return mergeCss(rootVars, styles.trigger, offScale, selectTriggerStyles, {
    display: 'inline-flex',
    width: 'auto',
    justifyContent: 'flex-start',
    gap: getControlSize(size).gap,
    whiteSpace: 'nowrap',
  });
};

export interface DatePickerTriggerProps {
  /** Control size on the shared scale; `triggerProps.size` wins. */
  size?: ButtonProps['size'];
  /** The picker's `disabled` prop — the library does not pass it to a custom trigger. */
  disabled?: boolean;
  /** `propsConfigs.triggerBtnProps`: spread last, so a caller's props win. */
  triggerProps?: ChakraButtonProps;
  children: ReactNode;
}

/**
 * Popover trigger shared by `SingleDatePicker` and `RangeDatePicker`: a real
 * `<button>` (it opens a calendar grid, not a listbox, so it is not a
 * combobox) drawn exactly like a closed `Select` trigger, so a date filter
 * matches the Selects and Inputs next to it. `Popover.Trigger asChild` merges
 * its handlers and ARIA with the caller's `triggerBtnProps`, as before.
 */
export const DatePickerTrigger = ({
  size,
  disabled,
  triggerProps,
  children,
}: DatePickerTriggerProps) => {
  const { css, ...rest } = (triggerProps ?? {}) as ChakraButtonProps & {
    css?: SystemStyleObject;
  };
  const resolvedSize = rest.size ?? size;
  const domProps: Record<string, unknown> = { ...rest };
  BUTTON_ONLY_PROPS.forEach((key) => delete domProps[key]);

  const triggerCss = useSelectTriggerCss(resolvedSize ?? 'md');
  const control = getControlSize(resolvedSize);

  return (
    <Popover.Trigger asChild>
      <chakra.button
        type="button"
        disabled={disabled}
        {...domProps}
        css={mergeCss(triggerCss, css)}
      >
        <MdOutlineCalendarToday
          boxSize={control.iconBoxSize}
          color="fg.subtle"
          flexShrink={0}
        />
        {children}
      </chakra.button>
    </Popover.Trigger>
  );
};
