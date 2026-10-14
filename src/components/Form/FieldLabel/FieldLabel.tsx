import { Box, Flex } from '@chakra-ui/react';

import { FormLabel } from '@/components/FormLabel';
import { Subtext } from '@/components/Typography';

import { FieldLabelProps } from './FieldLabel.types';

/**
 * Label row for a form field: a semibold heading, an optional description, and
 * an `endAdornment` slot on the right (count badge, action button, info-sprinkle
 * trigger). The required asterisk is supplied automatically by the enclosing
 * `Field` context when the field is `required` (see `FieldRow`).
 *
 * Presentational — pair it with `FieldRow` (or any logician `FormControl`) so
 * the heading is programmatically associated with its control.
 */
export const FieldLabel = ({
  heading,
  description,
  endAdornment,
  mb = 0,
  htmlFor,
}: FieldLabelProps) => {
  return (
    <Flex align="center" justify="space-between" gap={2} mb={mb} w="100%">
      <Box>
        {heading != null && (
          <FormLabel
            mb={0}
            fontWeight="semibold"
            color="fg.default"
            htmlFor={htmlFor}
          >
            {heading}
          </FormLabel>
        )}
        {description && (
          <Subtext fontWeight="normal" color="fg.muted">
            {description}
          </Subtext>
        )}
      </Box>
      {endAdornment}
    </Flex>
  );
};
