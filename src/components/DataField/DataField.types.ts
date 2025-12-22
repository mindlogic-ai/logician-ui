import { Editable, InputProps } from '@chakra-ui/react';
import React from 'react';

type EditableRootProps = React.ComponentProps<typeof Editable.Root>;
type EditablePreviewProps = React.ComponentProps<typeof Editable.Preview>;

export interface DataFieldProps {
  label?: string;
  value: string;
  as?: React.ElementType;
  onChange?: (val?: string) => void;
  inputProps?: Omit<InputProps, 'value'>;
  editableProps?: Omit<EditableRootProps, 'value'> & { onSubmit?: (value: string) => void };
  editablePreviewProps?: EditablePreviewProps;
  isEditable?: boolean;
  isCopyable?: boolean;
  allowEmpty?: boolean;
}
