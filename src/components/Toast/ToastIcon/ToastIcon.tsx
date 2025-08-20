import { useTheme, useToken } from '@chakra-ui/react';

import { Icon, IconProps } from '../../Icon';
import { ToastProps } from '../Toast.types';

export const ToastIcon = ({ status }: Required<Pick<ToastProps, 'status'>>) => {
  const theme = useTheme();

  const iconProps: { [K in typeof status]: Omit<IconProps, 'ref'> } = {
    success: {
      icon: 'IoIosCheckmarkCircle',
      color: useToken('colors', theme.semanticTokens.colors.success.main),
    },
    error: {
      icon: 'MdError',
      color: useToken('colors', theme.semanticTokens.colors.danger.main),
    },
    info: {
      icon: 'LuInfo',
      color: useToken('colors', theme.semanticTokens.colors.primary.main),
      boxSize: 'md',
    },
  };

  return <Icon boxSize="lg" {...iconProps[status]} />;
};
