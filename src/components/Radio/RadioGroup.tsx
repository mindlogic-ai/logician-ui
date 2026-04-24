import type { RadioGroupRootProps } from '@chakra-ui/react';
import { RadioGroup as ChakraRadioGroup } from '@chakra-ui/react';

import { mergeCss } from '@/utils/mergeCss';

export const RadioGroup = ({ css, ...rest }: RadioGroupRootProps) => {
  return (
    <ChakraRadioGroup.Root
      {...rest}
      css={mergeCss(
        {
          '--chakra-colors-color-palette-solid':
            'var(--chakra-colors-primary-main)',
          '--chakra-colors-color-palette-contrast':
            'var(--chakra-colors-white)',
        },
        css
      )}
    />
  );
};
