/**
 * The CodeTabs chrome (tab bar, copy button) and the code body under it.
 *
 * The code is highlighted with Shiki's `github-dark`, whose token colours are
 * written for a dark ground in BOTH app modes, so the surface must stay dark in
 * both too. `bg.inverse` does not: it is `tooltip.bg`, near-black in light but
 * a light warm grey in dark, and the `fg.muted` text on it flipped as well (~1.4:1 in
 * light, ~1.1:1 in dark).
 *
 * `action.*` is the one role pair that is dark in every mode (BAZE ink:
 * #252525 light / #2E2F2F dark, `action.fg` 12.5–13.4:1 on it, high contrast
 * included), so the chrome reads it. The unselected label is `action.fg` at
 * 70% — ≥ 7.0:1 on `action.bg` and ≥ 5.6:1 on `action.bgHover`, both schemes,
 * all four modes.
 *
 * Borrowed rather than owned: `action.*` is the Run button's role. A dedicated
 * `code.*` role family (bg / fg / fgMuted / bgHover) would be the clean home.
 */
export const CODE_CHROME = {
  bg: 'action.bg',
  bgHover: 'action.bgHover',
  bgActive: 'action.bgActive',
  fg: 'action.fg',
  fgMuted: 'action.fg/70',
  divider: 'action.fg/15',
} as const;
