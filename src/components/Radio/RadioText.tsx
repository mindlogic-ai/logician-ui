import { forwardRef } from 'react';
import { RadioGroup } from '@chakra-ui/react';

export const RadioText = forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof RadioGroup.ItemText>
>((props, ref) => <RadioGroup.ItemText ref={ref} {...props} />);
RadioText.displayName = 'Radio.Text';
