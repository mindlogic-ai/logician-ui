import { Box, Flex, VStack, HStack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { SYSTEM_HUE_NAMES } from '@/theme/colors';

import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Subtext } from '../Typography';
import { Avatar, avatarFallbackColors } from '.';

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
          <Text fontSize="lg" fontWeight="bold" mb={4} color="fg.default">
            Sizes with Name Fallback
          </Text>
          <Flex gap={4} wrap="wrap" align="center">
            {sizes.map((size) => (
              <VStack key={size} gap={2} align="center">
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                  {size}
                </Text>
                <Avatar name="John Doe" size={size} />
              </VStack>
            ))}
          </Flex>
        </Box>

        {/* Sizes with image */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="fg.default">
            Sizes with Image
          </Text>
          <Flex gap={4} wrap="wrap" align="center">
            {sizes.map((size) => (
              <VStack key={size} gap={2} align="center">
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">
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
          <Text fontSize="lg" fontWeight="bold" mb={4} color="fg.default">
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
                <Text fontSize="xs" color="fg.muted">
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
        <Text fontSize="lg" fontWeight="bold" mb={4} color="fg.default">
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
        <Text fontSize="lg" fontWeight="bold" mb={4} color="fg.default">
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
            <Text fontSize="xs" color="fg.muted">
              bg="white"
            </Text>
          </VStack>
          <VStack gap={2}>
            <Avatar
              name="React"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              size="lg"
              bg="category.blue.surface"
            />
            <Text fontSize="xs" color="fg.muted">
              bg="category.blue.surface"
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
        <Text fontSize="lg" fontWeight="bold" mb={4} color="fg.default">
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
        <Text fontSize="lg" fontWeight="bold" mb={4} color="fg.default">
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
        <Text fontSize="lg" fontWeight="bold" mb={4} color="fg.default">
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
      <Text fontSize="lg" fontWeight="bold" mb={2} color="fg.default">
        Different Name Formats
      </Text>
      <Flex gap={4} wrap="wrap">
        <VStack gap={1}>
          <Avatar name="John Doe" size="lg" />
          <Text fontSize="sm" color="fg.muted">
            John Doe
          </Text>
        </VStack>
        <VStack gap={1}>
          <Avatar name="Jane" size="lg" />
          <Text fontSize="sm" color="fg.muted">
            Jane
          </Text>
        </VStack>
        <VStack gap={1}>
          <Avatar name="A B C" size="lg" />
          <Text fontSize="sm" color="fg.muted">
            A B C
          </Text>
        </VStack>
        <VStack gap={1}>
          <Avatar name="김철수" size="lg" />
          <Text fontSize="sm" color="fg.muted">
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
              <Text fontWeight="bold" color="fg.muted">
                {size}
              </Text>
            </Box>
          ))}
        </HStack>

        {/* User rows */}
        {users.map((user, idx) => (
          <HStack key={idx} gap={4} align="center">
            <Box w="120px">
              <Text fontWeight="medium" color="fg.muted">
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
            <Text fontWeight="medium" color="fg.muted">
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

/**
 * No image, no `src` that loads — the fallback initials tint by a stable hash
 * of `name` over the 12 `category.*` hues, so the same person reads as the
 * same colour everywhere and different people spread across the wheel
 * instead of all landing on one colour.
 */
export const FallbackHues: Story = {
  render: () => {
    const names = [
      'Jaeho Shin',
      'Jeongbin Kim',
      'Sean Park',
      'Kunyoung Park',
      'Namkyung Jo',
      'Taehoon Kim',
      'Minjae Kim',
      'Hyungjoon Yang',
      'Hyunwoo Kim',
      'Joonpyo Lee',
      'Seungwook Kim',
      'WonJoon Shin',
    ];

    return (
      <Flex gap={4} wrap="wrap">
        {names.map((name) => (
          <VStack key={name} gap={2} align="center">
            <Avatar name={name} size="lg" />
            <Text fontSize="xs" color="fg.muted">
              {name}
            </Text>
          </VStack>
        ))}
      </Flex>
    );
  },
};

/** `colorHue` overrides the hashed hue when a caller needs a specific one. */
export const ExplicitHue: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      {SYSTEM_HUE_NAMES.map((hue) => (
        <VStack key={hue} gap={2} align="center">
          <Avatar name="Same Name" colorHue={hue} size="lg" />
          <Text fontSize="xs" color="fg.muted">
            {hue}
          </Text>
        </VStack>
      ))}
    </Flex>
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Avatar.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written out on each story because the indexer
// reads CSF statically.

const MEMBERS = ['김지민', '이서준', '박하은'];

export const DoNameNextToIt: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: the name next to the avatar',
  render: () => (
    <VStack align="start" gap={3}>
      {MEMBERS.map((name) => (
        <HStack key={name} gap={3}>
          <Avatar size="sm" name={name} aria-hidden />
          <Box>
            <Text fontWeight="medium">{name}</Text>
            <Subtext color="fg.muted">멤버</Subtext>
          </Box>
        </HStack>
      ))}
    </VStack>
  ),
};

export const DontHueAsStatus: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a hue to mean a status",
  render: () => (
    <HStack gap={3}>
      <Avatar size="sm" name="김지민" colorHue="green" />
      <Avatar size="sm" name="이서준" colorHue="red" />
      <Avatar size="sm" name="박하은" colorHue="yellow" />
    </HStack>
  ),
};

/**
 * Fallback colours per hue, from `avatarFallbackColors` — the same function
 * the component calls. The first row is the neutral pair used with no name.
 */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => {
    const neutral = avatarFallbackColors(undefined);
    return (
      <TokenTable
        rows={[
          { token: neutral.bg, use: 'no name · background' },
          { token: neutral.color, use: 'no name · initials' },
          ...SYSTEM_HUE_NAMES.flatMap((hue) => {
            const { bg, color } = avatarFallbackColors('x', hue);
            return [
              { token: bg, use: `${hue} · background` },
              { token: color, use: `${hue} · initials` },
            ];
          }),
          { token: 'border.subtle', use: 'border' },
        ]}
      />
    );
  },
};
