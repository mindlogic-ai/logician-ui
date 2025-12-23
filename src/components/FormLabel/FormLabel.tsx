import { ReactNode } from 'react';
import { Field } from '@chakra-ui/react';

type FieldLabelBaseProps = React.ComponentProps<typeof Field.Label>;

export interface FormLabelProps extends FieldLabelBaseProps {
  children?: ReactNode;
}

export const FormLabel = ({ children, ...props }: FormLabelProps) => (
  <Field.Label
    css={{
      color: 'var(--chakra-colors-gray-1000)',
      marginBottom: '2px',
      marginInlineEnd: 0,
    }}
    {...props}
  >
    {children}
  </Field.Label>
);
