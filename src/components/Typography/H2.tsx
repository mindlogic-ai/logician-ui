import { forwardRef } from 'react';
import { Heading, HeadingProps, useTheme } from '@chakra-ui/react';

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const theme = useTheme();
  return (
    <Heading
      ref={ref}
      as="h2"
      fontSize={theme.fontSizes.h2}
      fontWeight="semibold"
      {...props}
    />
  );
});

H2.displayName = 'H2';
