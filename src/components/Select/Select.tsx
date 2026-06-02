import { forwardRef } from 'react';
import { Select as ChakraSelect } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import {
  contentStyles,
  indicatorStyles,
  itemStyles,
  triggerStyles,
} from './Select.styles';

const Trigger = forwardRef<HTMLButtonElement, ChakraSelect.TriggerProps>(
  function SelectTrigger({ css, ...props }, ref) {
    return (
      <ChakraSelect.Trigger
        ref={ref}
        {...props}
        css={mergeCss(triggerStyles, css)}
      />
    );
  }
);

const Content = forwardRef<HTMLDivElement, ChakraSelect.ContentProps>(
  function SelectContent({ css, ...props }, ref) {
    return (
      <ChakraSelect.Content
        ref={ref}
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
  ClearTrigger: ChakraSelect.ClearTrigger,
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
