import { ReactNode } from 'react';
import { Field } from '@chakra-ui/react';

type FieldLabelBaseProps = React.ComponentProps<typeof Field.Label>;

// Extended type for Chakra v3 compound component
type FieldLabelProps = FieldLabelBaseProps & {
  children?: ReactNode;
  css?: Record<string, any>;
};

// Cast to extended type
const FieldLabel = Field.Label as React.FC<FieldLabelProps>;

export interface FormLabelProps extends FieldLabelBaseProps {
  children?: ReactNode;
}

export const FormLabel = ({ children, ...props }: FormLabelProps) => (
  <FieldLabel
    css={{
      color: 'var(--chakra-colors-gray-1000)',
      marginBottom: '2px',
      marginInlineEnd: 0,
    }}
    {...props}
  >
    {children}
  </FieldLabel>
);
