import { CodeBlock as ChakraCodeBlock } from '@chakra-ui/react';

import { FaCheck } from '../Icon';
import { CodeProps } from './Code.types';
import { shikiAdapter } from './shikiAdapter';

export const Code = ({
  children,
  language: languageProp,
  onCopy,
  hideHeader = false,
  containerProps,
  ...rest
}: CodeProps) => {
  const language = languageProp === 'js' ? 'javascript' : languageProp;

  const handleCopy = () => {
    onCopy?.(children);
  };

  return (
    <ChakraCodeBlock.AdapterProvider value={shikiAdapter}>
      <ChakraCodeBlock.Root
        code={children}
        language={language}
        textStyle="Body"
        overflow="hidden"
        borderColor="gray.300"
        {...containerProps}
        {...rest}
        onCopy={handleCopy}
        className={['ml-code', containerProps?.className]
          .filter(Boolean)
          .join(' ')}
      >
        {!hideHeader && language && (
          <ChakraCodeBlock.Header
            className="ml-code-header"
            px={4}
            py={2}
            bgColor="white"
            zIndex={2}
          >
            <ChakraCodeBlock.Title
              fontFamily="mono"
              fontWeight="bold"
              color="gray.1200"
            >
              {language}
            </ChakraCodeBlock.Title>
            <ChakraCodeBlock.Control>
              {onCopy && (
                <ChakraCodeBlock.CopyTrigger
                  aria-label="Copy code"
                  color="gray.600"
                  cursor="pointer"
                >
                  <ChakraCodeBlock.CopyIndicator
                    copied={<FaCheck color="success.main" boxSize="xs" />}
                  />
                </ChakraCodeBlock.CopyTrigger>
              )}
            </ChakraCodeBlock.Control>
          </ChakraCodeBlock.Header>
        )}
        <ChakraCodeBlock.Content>
          <ChakraCodeBlock.Code>
            <ChakraCodeBlock.CodeText />
          </ChakraCodeBlock.Code>
        </ChakraCodeBlock.Content>
      </ChakraCodeBlock.Root>
    </ChakraCodeBlock.AdapterProvider>
  );
};
