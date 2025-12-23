import { Box, Flex, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { lighten, readableColor } from 'polished';
import { MouseEventHandler, useState } from 'react';

import { Tooltip } from '../components/Tooltip';
import { H4, Text } from '../components/Typography';
import { colors, semanticTokens } from './colors';

const meta = {
  title: 'Setup/Theme',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Helper to resolve color values from token paths like "blue.900"
const resolveColor = (tokenPath: string): string => {
  // If it's already a hex color, return as-is
  if (tokenPath.startsWith('#')) {
    return tokenPath;
  }

  const parts = tokenPath.split('.');
  if (parts.length === 2) {
    const [colorName, shade] = parts;
    const colorPalette = colors[colorName as keyof typeof colors];
    if (colorPalette && typeof colorPalette === 'object' && shade in colorPalette) {
      return (colorPalette as Record<string, string>)[shade];
    }
  }

  return '#000000';
};

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
  // Resolve the token path to an actual hex color
  const hexCode = resolveColor(shadeValue);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(hexCode);
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 2000);
  };

  return (
    <Flex flexDir="column" align="center" key={shade} p={2}>
      <Tooltip label="Copy hex code" placement="top">
        {/* Color block */}
        <Flex
          w="100px"
          h="100px"
          align="flex-end"
          bg={hexCode}
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
              color={readableColor(hexCode)}
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
              color={readableColor(lighten(0.2, hexCode))}
              bgColor={lighten(0.2, hexCode)}
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
        {color}.{shade}
      </Text>
      <Text color="gray.800">{shadeValue !== hexCode && shadeValue}</Text>
    </Flex>
  );
};

export const Default: Story = {
  render: () => {
    // Use the semantic tokens from our theme
    const tokenColors = semanticTokens.colors;

    return (
      <VStack gap={4} align="flex-start">
        {Object.entries(tokenColors).map(([color, shades]) => (
          <Flex key={color} gap={4} align="center">
            <H4 mb={2} w="100px" textTransform="capitalize" color="gray.1200">
              {color}
            </H4>
            <Flex gap={2}>
              {Object.entries(shades).map(([shade, shadeValue]) => (
                <ColorCard
                  key={shade}
                  color={color}
                  shade={shade}
                  shadeValue={shadeValue}
                />
              ))}
            </Flex>
          </Flex>
        ))}
      </VStack>
    );
  },
};
