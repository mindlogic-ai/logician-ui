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
    info: <InfoCircleIcon boxSize="md" color="info.fg" />,
    warning: <WarningIcon boxSize="lg" color="warning.fg" />,
    success: <CircleCheckIcon boxSize="lg" color="success.fg" />,
    error: <AlertCircleFilledIcon boxSize="lg" color="danger.fg" />,
    // neutral carries no status — no icon
    neutral: null,
  };

  return iconProps[status];
};
