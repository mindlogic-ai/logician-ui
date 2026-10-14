import { VStack } from '@chakra-ui/react';

import { CollapsibleSection } from '@/components/Workflow';

import { FormSectionProps } from './FormSection.types';

type CollapsibleFormSectionProps = Pick<
  FormSectionProps,
  'title' | 'action' | 'defaultOpen' | 'hasError' | 'gap' | 'children'
>;

/**
 * The collapsible `FormSection` variant — delegates to the logician
 * `CollapsibleSection` accordion (which owns its own layout, so container style
 * overrides apply to the flat variant only). Requires a title.
 */
export const CollapsibleFormSection = ({
  title,
  action,
  defaultOpen = true,
  hasError = false,
  gap = 4,
  children,
}: CollapsibleFormSectionProps) => (
  <CollapsibleSection
    label={title ?? ''}
    defaultExpanded={defaultOpen}
    hasError={hasError}
    headerAction={action}
  >
    <VStack align="stretch" gap={gap} w="100%">
      {children}
    </VStack>
  </CollapsibleSection>
);
