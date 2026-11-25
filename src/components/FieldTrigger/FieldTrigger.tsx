import { forwardRef } from 'react';
import {
  chakra,
  type SystemStyleObject,
  useChakraContext,
  useSlotRecipe,
} from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { ChevronDownIcon } from '../Icon';
import { indicatorStyles, triggerStyles } from '../Select/Select.styles';
import type { FieldTriggerProps } from './FieldTrigger.types';

type SizeVariant = {
  root?: SystemStyleObject;
  indicator?: { _icon?: SystemStyleObject };
};

/** Only the size variables of the Select root — not its column layout. */
const cssVariables = (style: SystemStyleObject | undefined) =>
  Object.fromEntries(
    Object.entries(style ?? {}).filter(([key]) => key.startsWith('--'))
  ) as SystemStyleObject;

const isEmpty = (value: unknown) =>
  value === undefined || value === null || value === false || value === '';

/**
 * Deltas a `<button>` needs that a `Select.Trigger` gets from its parts.
 * Content-sized by default: a picker usually sits in a row of filters, where
 * the Select recipe's `width: full` would take the whole row. Pass `w` to fix
 * the width, as you would size the box around a Select.
 */
const fieldTriggerStyles: SystemStyleObject = {
  width: 'auto',
  maxW: 'full',
};

const valueStyles: SystemStyleObject = {
  flex: '1',
  minW: '0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'start',
};

/**
 * A button that acts as a field: it opens a list or a panel and shows what is
 * chosen. It looks like a `Select` trigger of the same size — `border.control`
 * outline, field padding and type, `fg.placeholder` while empty, a trailing
 * chevron — because to the user it *is* a field. Use it for the pickers a
 * Select cannot hold (a tree in a popover, a multi-select with a summary).
 *
 * It renders a plain `<button>` and leaves the popup semantics to the trigger
 * that wraps it: inside `Popover.Trigger asChild` or `Menu.Trigger asChild`,
 * Ark sets `aria-haspopup`, `aria-expanded`, `aria-controls` and the
 * `data-state="open"` that draws the open ring. Used on its own, pass those
 * yourself.
 *
 * Every other secondary-looking button (취소, 내보내기, 필터 초기화) stays a
 * `Button variant="secondary"`.
 *
 * @example
 * ```tsx
 * <Popover.Trigger asChild>
 *   <FieldTrigger placeholder="이벤트" w="2xs">
 *     {selected.length > 0 && <SelectionSummary labels={selected} />}
 *   </FieldTrigger>
 * </Popover.Trigger>
 * ```
 */
export const FieldTrigger = forwardRef<HTMLButtonElement, FieldTriggerProps>(
  function FieldTrigger(
    {
      children,
      placeholder,
      size = 'md',
      invalid = false,
      type = 'button',
      css,
      ...rest
    },
    ref
  ) {
    // Select's own recipe, so the sizes cannot drift from the Select beside
    // it (and follow a consumer's theme if it overrides them). The trigger and
    // indicator slots land in `@layer recipes` exactly as on a Select, under
    // the same unlayered `Select.styles` deltas. The root slot is not applied
    // (it lays out label + control as a column); only its size variables are,
    // and those and the icon size are read from the config because the
    // compiled slots come back wrapped in the layer.
    const recipe = useSlotRecipe({ key: 'select' });
    const slots = recipe({ size, variant: 'outline' });
    const sizeVariant = (useChakraContext().getSlotRecipe('select').variants
      ?.size?.[size] ?? {}) as SizeVariant;
    const empty = isEmpty(children);

    return (
      <chakra.button
        ref={ref}
        type={type}
        data-part="trigger"
        data-placeholder-shown={empty ? '' : undefined}
        data-invalid={invalid ? '' : undefined}
        aria-invalid={invalid || undefined}
        {...rest}
        css={mergeCss(
          cssVariables(sizeVariant.root),
          slots.trigger,
          triggerStyles as SystemStyleObject,
          fieldTriggerStyles,
          css as SystemStyleObject | undefined
        )}
      >
        <chakra.span css={valueStyles}>
          {empty ? (
            placeholder
          ) : (
            <>
              {/* Once a value replaces the placeholder, the field would be
                  announced as the value alone ("로그인 외 2개, 버튼"). The
                  hidden prefix keeps what it picks in the name, ahead of the
                  visible words (WCAG 2.5.3). An `aria-label` replaces both. */}
              {!isEmpty(placeholder) && (
                <chakra.span srOnly>{placeholder}: </chakra.span>
              )}
              {children}
            </>
          )}
        </chakra.span>
        <chakra.span
          data-part="indicator"
          aria-hidden
          flexShrink={0}
          css={mergeCss(slots.indicator, indicatorStyles, {
            // The chevron is a `boxSize` icon, which sets its own width and
            // height; the descendant rule outranks it and takes Select's size.
            '& svg': sizeVariant.indicator?._icon,
          })}
        >
          <ChevronDownIcon />
        </chakra.span>
      </chakra.button>
    );
  }
);
