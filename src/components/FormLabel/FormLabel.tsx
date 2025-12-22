import { Field } from '@chakra-ui/react';

type FieldLabelProps = React.ComponentProps<typeof Field.Label>;

export type FormLabelProps = FieldLabelProps;

export const FormLabel = (props: FormLabelProps) => (
  <Field.Label color="gray.1000" mb={0.5} marginInlineEnd={0} {...props} />
);
