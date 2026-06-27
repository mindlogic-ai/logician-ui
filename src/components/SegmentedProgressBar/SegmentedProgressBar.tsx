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
        bgColor="bg.muted"
        // The empty track (bg.muted, gray.100) is ~1.03:1 against the bg.sunken
        // page wash (gray.50), so it nearly vanishes on a sunken page. A hairline
        // border.subtle ring defines the bar's bounds on any background. An
        // outset box-shadow is not clipped by overflow:hidden and adds no layout.
        boxShadow="0 0 0 1px var(--chakra-colors-border-subtle)"
        borderRadius="full"
        w="100%"
        h="16px"
        overflow="hidden"
        {...rest}
      />
    </SegmentedProgressBarProvider>
  );
};
