import { ComponentProps } from 'react';
import { Editable, InputProps } from '@chakra-ui/react';

export interface DataFieldProps {
  label?: string;
  value: string;
  as?: any;
  onChange?: (val?: string) => void;
  inputProps?: Omit<InputProps, 'value'>;
  editableProps?: Omit<ComponentProps<typeof Editable.Root>, 'value'>;
  editablePreviewProps?: ComponentProps<typeof Editable.Preview>;
  isEditable?: boolean;
  isCopyable?: boolean;
  allowEmpty?: boolean;
}
