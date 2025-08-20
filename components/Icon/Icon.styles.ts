import { BoxProps } from '@chakra-ui/react';

import { ColorModeData } from '@/store/colorMode';
import theme from '@/theme/index';

export const modeStyles: Record<
  ColorModeData['colorMode'],
  // TODO: is there a better type to define style props?
  Partial<BoxProps>
> = {
  Light: {
    color: theme.colors.black,
  },
  Dark: {
    color: theme.colors.white,
  },
};
