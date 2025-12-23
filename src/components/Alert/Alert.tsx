import { Alert as ChakraAlert, CloseButton } from '@chakra-ui/react';

import { AlertStyles } from './Alert.styles';
import { AlertProps } from './Alert.types';

/**
 * A reusable Alert component that displays status messages.
 *
 * @param children - The content to display inside the alert.
 * @param status - The status of the alert. Determines the visual style of the alert.
 *                 Options: `'error' | 'success' | 'warning' | 'info'`.
 *                 Default: `'error'`.
 * @param onClose - Callback function triggered when the close button is clicked.
 *                  If provided, a close button will be rendered in the alert.
 *                  The function receives no arguments.
 * @param rest - Additional props inherited from Chakra UI's `AlertProps`.
 */
export const Alert = ({
  children,
  status = 'error',
  onClose,
  ...rest
}: AlertProps) => {
  const styles = AlertStyles[status] || {};

  return (
    <ChakraAlert.Root
      minH={16}
      display="flex"
      justifyContent="center"
      status={status}
      {...styles}
      {...rest}
    >
      <ChakraAlert.Indicator />
      <ChakraAlert.Content>{children}</ChakraAlert.Content>
      {onClose && <CloseButton onClick={onClose} />}
    </ChakraAlert.Root>
  );
};
