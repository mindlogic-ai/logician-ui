import { Box, Field } from '@chakra-ui/react';

export const FormLabel = (props: Field.LabelProps) => (
  <Box color="gray.1000">
    <Field.Label
      {...props}
      style={{
        marginBottom: '0.125rem',
        marginInlineEnd: 0,
        ...(props.style || {}),
      }}
    >
      {props.children}
      <Field.RequiredIndicator />
    </Field.Label>
  </Box>
);
