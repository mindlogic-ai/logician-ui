import { ComponentProps } from 'react';
import { Editable, InputProps } from '@chakra-ui/react';

export interface EditablePropsCustom {
  onSubmit?: (value: string) => void;
  placeholder?: string;
  startWithEditView?: boolean;
  selectAllOnFocus?: boolean;
}

export interface DataFieldProps {
  label?: string;
  value: string;
  as?: any;
  onChange?: (val?: string) => void;
  inputProps?: Omit<InputProps, 'value'>;
  editableProps?: EditablePropsCustom;
  editablePreviewProps?: ComponentProps<typeof Editable.Preview>;
  isEditable?: boolean;
  isCopyable?: boolean;
  allowEmpty?: boolean;
}
