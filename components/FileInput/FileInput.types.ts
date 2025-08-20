import { FlexProps } from '@chakra-ui/react';

import { InputProps } from '@/components/Input';

export type FileInputProps = Omit<InputProps, 'onChange' | 'bgImage'> & {
  fileInputLabel?: string;
  containerStyle?: FlexProps;
  onChange: (files: FileList | null) => void;
  /**
   * background image change
   */
  bgImage?: string;
  isLoading?: boolean;
};
