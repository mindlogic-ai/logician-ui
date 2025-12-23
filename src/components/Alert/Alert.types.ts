import { Alert } from '@chakra-ui/react';
import { ComponentProps, ReactNode } from 'react';

export type AlertStatus = 'error' | 'success' | 'warning' | 'info';

export interface AlertProps extends ComponentProps<typeof Alert.Root> {
  children?: ReactNode;
  status?: AlertStatus;
  onClose?: () => void;
}
