import { useEffect, useState } from 'react';
import { TextProps } from '@chakra-ui/react';

import { Subtitle } from '../Typography';

export const MaxLengthIndicator = ({
  value,
  maxLength,
  ...rest
}: {
  value: number;
  maxLength: number;
} & TextProps) => {
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <Subtitle fontSize="subtext" color="gray.600" {...rest}>
      {currentValue}/{maxLength}
    </Subtitle>
  );
};
