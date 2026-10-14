import { Box, Flex, Grid, HStack, Separator, Stack, VStack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { FormControl } from '../components/FormControl';
import { FormLabel } from '../components/FormLabel';
import { IoSearch } from '../components/Icon';
import { Input } from '../components/Input';
import { SelectField } from '../components/Select/SelectField';
import { Switch } from '../components/Switch';
import { Textarea } from '../components/Textarea';
import { H3, H4, Subtext, Text } from '../components/Typography';

/**
 * # Borders in context
 *
 * Page-like compositions for eyeballing the three neutral border roles
 * (`border.subtle` / `border.default` / `border.strong`) on real components,
 * in both light and dark mode. Flip the **Color mode** toolbar control to
 * check that the hierarchy stays legible in dark.
 *
 * The roles resolve to:
 * | role | light | intended use |
 * | --- | --- | --- |
 * | `border.subtle` | `gray.200` | low-emphasis dividers, row separators |
 * | `border.default` | `gray.300` | standard borders: inputs, cards, panels |
 * | `border.strong` | `gray.500` | high-emphasis: hover/focus on neutral controls |
 *
 * These stories are intentionally not bound to a single component — they exist
 * to validate that borders read as a coherent system across a page rather than
 * as a patchwork of grays.
 */
const meta = {
  title: 'Theme/Borders',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

const PLAN_OPTIONS = [
  { label: 'Starter', value: 'starter' },
  { label: 'Team', value: 'team' },
  { label: 'Enterprise', value: 'enterprise' },
];

/**
 * Side-by-side reference of the three roles, rendered on both `bg.surface` and
 * `bg.canvas`. The fastest way to confirm the light→dark hierarchy survives a
 * mode flip: subtle should be barely-there, default clearly present, strong the
 * most prominent — in that order, in both modes, on both surfaces.
 */
export const RoleReference: Story = {
  render: () => {
    const roles = [
      { token: 'border.subtle', light: 'gray.200', use: 'dividers' },
      { token: 'border.default', light: 'gray.300', use: 'inputs, cards' },
      { token: 'border.strong', light: 'gray.500', use: 'hover / focus' },
    ] as const;

    const Swatches = ({ surface }: { surface: 'bg.surface' | 'bg.canvas' }) => (
      <Stack gap={3} bg={surface} p={6} borderRadius="lg" flex="1">
        <Subtext>on {surface}</Subtext>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {roles.map((r) => (
            <VStack key={r.token} gap={2} align="stretch">
              <Box
                h="64px"
                bg="bg.surface"
                border="2px solid"
                borderColor={r.token}
                borderRadius="md"
              />
              <Text fontWeight="600" fontSize="sm">
                {r.token}
              </Text>
              <Subtext>
                {r.light} · {r.use}
              </Subtext>
            </VStack>
          ))}
        </Grid>
      </Stack>
    );

    return (
      <Box bg="bg.canvas" minH="100vh" p={8}>
        <H3 mb={6}>Border roles</H3>
        <HStack gap={6} align="stretch">
          <Swatches surface="bg.surface" />
          <Swatches surface="bg.canvas" />
        </HStack>
      </Box>
    );
  },
};

/**
 * A realistic account-settings form: a `Card` (border.default edge) holding
 * sections split by `border.subtle` dividers, with inputs / textarea / select
 * (border.default resting, border.strong on hover & focus), a switch row, and
 * a footer of buttons. Hover and focus the fields to exercise the strong role.
 */
export const SettingsForm: Story = {
  render: () => {
    const [name, setName] = useState('Sanghyun Park');
    const [bio, setBio] = useState('');
    const [plan, setPlan] = useState<string | null>('team');
    const [notify, setNotify] = useState(true);
    const [marketing, setMarketing] = useState(false);

    return (
      <Box bg="bg.canvas" minH="100vh" py={10}>
        <Box maxW="640px" mx="auto" px={6}>
          <Stack gap={1} mb={6}>
            <H3>Account settings</H3>
            <Subtext>
              Manage your profile, plan, and notification preferences.
            </Subtext>
          </Stack>

          <Card p={0}>
            <Stack gap={0}>
              {/* Profile section */}
              <Stack gap={4} p={6}>
                <H4>Profile</H4>
                <FormControl required>
                  <FormLabel>Display name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="A short description"
                    rows={3}
                  />
                </FormControl>
                <FormControl invalid>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="name@company.com" />
                  <Subtext color="danger.500">
                    Enter a valid email address.
                  </Subtext>
                </FormControl>
              </Stack>

              <Separator borderColor="border.subtle" />

              {/* Plan section */}
              <Stack gap={4} p={6}>
                <HStack justify="space-between">
                  <H4>Plan</H4>
                  <Badge>Current: Team</Badge>
                </HStack>
                <Box maxW="280px">
                  <SelectField
                    label="Subscription plan"
                    options={PLAN_OPTIONS}
                    value={plan}
                    onChange={setPlan}
                  />
                </Box>
              </Stack>

              <Separator borderColor="border.subtle" />

              {/* Notifications section */}
              <Stack gap={4} p={6}>
                <H4>Notifications</H4>
                <HStack justify="space-between">
                  <Stack gap={0}>
                    <Text fontWeight="500">Product updates</Text>
                    <Subtext>Email me when features ship.</Subtext>
                  </Stack>
                  <Switch
                    checked={notify}
                    onCheckedChange={(e) => setNotify(e.checked)}
                  >
                    <Switch.Control />
                  </Switch>
                </HStack>
                <Checkbox
                  checked={marketing}
                  onCheckedChange={(e) => setMarketing(Boolean(e.checked))}
                >
                  <Checkbox.Control />
                  <Checkbox.Label>
                    Receive occasional marketing emails
                  </Checkbox.Label>
                </Checkbox>
              </Stack>

              <Separator borderColor="border.subtle" />

              {/* Footer */}
              <HStack justify="flex-end" gap={3} p={6}>
                <Button colorPalette="neutral" variant="outline">
                  Cancel
                </Button>
                <Button colorPalette="primary" variant="solid">
                  Save changes
                </Button>
              </HStack>
            </Stack>
          </Card>
        </Box>
      </Box>
    );
  },
};

/**
 * A dashboard-like page: a bordered toolbar, a grid of `Card`s (including
 * clickable ones), and a bordered list panel whose rows are split by
 * `border.subtle`. This is where a "patchwork of grays" would be obvious — every
 * surface edge here should read as the same coherent system.
 */
export const Dashboard: Story = {
  render: () => {
    const [query, setQuery] = useState('');

    const rows = [
      { name: 'Quarterly report', meta: 'Updated 2h ago', tag: 'Doc' },
      { name: 'Onboarding flow', meta: 'Updated yesterday', tag: 'Flow' },
      { name: 'Pricing experiment', meta: 'Updated 3d ago', tag: 'Draft' },
    ];

    return (
      <Box bg="bg.canvas" minH="100vh">
        {/* Toolbar — bordered panel on the canvas */}
        <Flex
          align="center"
          justify="space-between"
          px={6}
          py={4}
          bg="bg.surface"
          borderBottom="1px solid"
          borderColor="border.default"
        >
          <H4>Workspace</H4>
          <Box w="260px">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              leftIcon={<IoSearch />}
            />
          </Box>
        </Flex>

        <Box p={6}>
          {/* Card grid */}
          <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={6}>
            {['Documents', 'Workflows', 'Connectors'].map((title, i) => (
              <Card key={title} clickable={i < 2} p={6}>
                <Stack gap={1}>
                  <Text fontWeight="600">{title}</Text>
                  <Subtext>{(i + 1) * 7} items</Subtext>
                </Stack>
              </Card>
            ))}
          </Grid>

          {/* List panel — rows separated by subtle dividers */}
          <Box
            bg="bg.surface"
            border="1px solid"
            borderColor="border.default"
            borderRadius="lg"
            overflow="hidden"
          >
            <HStack
              justify="space-between"
              px={5}
              py={3}
              borderBottom="1px solid"
              borderColor="border.subtle"
            >
              <Text fontWeight="600">Recent</Text>
              <Button colorPalette="neutral" variant="ghost" size="sm">
                View all
              </Button>
            </HStack>
            {rows.map((row, i) => (
              <HStack
                key={row.name}
                justify="space-between"
                px={5}
                py={4}
                borderBottom={i < rows.length - 1 ? '1px solid' : undefined}
                borderColor="border.subtle"
              >
                <Stack gap={0}>
                  <Text fontWeight="500">{row.name}</Text>
                  <Subtext>{row.meta}</Subtext>
                </Stack>
                <Badge>{row.tag}</Badge>
              </HStack>
            ))}
          </Box>
        </Box>
      </Box>
    );
  },
};
