import { Box, CloseButton, Flex } from '@chakra-ui/react';

import { H5, Text } from '../Typography';
import { closeButtonStyles } from './Toast.styles';
import { ToastProps } from './Toast.types';
import { ToastIcon } from './ToastIcon/ToastIcon';

export const Toast = ({
  title,
  description,
  status = 'success',
  onClose,
  ...rest
}: ToastProps & { onClose?: () => void }) => (
  <Flex
    align="center"
    p={4}
    gap={3}
    borderWidth="1px"
    borderRadius="md"
    boxShadow="lg"
    whiteSpace="pre-line"
    position="relative"
    pointerEvents="auto"
    animationName="fade-in, slide-from-top"
    animationDuration="400ms"
    animationTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
    {...(rest as any)}
  >
    <ToastIcon status={status} />
    <Box flex={1}>
      {title && (
        <H5 fontWeight="bold" mb={2}>
          {title}
        </H5>
      )}
      <Text color="inherit">{description}</Text>
    </Box>
    <CloseButton onClick={onClose} size="sm" {...closeButtonStyles[status]} />
  </Flex>
);
