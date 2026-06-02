import { ReactNode } from 'react';
import { GroupProps, InputProps } from '@chakra-ui/react';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  /**
   * Props for the root InputGroup wrapper
   */
  rootProps?: GroupProps;
  /**
   * The default visibility state of the password input.
   */
  defaultVisible?: boolean;
  /**
   * The controlled visibility state of the password input.
   */
  visible?: boolean;
  /**
   * Callback invoked when the visibility state changes.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Custom icons for the visibility toggle button.
   */
  visibilityIcon?: { on: ReactNode; off: ReactNode };
}
