import { forwardRef } from 'react';
import { Heading, HeadingProps, useTheme } from '@chakra-ui/react';

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const theme = useTheme();
  return (
    <Heading
      ref={ref}
      as="h3"
      fontSize={theme.fontSizes.h3}
      fontWeight="semibold"
      {...props}
    />
  );
});

H3.displayName = 'H3';
