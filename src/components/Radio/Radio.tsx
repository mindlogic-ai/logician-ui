import { forwardRef } from 'react';
import { RadioGroup } from '@chakra-ui/react';

import { RadioProps } from './Radio.types';
import { RadioControl } from './RadioControl';
import { RadioText } from './RadioText';

const RadioBase = forwardRef<
  React.ComponentRef<typeof RadioGroup.Item>,
  RadioProps
>(({ id, children, ...props }, ref) => (
  <RadioGroup.Item ref={ref} {...props}>
    <RadioGroup.ItemHiddenInput id={id} />
    {children}
  </RadioGroup.Item>
));
RadioBase.displayName = 'Radio';

export const Radio = Object.assign(RadioBase, {
  Control: RadioControl,
  Text: RadioText,
});
