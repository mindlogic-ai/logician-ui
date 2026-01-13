import type { Meta, StoryObj } from '@storybook/react';
import { defineConfig } from '@chakra-ui/react';
import { LogicianProvider } from './LogicianProvider';
import { Button } from '../Button';
import { H1, Text } from '../Typography';
import { Container } from '../Container';
import { Box, VStack } from '@chakra-ui/react';

const meta = {
  title: 'Setup/LogicianProvider',
  component: LogicianProvider,
  parameters: { disableLogicianProvider: true },
} satisfies Meta<typeof LogicianProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <LogicianProvider>
      <VStack gap={6} p={8} align="start" w="100%">
        <H1 size="lg">Default Logician Design System</H1>
        <Text>
          This shows the default Logician theme. Compare with "With Custom
          Config" to see the differences.
        </Text>

        {/* Font showcase */}
        <Box
          p={4}
          bg="gray.50"
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.200"
          w="100%"
        >
          <VStack align="start" gap={2}>
            <Text fontWeight="bold">Default Theme Values:</Text>
            <Text fontSize="sm">
              • Fonts: Pretendard Variable, Inter (sans-serif)
            </Text>
            <Text fontSize="sm">
              • Border Radius: sm=6px, md=8px, lg=12px, xl=32px
            </Text>
            <Text fontSize="sm">
              • Container: xs=480px, sm=640px, md=768px, lg=1024px, xl=1280px
            </Text>
          </VStack>
        </Box>

        {/* Border radius showcase */}
        <Box>
          <Button
            colorPalette="primary"
            variant="soft"
            mr={4}
            borderRadius="md"
          >
            Medium Radius (8px)
          </Button>
          <Button
            colorPalette="secondary"
            variant="soft"
            mr={4}
            borderRadius="lg"
          >
            Large Radius (12px)
          </Button>
          <Button colorPalette="primary" variant="outline" borderRadius="xl">
            XL Radius (32px)
          </Button>
        </Box>

        {/* Container showcase */}
        <VStack gap={4} w="100%" align="start">
          <Text fontWeight="bold">Container Sizes:</Text>
          <Container maxW="xs" bg="primary.lightest" p={4} borderRadius="md">
            <Text fontSize="sm" color="primary.dark">
              Container xs (480px max)
            </Text>
          </Container>
          <Container maxW="sm" bg="secondary.lightest" p={4} borderRadius="md">
            <Text fontSize="sm" color="secondary.dark">
              Container sm (640px max)
            </Text>
          </Container>
          <Container maxW="md" bg="success.lightest" p={4} borderRadius="md">
            <Text fontSize="sm" color="success.dark">
              Container md (768px max)
            </Text>
          </Container>
        </VStack>

        {/* Typography showcase */}
        <Box
          p={4}
          bg="primary.lightest"
          borderRadius="lg"
          borderWidth="2px"
          borderColor="primary.light"
          w="100%"
        >
          <Text color="primary.dark" fontWeight="bold">
            This text uses the default Pretendard Variable / Inter font family.
            Notice the clean, modern sans-serif appearance.
          </Text>
        </Box>

        {/* Breakpoint showcase */}
        <VStack gap={4} w="100%" align="start">
          <Text fontWeight="bold">Breakpoint Indicators (Resize window):</Text>
          <Box
            p={4}
            w="100%"
            borderRadius="md"
            borderWidth="2px"
            bg={{
              base: 'danger.lightest',
              sm: 'warning.lightest',
              md: 'success.lightest',
              lg: 'primary.lightest',
              xl: 'secondary.lightest',
            }}
            borderColor={{
              base: 'danger.main',
              sm: 'warning.main',
              md: 'success.main',
              lg: 'primary.main',
              xl: 'secondary.main',
            }}
          >
            <Text fontWeight="bold" fontSize="lg">
              Current breakpoint:
            </Text>
            <Text display={{ base: 'block', sm: 'none' }}>
              📱 base (0px+) - Red
            </Text>
            <Text display={{ base: 'none', sm: 'block', md: 'none' }}>
              📱 sm (320px+) - Yellow
            </Text>
            <Text display={{ base: 'none', md: 'block', lg: 'none' }}>
              💻 md (768px+) - Green
            </Text>
            <Text display={{ base: 'none', lg: 'block', xl: 'none' }}>
              🖥️ lg (1024px+) - Blue
            </Text>
            <Text display={{ base: 'none', xl: 'block' }}>
              🖥️ xl (1280px+) - Purple
            </Text>
          </Box>
        </VStack>
      </VStack>
    </LogicianProvider>
  ),
};

