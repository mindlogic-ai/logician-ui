import { merge } from 'lodash';

export const mergeCss = (...styles: unknown[]): Record<string, unknown> =>
  styles.reduce<Record<string, unknown>>((acc, style) => {
    if (style && typeof style === 'object') {
      merge(acc, style);
    }
    return acc;
  }, {});
