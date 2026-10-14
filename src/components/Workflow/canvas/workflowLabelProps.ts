/**
 * Shared label styling for inputs inside the workflow editor's drawer.
 * Mirrors the outer ChatbotForm's `FieldLabel` heading tokens so the
 * editor's inspector reads as the same form surface; the Workflow
 * canvas can't import from the studio `app/` route, so this lives at
 * the canvas layer instead.
 */
export const workflowLabelProps = {
  fontWeight: 'semibold',
  color: 'slate.1300',
} as const;
