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
 * `role` selects which half of the status family: the default `'fg'` for
 * text, icons and borders (it's tuned to read on both `bg.*` and the plain
 * canvas, which is the 4.x two-tone `main`/`dark` split collapsed into one
 * token), or `'solid'` for an actually-filled shape (a dot, a bar) that
 * needs the stronger fill colour `.onSolid` text is designed to sit on.
 */
export const severityColorToken = (
  severity: IssueSeverity,
  role: 'fg' | 'solid' = 'fg'
): string => (severity === 'error' ? `danger.${role}` : `warning.${role}`);

/**
 * Tinted callout styling (bg / border / text) for an issue severity. Reuses the
 * `Toast` component's golden-ratio combo — the documented WCAG AA pairing — so
 * the boxed inspector callouts stay in lockstep with it instead of restating
 * the tokens. `IssueSeverity` is a subset of the toast statuses.
 */
export const severityCalloutStyle = (severity: IssueSeverity) =>
  toastStyles[severity];
