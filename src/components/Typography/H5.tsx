import { forwardRef } from 'react';
import { Heading, HeadingProps, useTheme } from '@chakra-ui/react';

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const theme = useTheme();
  return (
    <Heading
      ref={ref}
      as="h5"
      fontSize={theme.fontSizes.h5}
      fontWeight="bold"
      {...props}
    />
  );
});

H5.displayName = 'H5';
