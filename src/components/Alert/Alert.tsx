import { Alert as ChakraAlert, CloseButton } from '@chakra-ui/react';

import { AlertStyles } from './Alert.styles';
import { AlertProps } from './Alert.types';

/**
 * A reusable Alert component that displays status messages.
 *
 * @param title - The title of the alert message.
 * @param description - The description/details of the alert message.
 * @param children - Optional additional content to display after description.
 * @param status - The status of the alert. Determines the visual style.
 *                 Options: `'error' | 'success' | 'warning' | 'info'`.
 *                 Default: `'error'`.
 * @param size - The size of the alert. Controls spacing and icon size.
 *               Options: `'sm' | 'md' | 'lg'`.
 *               Default: `'md'`.
 * @param onClose - Callback function triggered when the close button is clicked.
 * @param rest - Additional props inherited from Chakra UI's AlertRootProps.
 *
 * @example
 * // Basic usage
 * <Alert
 *   status="success"
 *   title="Success!"
 *   description="Your changes have been saved."
 * />
 *
 * @example
 * // With close button
 * <Alert
 *   status="error"
 *   title="Error"
 *   description="Failed to save changes."
 *   onClose={() => console.log('closed')}
 * />
 *
 * @example
 * // With additional content
 * <Alert status="info" title="Information" description="New feature available">
 *   <Button>Learn More</Button>
 * </Alert>
 */
export const Alert = ({
  title,
  description,
  children,
  status = 'error',
  size = 'md',
  onClose,
  ...rest
}: AlertProps) => {
  const styles = AlertStyles[status] || {};

  return (
    <ChakraAlert.Root status={status} size={size} {...styles} {...rest}>
      <ChakraAlert.Indicator />
      <ChakraAlert.Content>
        {title && <ChakraAlert.Title>{title}</ChakraAlert.Title>}
        {description && (
          <ChakraAlert.Description>{description}</ChakraAlert.Description>
        )}
        {children}
      </ChakraAlert.Content>
      {onClose && <CloseButton onClick={onClose} />}
    </ChakraAlert.Root>
  );
};
