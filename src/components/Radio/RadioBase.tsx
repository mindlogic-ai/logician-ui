import { forwardRef } from 'react';
import { RadioGroup } from '@chakra-ui/react';

import { RadioProps } from './Radio.types';

export const RadioBase = forwardRef<
  React.ComponentRef<typeof RadioGroup.Item>,
  RadioProps
>(({ id, children, ...props }, ref) => (
  <RadioGroup.Item
    ref={ref}
    cursor="pointer"
    _disabled={{ cursor: 'not-allowed' }}
    {...props}
  >
    <RadioGroup.ItemHiddenInput id={id} />
    {children}
  </RadioGroup.Item>
));
RadioBase.displayName = 'Radio';
