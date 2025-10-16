import { useTheme, useToken } from '@chakra-ui/react';

import { IoIosCheckmarkCircle, LuInfo, MdError } from '../../Icon';
import { ToastProps } from '../Toast.types';

export const ToastIcon = ({ status }: Required<Pick<ToastProps, 'status'>>) => {
  const theme = useTheme();

  const iconProps: { [K in typeof status]: React.ReactNode } = {
    success: (
      <IoIosCheckmarkCircle
        boxSize="lg"
        color={useToken('colors', theme.semanticTokens.colors.success.main)}
      />
    ),
    error: (
      <MdError
        boxSize="lg"
        color={useToken('colors', theme.semanticTokens.colors.danger.main)}
      />
    ),
    info: (
      <LuInfo
        boxSize="md"
        color={useToken('colors', theme.semanticTokens.colors.primary.main)}
      />
    ),
  };

  return iconProps[status];
};