export const WithCustomConfig: Story = {
  render: () => {
    // Example: Factchat's custom theme configuration with VISIBLE differences
    // To demonstrate that config override actually works
    const factchatConfig = defineConfig({
      theme: {
        breakpoints: {
          base: '0px',
          sm: '375px', // Different from Logician's default
          md: '768px',
          lg: '1024px',
          xl: '1600px', // Different from Logician's default
          '2xl': '1920px',
        },
        tokens: {
          radii: {
            none: { value: '0' },
            sm: { value: '2px' }, // Much smaller than Logician's 6px
            md: { value: '4px' }, // Much smaller than Logician's 8px
            lg: { value: '20px' }, // Larger than Logician's 12px
            xl: { value: '50px' }, // Much larger than Logician's 32px
            full: { value: '9999px' },
          },
          sizes: {
            container: {
              xs: { value: '300px' }, // Much smaller than default 480px
              sm: { value: '500px' }, // Smaller than default 640px
              md: { value: '900px' }, // Larger than default 768px
              lg: { value: '1200px' }, // Larger than default 1024px
              xl: { value: '1600px' }, // Larger than default 1280px
            },
          },
        },
      },
    });

    return (
      <LogicianProvider config={factchatConfig}>
        <VStack gap={6} p={8} align="start" w="100%">
          <H1 size="lg">FactChat Theme Integration</H1>
          <Text>
            This example shows config override working. Notice the differences:
          </Text>

          {/* Info box */}
          <Box
            p={4}
            bg="gray.50"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.200"
            w="100%"
          >
            <VStack align="start" gap={2}>
              <Text fontWeight="bold">Custom Theme Values Applied:</Text>
              <Text fontSize="sm">
                • Fonts: Body uses serif (Georgia), heading uses monospace
                (Courier New)
              </Text>
              <Text fontSize="sm">
                • Border Radius: sm=2px, md=4px, lg=20px, xl=50px
              </Text>
              <Text fontSize="sm">
                • Container: xs=300px, sm=500px, md=900px, lg=1200px, xl=1600px
              </Text>
            </VStack>
          </Box>

          {/* Border radius showcase */}
          <Box>
            <Button
              colorPalette="primary"
              variant="soft"
              mr={4}
              borderRadius="md"
            >
              Medium Radius (4px)
            </Button>
            <Button
              colorPalette="secondary"
              variant="soft"
              mr={4}
              borderRadius="lg"
            >
              Large Radius (20px)
            </Button>
            <Button colorPalette="primary" variant="outline" borderRadius="xl">
              XL Radius (50px)
            </Button>
          </Box>

          {/* Container showcase */}
          <VStack gap={4} w="100%" align="start">
            <Text fontWeight="bold">Container Sizes (Custom):</Text>
            <Container maxW="xs" bg="primary.lightest" p={4} borderRadius="md">
              <Text fontSize="sm" color="primary.dark">
                Container xs (300px max) - Much smaller!
              </Text>
            </Container>
            <Container
              maxW="sm"
              bg="secondary.lightest"
              p={4}
              borderRadius="md"
            >
              <Text fontSize="sm" color="secondary.dark">
                Container sm (500px max) - Smaller
              </Text>
            </Container>
            <Container maxW="md" bg="success.lightest" p={4} borderRadius="md">
              <Text fontSize="sm" color="success.dark">
                Container md (900px max) - Larger!
              </Text>
            </Container>
          </VStack>

          {/* Typography showcase */}
          <Box
            p={4}
            bg="primary.lightest"
            borderRadius="lg"
            borderWidth="2px"
            borderColor="primary.light"
            w="100%"
          >
            <Text color="primary.dark" fontWeight="bold">
              This text shows the custom serif font (Georgia) applied to body
              text, while headings above use monospace (Courier New). Notice the
              completely different typography!
            </Text>
          </Box>

          {/* Breakpoint showcase */}
          <VStack gap={4} w="100%" align="start">
            <Text fontWeight="bold">
              Breakpoint Indicators (Custom - sm at 375px instead of 320px):
            </Text>
            <Box
              p={4}
              w="100%"
              borderRadius="md"
              borderWidth="2px"
              bg={{
                base: 'danger.lightest',
                sm: 'warning.lightest',
                md: 'success.lightest',
                lg: 'primary.lightest',
                xl: 'secondary.lightest',
              }}
              borderColor={{
                base: 'danger.main',
                sm: 'warning.main',
                md: 'success.main',
                lg: 'primary.main',
                xl: 'secondary.main',
              }}
            >
              <Text fontWeight="bold" fontSize="lg">
                Current breakpoint:
              </Text>
              <Text display={{ base: 'block', sm: 'none' }}>
                📱 base (0px+) - Red
              </Text>
              <Text display={{ base: 'none', sm: 'block', md: 'none' }}>
                📱 sm (375px+) ⚠️ CUSTOM - Yellow
              </Text>
              <Text display={{ base: 'none', md: 'block', lg: 'none' }}>
                💻 md (768px+) - Green
              </Text>
              <Text display={{ base: 'none', lg: 'block', xl: 'none' }}>
                🖥️ lg (1024px+) - Blue
              </Text>
              <Text display={{ base: 'none', xl: 'block' }}>
                🖥️ xl (1600px+) ⚠️ CUSTOM - Purple
              </Text>
            </Box>
            <Text fontSize="sm" color="gray.700">
              💡 Tip: Resize your browser window between 320px-375px to see the
              difference! Default switches to yellow at 320px, but this custom
              config switches at 375px.
            </Text>
          </VStack>

          <Text color="gray.1200" fontSize="sm">
            ✅ All Logician colors, semantic tokens, and component styles are
            preserved while FactChat-specific configurations (fonts, radii,
            containers, breakpoints) are overridden.
          </Text>
        </VStack>
      </LogicianProvider>
    );
  },
};
