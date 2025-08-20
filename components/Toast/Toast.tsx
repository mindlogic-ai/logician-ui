import { Box, CloseButton, Flex } from '@chakra-ui/react'; // Import CloseButton

import { H5, Text } from '../Typography';
import { ToastProps } from './Toast.types';
import { ToastIcon } from './ToastIcon/ToastIcon';

export const Toast = ({
  title,
  description,
  status = 'success',
  onClose, // Add onClose prop
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
    {...rest}
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
    <CloseButton
      onClick={onClose} // Call onClose when clicked
    />
  </Flex>
);
