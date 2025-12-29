import { RadioGroup as ChakraRadioGroup } from '@chakra-ui/react';

export const RadioGroup = ({ ...rest }) => {
  return (
    <ChakraRadioGroup.Root
      css={{
        '--chakra-colors-color-palette-solid':
          'var(--chakra-colors-primary-main)',
        '--chakra-colors-color-palette-contrast': 'var(--chakra-colors-white)',
      }}
      {...rest}
    />
  );
};
