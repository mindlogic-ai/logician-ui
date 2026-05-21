import { forwardRef } from 'react';
import { Combobox as ChakraCombobox } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

import { contentStyles, inputStyles, itemStyles } from './Select.styles';

const Input = forwardRef<HTMLInputElement, ChakraCombobox.InputProps>(
  function ComboboxInput({ css, ...props }, ref) {
    return (
      <ChakraCombobox.Input
        ref={ref}
        {...props}
        css={mergeCss(inputStyles, css)}
      />
    );
  }
);

const Content = forwardRef<HTMLDivElement, ChakraCombobox.ContentProps>(
  function ComboboxContent({ css, ...props }, ref) {
    return (
      <ChakraCombobox.Content
        ref={ref}
        {...props}
        css={mergeCss(contentStyles, css)}
      />
    );
  }
);

const Item = forwardRef<HTMLDivElement, ChakraCombobox.ItemProps>(
  function ComboboxItem({ css, ...props }, ref) {
    return (
      <ChakraCombobox.Item
        ref={ref}
        {...props}
        css={mergeCss(itemStyles, css)}
      />
    );
  }
);

/**
 * Compound Combobox primitives — Chakra's `Combobox` namespace with the
 * Logician design-system styling baked into the visual parts (`Input`,
 * `Content`, `Item`). Use these directly for full compositional control;
 * use `ComboboxField` for the common single-select case.
 */
export const Combobox = {
  Root: ChakraCombobox.Root,
  PropsProvider: ChakraCombobox.PropsProvider,
  Context: ChakraCombobox.Context,
  Label: ChakraCombobox.Label,
  Control: ChakraCombobox.Control,
  Input,
  Trigger: ChakraCombobox.Trigger,
  IndicatorGroup: ChakraCombobox.IndicatorGroup,
  ClearTrigger: ChakraCombobox.ClearTrigger,
  Positioner: ChakraCombobox.Positioner,
  Content,
  Empty: ChakraCombobox.Empty,
  ItemGroup: ChakraCombobox.ItemGroup,
  ItemGroupLabel: ChakraCombobox.ItemGroupLabel,
  Item,
  ItemText: ChakraCombobox.ItemText,
  ItemIndicator: ChakraCombobox.ItemIndicator,
  ItemContext: ChakraCombobox.ItemContext,
};
