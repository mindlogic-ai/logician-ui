import React, { MouseEventHandler, useState } from 'react';
import { Box, Flex, useTheme, useToken, VStack } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { lighten, readableColor } from 'polished';

import { Tooltip } from '../components/Tooltip';
import { H4, Text } from '../components/Typography';

const meta: Meta = {
  title: 'Setup/Theme',
};

export default meta;
type Story = StoryFn<typeof meta>;

const ColorCard = ({
  color,
  shade,
  shadeValue,
}: {
  color: string;
  shade: string;
  shadeValue: string;
}) => {
  const [wasCopied, setWasCopied] = useState<boolean>();
  const theme = useTheme();

  // Function to resolve nested color tokens to final hex values
  const resolveColorToken = (tokenValue: string): string => {
    // If it's already a hex color, return it
    if (tokenValue.startsWith('#')) {
      return tokenValue;
    }

    // If it's a token reference like "blue.900", resolve it
    if (tokenValue.includes('.')) {
      const [colorName, shade] = tokenValue.split('.');
      const resolvedColor = theme.colors?.[colorName]?.[shade];

      // If the resolved color is still a token reference, resolve it recursively
      if (resolvedColor && typeof resolvedColor === 'string') {
        return resolveColorToken(resolvedColor);
      }

      return resolvedColor || tokenValue;
    }

    // Try to get it from useToken as fallback
    return useToken('colors', tokenValue) || tokenValue;
  };

  const hexCode = resolveColorToken(shadeValue);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(hexCode);
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 2000);
  };

  // Helper function to safely use polished functions
  const getReadableColor = (bgColor: string) => {
    try {
      return readableColor(bgColor);
    } catch {
      return 'white'; // fallback
    }
  };

  const getLightenedColor = (bgColor: string) => {
    try {
      return lighten(0.2, bgColor);
    } catch {
      return bgColor; // fallback to original color
    }
  };

  return (
    <Flex flexDir="column" align="center" key={shade} p={2}>
      <Tooltip label="Copy hex code" placement="top">
        {/* Color block */}
        <Flex
          w="100px"
          h="100px"
          align="flex-end"
          bg={shadeValue}
          borderRadius="md"
          boxShadow="md"
          as="button"
          transition="transform 0.1s ease-in-out"
          // @ts-expect-error as prop
          onClick={handleClick}
          _hover={{
            transform: 'scale(1.05)',
          }}
        >
          {wasCopied ? (
            <Flex
              color={getReadableColor(hexCode)}
              w="100%"
              h="100%"
              justify="center"
              align="center"
            >
              Copied!
            </Flex>
          ) : (
            <Box
              // Label
              textAlign="center"
              mt={4}
              color={getReadableColor(getLightenedColor(hexCode))}
              bgColor={getLightenedColor(hexCode)}
              m={2}
              p={1}
              w="100%"
              borderRadius="md"
            >
              <Text color="inherit">{hexCode}</Text>
            </Box>
          )}
        </Flex>
      </Tooltip>
      <Text color="gray.1200" mt={2}>
        {shade ? `${color}.${shade}` : color}
      </Text>
      <Text color="gray.800">{shadeValue !== hexCode && shadeValue}</Text>
    </Flex>
  );
};

export const Default: Story = (args) => {
  const theme = useTheme();
  return (
    <VStack gap={4} align="flex-start">
      {Object.entries(theme.semanticTokens?.colors || {})
        .filter(([color]) => !color.startsWith('chakra'))
        .map(([color, shades]) => (
          <Flex key={color} gap={4} align="center">
            <H4 mb={2} w="100px" textTransform="capitalize" color="gray.1200">
              {color}
            </H4>
            <Flex gap={2}>
              {typeof shades === 'string' ? (
                // Handle simple string values (e.g., "white", "black")
                <ColorCard
                  key={color}
                  color={color}
                  shade=""
                  shadeValue={shades}
                />
              ) : (
                // Handle object values with multiple shades
                Object.entries(shades as Record<string, string>).map(
                  ([shade, shadeValue]) => (
                    <ColorCard
                      key={shade}
                      color={color}
                      shade={shade}
                      shadeValue={shadeValue}
                    />
                  )
                )
              )}
            </Flex>
          </Flex>
        ))}
    </VStack>
  );
};
