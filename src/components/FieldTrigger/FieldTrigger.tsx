import { forwardRef } from 'react';
import { chakra, useSlotRecipe } from '@chakra-ui/react';

import { fieldBorder } from '@/theme/formControls';
import { mergeCss } from '@/utils/mergeCss';

import {
  ghostTriggerStyles,
  indicatorStyles,
  triggerStyles,
} from '../Select/Select.styles';
import type { FieldTriggerProps } from './FieldTrigger.types';

/**
 * Layout deltas over the Select trigger. The value and the chevron sit in the
 * row instead of the chevron being overlaid (a Select overlays its indicator
 * group), so the trailing padding is the plain field padding.
 */
const fieldTriggerStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '2',
  width: 'full',
  minW: 0,
  pe: 'var(--select-trigger-padding-x)',
  // A Select trigger's value text is `medium`; a Button's label is heavier,
  // which is half of why a Button-built picker never matched the row.
  fontWeight: 'medium',
  // Popover/Menu triggers announce themselves with `aria-expanded` (and
  // `data-state="open"`, which `triggerStyles._open` already covers). Chakra's
  // outline recipe darkens `_expanded` to `border.emphasized`; keep the open
  // field on the focus colour like an open Select.
  _expanded: {
    borderColor: fieldBorder.focus,
    boxShadow: fieldBorder.focusRing,
  },
} as const;

const valueStyles = {
  flex: '1',
  minW: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'start',
} as const;

const isEmpty = (node: FieldTriggerProps['children']) =>
  node === null || node === undefined || node === false || node === '';

/**
 * A button that looks exactly like a closed `Select`, for opening your own
 * picker — a Popover with a tree, a multi-select with search, a date range.
 *
 * Use it as the child of `Popover.Trigger asChild` (or `Menu.Trigger asChild`):
 * it forwards its ref and every prop, so the trigger's `aria-expanded`,
 * `data-state` and handlers land on it. Border, hover, focus, open, invalid and
 * disabled all come from the same `fieldBorder` source as `Input` and
 * `Select`, so a filter bar that mixes the three reads as one row.
 *
 * Prefer `Select` when the options are a flat list — it handles keyboard
 * selection and the listbox role for you. This is only the closed field.
 */
export const FieldTrigger = forwardRef<HTMLButtonElement, FieldTriggerProps>(
  function FieldTrigger(
    {
      children,
      placeholder,
      size = 'md',
      variant = 'outline',
      invalid = false,
      disabled,
      css,
      ...rest
    },
    ref
  ) {
    // The Select recipe owns the size scale (`--select-trigger-height`,
    // padding, textStyle) and the outline variant's border width and radius;
    // reading it keeps a FieldTrigger the same box as a Select of that size.
    const recipe = useSlotRecipe({ key: 'select' });
    const styles = recipe({ size, variant: 'outline' });
    const empty = isEmpty(children);

    return (
      <chakra.button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        data-invalid={invalid || undefined}
        data-placeholder-shown={empty || undefined}
        aria-label={empty ? placeholder : undefined}
        {...rest}
        css={mergeCss(
          // Size variables live on the Select root; a lone trigger has no
          // root, so it carries them itself.
          styles.root,
          styles.trigger,
          triggerStyles,
          variant === 'ghost' && ghostTriggerStyles,
          fieldTriggerStyles,
          // Ghost sizes to its value, as a ghost Select does.
          variant === 'ghost' && { width: 'auto', flex: 'none' },
          css
        )}
      >
        <chakra.span css={valueStyles}>
          {empty ? placeholder : children}
        </chakra.span>
        <chakra.span
          aria-hidden
          css={mergeCss(styles.indicator, indicatorStyles, { flexShrink: 0 })}
        >
          {/* Chakra's own Select chevron, so the two glyphs are identical. */}
          <chakra.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="1em"
            height="1em"
          >
            <path d="m6 9 6 6 6-6" />
          </chakra.svg>
        </chakra.span>
      </chakra.button>
    );
  }
);

FieldTrigger.displayName = 'FieldTrigger';
