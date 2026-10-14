import { PropsWithChildren } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

/**
 * The scrolling body of a form panel: a full-height flex column that scrolls
 * vertically, so a `position="sticky" bottom={0}` `FormFooter` pins to its
 * bottom edge. Extracted from `FloatingPanelCard` so the same "scroll column +
 * pinned footer" geometry can back any left-panel form without pulling in the
 * card chrome.
 */
export const FormScrollArea = ({
  children,
  ...rest
}: PropsWithChildren<BoxProps>) => (
  <Box
    h="100%"
    overflowY="auto"
    position="relative"
    display="flex"
    flexDirection="column"
    {...rest}
  >
    {children}
  </Box>
);

FormScrollArea.displayName = 'FormScrollArea';
