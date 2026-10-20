import { Flex, Stack, Toast as ChakraToast } from '@chakra-ui/react';

import { actionStyles, closeButtonStyles } from './Toast.styles';
import { ToastProps } from './Toast.types';
import { ToastIcon } from './ToastIcon/ToastIcon';

/**
 * Toast component using Chakra UI v3 composition pattern
 *
 * Uses Toast.Root, Toast.Title, Toast.Description, Toast.ActionTrigger and
 * Toast.CloseTrigger for better composition and customization.
 *
 * `action` renders under the description as a text action in the status
 * color, aligned with the text column. Don't put a `<Button>` in
 * `description` — use `action`.
 */
export const Toast = ({
  title,
  description,
  status = 'success',
  onClose,
  action,
  ...rest
}: ToastProps) => (
  <ChakraToast.Root
    width={{ md: 'sm' }}
    borderWidth="1px"
    borderRadius="md"
    boxShadow="lg"
    pointerEvents="auto"
    {...rest}
  >
    <Flex align="center" gap={2}>
      {/* Custom icon based on status */}
      <ToastIcon status={status} />
      <Stack gap={1} flex={1} maxWidth="100%">
        {title && (
          <ChakraToast.Title fontWeight="bold" fontSize="h5">
            {title}
          </ChakraToast.Title>
        )}
        {description && (
          <ChakraToast.Description color="inherit" fontWeight="semibold">
            {description}
          </ChakraToast.Description>
        )}
        {action && (
          <ChakraToast.ActionTrigger
            onClick={action.onClick}
            {...(actionStyles[status] as any)}
          >
            {action.label}
          </ChakraToast.ActionTrigger>
        )}
      </Stack>
    </Flex>
    <ChakraToast.CloseTrigger
      onClick={onClose}
      cursor="pointer"
      {...(closeButtonStyles[status] as any)}
    />
  </ChakraToast.Root>
);
