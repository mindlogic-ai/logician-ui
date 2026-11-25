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
 *
 * Runs on every render of every typography node, so the common case (nothing
 * undefined) returns the same object without allocating.
 */
export function omitUndefined<T extends object>(props: T): T {
  for (const key in props) {
    if (props[key] === undefined) {
      const out: Partial<T> = {};
      for (const k in props) if (props[k] !== undefined) out[k] = props[k];
      return out as T;
    }
  }
  return props;
}
