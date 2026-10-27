import { forwardRef } from 'react';
import { Select as ChakraSelect } from '@chakra-ui/react';

import { useTranslate } from '@/hooks/useTranslate';
import { mergeCss } from '@/utils/mergeCss';

import { CloseIcon } from '../Icon';
import {
  contentStyles,
  ghostTriggerStyles,
  indicatorStyles,
  itemStyles,
  selectClearTriggerStyles,
  triggerStyles,
} from './Select.styles';
import type { SelectVariant } from './Select.types';

export interface SelectTriggerProps extends ChakraSelect.TriggerProps {
  variant?: SelectVariant;
}

const Trigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ css, variant = 'outline', ...props }, ref) {
    return (
      <ChakraSelect.Trigger
        ref={ref}
        {...props}
        css={mergeCss(
          triggerStyles,
          variant === 'ghost' && ghostTriggerStyles,
          css
        )}
      />
    );
  }
);

const Content = forwardRef<HTMLDivElement, ChakraSelect.ContentProps>(
  function SelectContent({ css, ...props }, ref) {
    return (
      <ChakraSelect.Content
        ref={ref}
        // Chakra closes this one over `fastest` (50ms), which is fast enough to
        // read as the list being cut off rather than dismissed.
        animationStyle="presence-anchored"
        {...props}
        css={mergeCss(contentStyles, css)}
      />
    );
  }
);

const Item = forwardRef<HTMLDivElement, ChakraSelect.ItemProps>(
  function SelectItem({ css, ...props }, ref) {
    return (
      <ChakraSelect.Item ref={ref} {...props} css={mergeCss(itemStyles, css)} />
    );
  }
);

const Indicator = forwardRef<HTMLDivElement, ChakraSelect.IndicatorProps>(
  function SelectIndicator({ css, ...props }, ref) {
    return (
      <ChakraSelect.Indicator
        ref={ref}
        {...props}
        css={mergeCss(indicatorStyles, css)}
      />
    );
  }
);

/**
 * The × that empties the selection. Draws `CloseIcon` when no children are
 * passed, and names itself in the provider's language: Chakra's own name is
 * the English "Clear value" in every locale. Pass `aria-label` to say what is
 * being cleared ("조직 선택 지우기").
 */
const ClearTrigger = forwardRef<
  HTMLButtonElement,
  ChakraSelect.ClearTriggerProps
>(function SelectClearTrigger({ css, children, ...props }, ref) {
  const translate = useTranslate();
  return (
    <ChakraSelect.ClearTrigger
      ref={ref}
      aria-label={translate('clear_selection') as string}
      {...props}
      css={mergeCss(selectClearTriggerStyles, css)}
    >
      {children ?? <CloseIcon aria-hidden />}
    </ChakraSelect.ClearTrigger>
  );
});

/**
 * Compound Select primitives — Chakra's `Select` namespace with the Logician
 * design-system styling baked into the visual parts (`Trigger`, `Content`,
 * `Item`, `Indicator`). Use these directly for full compositional control
 * (multi-select, grouped options, custom layouts); use `SelectField` for the
 * common single-select case.
 */
export const Select = {
  Root: ChakraSelect.Root,
  PropsProvider: ChakraSelect.PropsProvider,
  Context: ChakraSelect.Context,
  Label: ChakraSelect.Label,
  Control: ChakraSelect.Control,
  Trigger,
  ValueText: ChakraSelect.ValueText,
  IndicatorGroup: ChakraSelect.IndicatorGroup,
  Indicator,
  ClearTrigger,
  HiddenSelect: ChakraSelect.HiddenSelect,
  Positioner: ChakraSelect.Positioner,
  Content,
  ItemGroup: ChakraSelect.ItemGroup,
  ItemGroupLabel: ChakraSelect.ItemGroupLabel,
  Item,
  ItemText: ChakraSelect.ItemText,
  ItemIndicator: ChakraSelect.ItemIndicator,
  ItemContext: ChakraSelect.ItemContext,
};
