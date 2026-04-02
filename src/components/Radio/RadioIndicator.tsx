import { forwardRef } from 'react';
import { RadioGroup } from '@chakra-ui/react';

import { focusRing } from '@/utils/focusRing';

export const RadioIndicator = forwardRef<
  React.ComponentRef<typeof RadioGroup.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroup.ItemIndicator>
>((props, ref) => <RadioGroup.ItemIndicator ref={ref} {...focusRing} {...props} />);
RadioIndicator.displayName = 'Radio.Indicator';
