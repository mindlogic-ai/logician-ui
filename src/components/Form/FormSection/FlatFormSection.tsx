import { Box, VStack } from '@chakra-ui/react';

import { FormSectionHeader } from '../FormSectionHeader';
import { FormSectionProps } from './FormSection.types';

type FlatFormSectionProps = Omit<
  FormSectionProps,
  'collapsible' | 'defaultOpen' | 'hasError'
>;

/** The flat (non-collapsible) `FormSection` variant. */
export const FlatFormSection = ({
  title,
  titleAdornment,
  description,
  action,
  divider = false,
  gap = 4,
  children,
  ...boxProps
}: FlatFormSectionProps) => (
  <Box
    w="100%"
    pt={divider ? 4 : undefined}
    borderTopWidth={divider ? '1px' : undefined}
    borderColor={divider ? 'border.subtle' : undefined}
    {...boxProps}
  >
    {(title || titleAdornment || description || action) && (
      <FormSectionHeader
        title={title}
        titleAdornment={titleAdornment}
        description={description}
        action={action}
      />
    )}
    <VStack align="stretch" gap={gap} w="100%">
      {children}
    </VStack>
  </Box>
);
