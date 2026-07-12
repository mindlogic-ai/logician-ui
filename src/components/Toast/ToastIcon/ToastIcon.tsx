import { ReactNode } from 'react';

import {
  AlertCircleFilledIcon,
  CircleCheckIcon,
  InfoCircleIcon,
  WarningIcon,
} from '@/components/Icon';

import { ToastProps, ToastStatus } from '../Toast.types';

export const ToastIcon = ({ status }: Required<Pick<ToastProps, 'status'>>) => {
  const iconProps: Record<ToastStatus, ReactNode> = {
    info: <InfoCircleIcon boxSize="md" color="primary.main" />,
    warning: <WarningIcon boxSize="lg" color="warning.main" />,
    success: <CircleCheckIcon boxSize="lg" color="success.main" />,
    error: <AlertCircleFilledIcon boxSize="lg" color="danger.main" />,
  };

  return iconProps[status];
};
