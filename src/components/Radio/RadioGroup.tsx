import { RadioGroup as ChakraRadioGroup, mergeCss } from '@chakra-ui/react';

export const RadioGroup = ({ css, ...rest }) => {
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
