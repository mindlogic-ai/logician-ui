import { Box, Flex, VStack, HStack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '.';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    size: 'md',
    name: '',
    src: '',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    name: 'John Doe',
  },
};

/**
 * All available avatar sizes.
 *
 * ## Sizes:
 * - `2xs`: Extra extra small
 * - `xs`: Extra small
 * - `sm`: Small
 * - `md`: Medium - Default
 * - `lg`: Large
 * - `xl`: Extra large
 * - `2xl`: Extra extra large
 * - `full`: Full width/height (takes container size)
 */
export const Sizes: Story = {
  render: () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    return (
      <VStack gap={8} align="stretch">
        {/* Sizes with name fallback */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
            Sizes with Name Fallback
          </Text>
          <Flex gap={4} wrap="wrap" align="center">
            {sizes.map((size) => (
              <VStack key={size} gap={2} align="center">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {size}
                </Text>
                <Avatar name="John Doe" size={size} />
              </VStack>
            ))}
          </Flex>
        </Box>

        {/* Sizes with image */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
            Sizes with Image
          </Text>
          <Flex gap={4} wrap="wrap" align="center">
            {sizes.map((size) => (
              <VStack key={size} gap={2} align="center">
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {size}
                </Text>
                <Avatar
                  name="Jane Smith"
                  src="https://i.pravatar.cc/150?img=1"
                  size={size}
                />
              </VStack>
            ))}
          </Flex>
        </Box>

        {/* Sizes comparison */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
            Size Comparison
          </Text>
          <HStack gap={4} align="flex-end">
            {sizes.map((size) => (
              <VStack key={size} gap={2} align="center">
                <Avatar
                  name="User"
                  src="https://i.pravatar.cc/150?img=2"
                  size={size}
                />
                <Text fontSize="xs" color="gray.600">
                  {size}
                </Text>
              </VStack>
            ))}
          </HStack>
        </Box>
      </VStack>
    );
  },
};

/**
 * Avatar with image source.
 * Includes examples with transparent background images.
 */
export const WithImage: Story = {
  render: () => (
    <VStack gap={8} align="stretch">
      {/* Regular image */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
          Regular Image
        </Text>
        <HStack gap={4}>
          <Avatar
            name="Jane Smith"
            src="https://i.pravatar.cc/150?img=5"
            size="lg"
          />
          <Avatar
            name="John Doe"
            src="https://i.pravatar.cc/150?img=1"
            size="lg"
          />
          <Avatar
            name="Bob Johnson"
            src="https://i.pravatar.cc/150?img=8"
            size="lg"
          />
        </HStack>
      </Box>
      {/* Custom background override */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
          Custom Background (bg prop)
        </Text>
        <HStack gap={4}>
          <VStack gap={2}>
            <Avatar
              name="GitHub"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              size="lg"
              bg="white"
            />
            <Text fontSize="xs" color="gray.600">
              bg="white"
            </Text>
          </VStack>
          <VStack gap={2}>
            <Avatar
              name="React"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              size="lg"
              bg="blue.100"
            />
            <Text fontSize="xs" color="gray.600">
              bg="blue.100"
            </Text>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  ),
};

/**
 * Avatar with fallback to initials.
 */
export const WithFallback: Story = {
  args: {
    name: 'John Doe',
    size: 'lg',
  },
};

/**
 * Avatar without name or image shows default icon.
 */
export const Empty: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Avatar group showing multiple users.
 */
export const Group: Story = {
  render: () => (
    <VStack gap={8} align="stretch">
      {/* Small group */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
          Small Group (md size)
        </Text>
        <HStack gap={-2}>
          <Avatar name="John Doe" src="https://i.pravatar.cc/150?img=1" />
          <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=5" />
          <Avatar name="Bob Johnson" src="https://i.pravatar.cc/150?img=8" />
        </HStack>
      </Box>

      {/* Large group with size variation */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
          Large Group (sm size)
        </Text>
        <HStack gap={-2}>
          <Avatar
            name="Alice Cooper"
            src="https://i.pravatar.cc/150?img=10"
            size="sm"
          />
          <Avatar
            name="Bob Dylan"
            src="https://i.pravatar.cc/150?img=12"
            size="sm"
          />
          <Avatar
            name="Charlie Brown"
            src="https://i.pravatar.cc/150?img=15"
            size="sm"
          />
          <Avatar
            name="David Lee"
            src="https://i.pravatar.cc/150?img=20"
            size="sm"
          />
          <Avatar name="Eve Wilson" size="sm" />
        </HStack>
      </Box>

      {/* Extra large group */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
          Extra Large Group (lg size)
        </Text>
        <HStack gap={-3}>
          <Avatar
            name="User 1"
            src="https://i.pravatar.cc/150?img=30"
            size="lg"
          />
          <Avatar
            name="User 2"
            src="https://i.pravatar.cc/150?img=31"
            size="lg"
          />
          <Avatar
            name="User 3"
            src="https://i.pravatar.cc/150?img=32"
            size="lg"
          />
          <Avatar name="User 4" size="lg" />
        </HStack>
      </Box>
    </VStack>
  ),
};

/**
 * Different name formats showing initials.
 */
export const Initials: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.700">
        Different Name Formats
      </Text>
      <Flex gap={4} wrap="wrap">
        <VStack gap={1}>
          <Avatar name="John Doe" size="lg" />
          <Text fontSize="sm" color="gray.600">
            John Doe
          </Text>
        </VStack>
        <VStack gap={1}>
          <Avatar name="Jane" size="lg" />
          <Text fontSize="sm" color="gray.600">
            Jane
          </Text>
        </VStack>
        <VStack gap={1}>
          <Avatar name="A B C" size="lg" />
          <Text fontSize="sm" color="gray.600">
            A B C
          </Text>
        </VStack>
        <VStack gap={1}>
          <Avatar name="김철수" size="lg" />
          <Text fontSize="sm" color="gray.600">
            김철수
          </Text>
        </VStack>
      </Flex>
    </VStack>
  ),
};

/**
 * All sizes in a comparison matrix.
 */
export const SizeMatrix: Story = {
  render: () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    const users = [
      { name: 'John Doe', src: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Jane Smith', src: 'https://i.pravatar.cc/150?img=5' },
      { name: 'Bob Johnson', src: 'https://i.pravatar.cc/150?img=8' },
    ];

    return (
      <VStack gap={6} align="stretch">
        {/* Header row */}
        <HStack gap={4}>
          <Box w="120px" />
          {sizes.map((size) => (
            <Box key={size} w="80px" textAlign="center">
              <Text fontWeight="bold" color="gray.600">
                {size}
              </Text>
            </Box>
          ))}
        </HStack>

        {/* User rows */}
        {users.map((user, idx) => (
          <HStack key={idx} gap={4} align="center">
            <Box w="120px">
              <Text fontWeight="medium" color="gray.600">
                {user.name}
              </Text>
            </Box>
            {sizes.map((size) => (
              <Box key={`${idx}-${size}`} w="80px" textAlign="center">
                <Avatar name={user.name} src={user.src} size={size} />
              </Box>
            ))}
          </HStack>
        ))}

        {/* Fallback row */}
        <HStack gap={4} align="center">
          <Box w="120px">
            <Text fontWeight="medium" color="gray.600">
              Fallback
            </Text>
          </Box>
          {sizes.map((size) => (
            <Box key={`fallback-${size}`} w="80px" textAlign="center">
              <Avatar name="Test User" size={size} />
            </Box>
          ))}
        </HStack>
      </VStack>
    );
  },
};
