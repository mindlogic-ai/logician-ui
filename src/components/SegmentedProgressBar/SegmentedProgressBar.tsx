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
        borderRadius="full"
        w="100%"
        h="16px"
        overflow="hidden"
        {...rest}
      />
    </SegmentedProgressBarProvider>
  );
};
