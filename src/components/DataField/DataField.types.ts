import {
  EditablePreviewProps,
  EditableProps,
  InputProps,
} from '@chakra-ui/react';

export interface DataFieldProps {
  label?: string;
  value: string;
  as?: EditableProps['as'];
  onChange?: (val?: string) => void;
  inputProps?: Omit<InputProps, 'value'>;
  editableProps?: Omit<EditableProps, 'value'>;
  editablePreviewProps?: EditablePreviewProps;
  isEditable?: boolean;
  isCopyable?: boolean;
  allowEmpty?: boolean;
}
