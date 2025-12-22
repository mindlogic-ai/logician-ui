import { Alert } from '@chakra-ui/react';

type ChakraAlertRootProps = React.ComponentProps<typeof Alert.Root>;

export interface AlertProps extends ChakraAlertRootProps {
  children?: React.ReactNode;
  status?: 'error' | 'success' | 'warning' | 'info';
  onClose?: () => void;
}
