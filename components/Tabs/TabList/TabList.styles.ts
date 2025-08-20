import { TabListProps } from '@chakra-ui/react';

import { ColorModeData } from '@/store/colorMode';

export const modeStyles: Record<
  ColorModeData['colorMode'],
  // TODO: is there a better type to define style props?
  Partial<TabListProps>
> = {
  Light: {
    // This is the divider line. Tab colors are set in the Tab component.
    // TODO: move to palette
    // color: '#ababab',
  },
  Dark: {
    // TODO: move to palette
    color: '#ddd',
  },
};

export const verticalStyles = {
  borderInlineEnd: '1px solid',
  borderInlineStart: 'none',
};
