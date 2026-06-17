import { toastStyles } from '@/components/Toast';

import type { Issue, IssueSeverity } from '../Workflow.types';

const SEVERITY_PRECEDENCE: Record<IssueSeverity, number> = {
  error: 2,
  warning: 1,
};

/**
 * The single issue a one-slot surface should represent: highest severity
 * wins, first-listed breaks ties. Shared by every "tint by worst issue"
 * consumer (field borders, the header title editor) so precedence can't
 * drift between surfaces.
 */
export const pickPrimaryIssue = (issues: Issue[]): Issue | null => {
  if (issues.length === 0) return null;
  let primary = issues[0];
  for (let i = 1; i < issues.length; i += 1) {
    if (
      SEVERITY_PRECEDENCE[issues[i].severity] >
      SEVERITY_PRECEDENCE[primary.severity]
    ) {
      primary = issues[i];
    }
  }
  return primary;
};

/**
 * Semantic color token for an issue severity — shared across issue list UIs.
 * `tone` selects the shade: the default `'main'` for text/icons, or `'dark'`
 * where `.main` is too light to read (e.g. the small list-bullet markers in
 * drawer issue callouts, which need extra contrast against the tinted bg).
 */
export const severityColorToken = (
  severity: IssueSeverity,
  tone: 'main' | 'dark' = 'main'
): string => (severity === 'error' ? `danger.${tone}` : `warning.${tone}`);

/**
 * Tinted callout styling (bg / border / text) for an issue severity. Reuses the
 * `Toast` component's golden-ratio combo — the documented WCAG AA pairing — so
 * the boxed inspector callouts stay in lockstep with it instead of restating
 * the tokens. `IssueSeverity` is a subset of the toast statuses.
 */
export const severityCalloutStyle = (severity: IssueSeverity) =>
  toastStyles[severity];
