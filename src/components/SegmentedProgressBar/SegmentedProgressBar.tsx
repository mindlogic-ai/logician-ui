import { Box } from '@chakra-ui/react';

import { SegmentedProgressBarProps } from './SegmentedProgressBar.types';
import { SegmentedProgressBarProvider } from './SegmentedProgressBarContext';

export const SegmentedProgressBar = ({
  max,
  ...rest
}: SegmentedProgressBarProps) => {
  return (
    <SegmentedProgressBarProvider max={max}>
      <Box
        position="relative"
        flex={1}
        display="flex"
        // The remainder behind the segments is a meter surface, so it needs a
        // visible fill. bg.muted (gray.100) is ~1.03:1 against the bg.sunken page
        // wash (gray.50) and vanishes there; bg.track (gray.300) reads as a
        // filled track on any background. Filled segments paint over it.
        bgColor="bg.track"
        borderRadius="full"
        w="100%"
        h="16px"
        overflow="hidden"
        {...rest}
      />
    </SegmentedProgressBarProvider>
  );
};
