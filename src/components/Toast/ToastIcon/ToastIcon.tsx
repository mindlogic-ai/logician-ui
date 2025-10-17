import { IoIosCheckmarkCircle, LuInfo, MdError } from '@/components/Icon';

import { ToastProps } from '../Toast.types';

export const ToastIcon = ({ status }: Required<Pick<ToastProps, 'status'>>) => {
  const iconProps: { [K in typeof status]: React.ReactNode } = {
    success: <IoIosCheckmarkCircle boxSize="lg" color="success.main" />,
    error: <MdError boxSize="lg" color="danger.main" />,
    info: <LuInfo boxSize="md" color="primary.main" />,
  };

  return iconProps[status];
};
