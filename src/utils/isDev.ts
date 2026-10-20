/**
 * Whether the library is running in a development build, for dev-only
 * warnings (deprecated props, 4.x mappings).
 *
 * Written as the bare `process.env.NODE_ENV` expression on purpose: that exact
 * text is what bundlers replace at build time (Vite `define`, webpack
 * `DefinePlugin`, esbuild, Next.js), so a production build folds this to
 * `false` and the warning code around it is dropped. Two "safer" spellings
 * break that and must not come back:
 *
 * - `typeof process !== 'undefined' && …` — under Vite there is no `process`
 *   global at runtime, so the guard is false and the warning never fires in
 *   development either.
 * - `process.env?.NODE_ENV` — optional chaining is a different expression, so
 *   `DefinePlugin` no longer matches it.
 *
 * The `try` only covers a raw, unbundled browser (no bundler, no `process`):
 * there the reference throws, and we report "not dev" instead of crashing.
 * It does not stop the bundler from replacing the expression inside it.
 */
export const isDev = (): boolean => {
  try {
    return process.env.NODE_ENV !== 'production';
  } catch {
    return false;
  }
};
