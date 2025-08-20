import { AlertProps as ChakraAlertProps } from '@chakra-ui/react';

export interface AlertProps extends ChakraAlertProps {
  onClose?: () => void;
}
