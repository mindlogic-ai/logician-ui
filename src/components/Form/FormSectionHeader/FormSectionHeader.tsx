import { Box, Flex } from '@chakra-ui/react';

import { H5, Subtext } from '@/components/Typography';

import { FormSectionHeaderProps } from './FormSectionHeader.types';

/**
 * The standardized section (fieldset) header — the section-level counterpart to
 * {@link FieldLabel}. A heading, an optional inline adornment, a description,
 * and a right-aligned action, laid out with one consistent rhythm (`H5` over a
 * muted `Subtext`). Shared by `FormSection` and the studio `GroupHeader` so
 * every titled field group reads the same everywhere.
 *
 * The description sits inside the left column so a tall `action` centers against
 * the whole heading+description block, matching the prior studio `GroupHeader`.
 */
export const FormSectionHeader = ({
  title,
  titleAdornment,
  description,
  action,
  mb = 3,
  ...flexProps
}: FormSectionHeaderProps) => (
  <Flex
    align="center"
    justify="space-between"
    gap={2}
    mb={mb}
    w="100%"
    {...flexProps}
  >
    <Box>
      {(title || titleAdornment) && (
        <Flex align="center" gap={1} mb={description ? 1 : 0}>
          {title && <H5>{title}</H5>}
          {titleAdornment}
        </Flex>
      )}
      {description && (
        <Subtext color="fg.muted" fontWeight="normal">
          {description}
        </Subtext>
      )}
    </Box>
    {action}
  </Flex>
);
