/**
 * Returns `props` without the keys whose value is `undefined`.
 *
 * A component that sets a default and then spreads the caller's props —
 * `<Heading textStyle="h5" {...rest} />` — loses the default when the caller
 * writes `textStyle={cond ? x : undefined}`: the key is present in `rest`, so
 * the spread overwrites `"h5"` with `undefined` and Chakra falls back to its
 * own default. Spreading `omitUndefined(rest)` instead makes an explicit
 * `undefined` mean the same as leaving the prop out, which is what callers
 * expect from a conditional prop.
 *
 * `null` is kept: it is a deliberate value, not an absent one.
 */
export function omitUndefined<T extends object>(props: T): T {
  const entries = Object.entries(props);
  if (entries.every(([, value]) => value !== undefined)) return props;

  return Object.fromEntries(
    entries.filter(([, value]) => value !== undefined)
  ) as T;
}
