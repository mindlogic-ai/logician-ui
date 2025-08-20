import { FormLabel as ChakraFormLabel, FormLabelProps } from '@chakra-ui/react';

export const FormLabel = (props: FormLabelProps) => (
  <ChakraFormLabel color="gray.1000" mb={0.5} marginInlineEnd={0} {...props} />
);
