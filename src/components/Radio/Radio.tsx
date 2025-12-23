import React, { forwardRef, ReactNode } from 'react';
import { RadioGroup } from '@chakra-ui/react';

import { RadioProps } from './Radio.types';

// Extended types for RadioGroup compound components
type RadioGroupItemBaseProps = React.ComponentProps<typeof RadioGroup.Item>;
type RadioGroupItemProps = Omit<RadioGroupItemBaseProps, 'ref'> & {
  children?: ReactNode;
  css?: Record<string, any>;
  value?: string;
  disabled?: boolean;
};

type RadioGroupItemTextProps = React.ComponentProps<typeof RadioGroup.ItemText> & {
  children?: ReactNode;
};

const RadioItem = RadioGroup.Item as React.ForwardRefExoticComponent<
  RadioGroupItemProps & React.RefAttributes<HTMLDivElement>
>;
const RadioItemText = RadioGroup.ItemText as React.FC<RadioGroupItemTextProps>;

export const Radio = forwardRef<HTMLDivElement, RadioProps>(
  ({ children, value = '', disabled, ...rest }, ref) => {
    return (
      <RadioItem
        ref={ref}
        value={value}
        disabled={disabled}
        css={{
          '& [data-part="control"]': {
            '&[data-checked]': {
              bg: 'primary.main',
              borderColor: 'primary.main',
            },
          },
        }}
        {...(rest as RadioGroupItemProps)}
      >
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemControl />
        {children && <RadioItemText>{children}</RadioItemText>}
      </RadioItem>
    );
  }
);

Radio.displayName = 'Radio';
