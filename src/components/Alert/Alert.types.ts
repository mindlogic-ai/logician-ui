import { ReactNode } from 'react';
import type { AlertRootProps } from '@chakra-ui/react';

export type AlertStatus = 'error' | 'success' | 'warning' | 'info';
export type AlertSize = 'sm' | 'md' | 'lg';

export interface AlertProps extends Omit<AlertRootProps, 'title'> {
  children?: ReactNode;
  status?: AlertStatus;
  /**
   * The size of the alert. Controls spacing and icon size.
   * @default "md"
   */
  size?: AlertSize;
  onClose?: () => void;
  /**
   * Optional title for the alert. When provided, renders Alert.Title.
   */
  title?: ReactNode;
  /**
   * Optional description for the alert. When provided, renders Alert.Description.
   */
  description?: ReactNode;
}
