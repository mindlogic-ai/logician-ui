import { CollapsibleFormSection } from './CollapsibleFormSection';
import { FlatFormSection } from './FlatFormSection';
import { FormSectionProps } from './FormSection.types';

/**
 * A titled group of form fields with one consistent rhythm — the shared
 * replacement for the studio panels' ad-hoc `GroupHeader`/`ModeSection` +
 * per-tab `VStack` gaps (8/6/12) and the workflow inspector's per-node section
 * headers. Renders flat by default; set `collapsible` (with a `title`) to render
 * the logician `CollapsibleSection` accordion. `gap` standardizes the field
 * spacing so sections read the same everywhere.
 *
 * Thin dispatcher over the two single-purpose variants so each has one return.
 */
export const FormSection = ({
  collapsible = false,
  defaultOpen = true,
  hasError = false,
  ...rest
}: FormSectionProps) =>
  collapsible && rest.title ? (
    <CollapsibleFormSection
      title={rest.title}
      action={rest.action}
      gap={rest.gap}
      defaultOpen={defaultOpen}
      hasError={hasError}
    >
      {rest.children}
    </CollapsibleFormSection>
  ) : (
    <FlatFormSection {...rest} />
  );
