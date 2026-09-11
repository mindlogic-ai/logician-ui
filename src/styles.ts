/**
 * Pure style objects, importable without the component barrel.
 *
 * The root entry (`@mindlogic-ai/logician-ui`) pulls in every component, and
 * with them side-effect CSS imports such as `katex/dist/katex.min.css`. A
 * bundler handles that; a plain Node loader does not, so a consumer's unit test
 * that imports a style constant from the root fails to load the module at all
 * (`Unknown file extension ".css"`). Importing a style object should not cost
 * the whole design system.
 *
 * Everything re-exported here must stay free of runtime imports — types only —
 * so this entry brings in nothing but the objects themselves.
 *
 * ```ts
 * import { noZoomOnFocus } from '@mindlogic-ai/logician-ui/styles';
 * ```
 *
 * These names are also on the root entry, so existing imports keep working.
 */
export { noZoomOnFocus } from './theme/formControls';
