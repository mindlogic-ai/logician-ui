import { Field, Box } from '@chakra-ui/react';

export const FormLabel = (props: Field.LabelProps) => (
  <Box color="gray.1000">
    <Field.Label {...(props as any)} style={{ marginBottom: '0.125rem', marginInlineEnd: 0, ...((props as any).style || {}) }} />
  </Box>
);
