import { AvatarProps, InputProps } from '@chakra-ui/react';

export interface AvatarInputProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  /**
   * A callback function to handle file changes.
   * Receives the selected file or `undefined` when the avatar is cleared.
   */
  onFileChange?: (file?: File) => void;

  /**
   * The controlled value for the avatar input.
   * Can either be a File or a URL string.
   */
  value?: File | string | null;

  /**
   * Props to be passed to the Avatar component.
   */
  avatarProps?: AvatarProps;
}
