import { forwardRef } from 'react';
import { Heading, HeadingProps, useTheme } from '@chakra-ui/react';

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const theme = useTheme();
  return (
    <Heading
      ref={ref}
      as="h1"
      fontSize={theme.fontSizes.h1}
      fontWeight="bold"
      {...props}
    />
  );
});

H1.displayName = 'H1';
