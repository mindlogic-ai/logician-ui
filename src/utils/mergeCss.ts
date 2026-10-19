import type { SystemStyleObject } from '@chakra-ui/react';
import merge from 'lodash/merge';

export const mergeCss = (
  ...styles: (SystemStyleObject | undefined | null | false)[]
): SystemStyleObject =>
  styles.reduce<SystemStyleObject>((acc, style) => {
    if (style && typeof style === 'object') {
      merge(acc, style);
    }
    return acc;
  }, {} as SystemStyleObject);
