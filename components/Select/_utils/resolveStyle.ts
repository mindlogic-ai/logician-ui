type StyleObject = Record<string, any>;
type StyleFunction = (base: StyleObject, state: any) => StyleObject;

export const resolveStyle = (
  base: StyleObject,
  style?: StyleObject | StyleFunction,
  state: any = {},
): StyleObject => {
  if (!style) {
    return base;
  }

  if (typeof style === 'function') {
    return style(base, state);
  }

  return {
    ...base,
    ...style,
  };
};
