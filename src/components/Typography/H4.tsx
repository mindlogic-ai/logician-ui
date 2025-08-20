import { forwardRef } from 'react';
import { Heading, HeadingProps, useTheme } from '@chakra-ui/react';

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const theme = useTheme();
  return (
    <Heading
      ref={ref}
      as="h4"
      fontSize={theme.fontSizes.h4}
      fontWeight="semibold"
      {...props}
    />
  );
});

H4.displayName = 'H4';
